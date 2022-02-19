import {  gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetStudentInterests = (graphQLClient) => {
  const account = useSelector((store) => store.account);
  const [studentId, setStudentId] = useState("");

  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (account.profiles.studentId === account.selectedProfileId) {
      setStudentId(account.selectedProfileId);
    }
  }, [account]);

  const query = gql`
    query getStudentIntersts($student_id: ID!) {
      get_student_interests(student_id: $student_id) {
        course_id
        course_title
      }
    }
  `;

  const handleGetAllInterests = async () => {
    const data = await graphQLClient.request(query, {
      student_id: studentId,
    });

    const result = data?.get_student_interests;
    if (!result) {
      setInterests([]);
      return;
    }

    const listOfCourses = [];
    if (result.length) {
      result.forEach((element) => {
        const item = {
          id: element.course_id,
          title: element.course_title,
        };

        listOfCourses.push(item);
      });

      setInterests(listOfCourses);
    }
  };

  useEffect(() => {
    if (!studentId) {
      return;
    }

    handleGetAllInterests();
  }, [studentId]);

  return { interests, setInterests };
};

export default useGetStudentInterests;
