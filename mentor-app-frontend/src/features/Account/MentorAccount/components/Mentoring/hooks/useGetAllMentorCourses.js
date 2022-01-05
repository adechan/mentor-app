import { request, gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetAllMentorCourses = (graphQLClient) => {
  const account = useSelector((store) => store.account);
  const [mentorId, setMentorId] = useState("");

  const [mentoringSubjects, setMentoringSubjects] = useState([]);

  useEffect(() => {
    if (account.profiles.mentorId === account.selectedProfileId) {
      setMentorId(account.selectedProfileId);
    }
  }, [account]);

  const query = gql`
    query getAllMentorCourses($mentor_id: ID!) {
      get_mentor_courses(mentor_id: $mentor_id) {
        course_id
        course_title
        price
        day
        hours
      }
    }
  `;

  const handleGetAllCoursesRequest = async () => {
    const data = await graphQLClient.request(query, {
      mentor_id: mentorId,
    });

    const result = data?.get_mentor_courses;
    if (!result) {
      setMentoringSubjects([]);
      return;
    }

    const listOfCourses = [];
    if (result.length) {
      result.forEach((element) => {
        const item = {
          id: element.course_id,
          title: element.course_title,
          day: element.day,
          price: element.price,
          availableHours: element.hours,
        };

        listOfCourses.push(item);
      });

      setMentoringSubjects(listOfCourses);
    }
  };

  useEffect(() => {
    if (!mentorId) {
      return;
    }

    handleGetAllCoursesRequest();
  }, [mentorId]);

  return {mentoringSubjects, setMentoringSubjects};
};

export default useGetAllMentorCourses;
