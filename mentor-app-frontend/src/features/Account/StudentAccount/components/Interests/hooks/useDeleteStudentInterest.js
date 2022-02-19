import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useDeleteStudentInterest = (interests, setInterests, graphQLClient) => {
  const account = useSelector((store) => store.account);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    if (account.profiles.studentId === account.selectedProfileId) {
      setStudentId(account.selectedProfileId);
    }
  }, [account]);

  const mutation = gql`
    mutation deleteStudentInterest($student_id: ID!, $course_id: ID!) {
      delete_student_interest(student_id: $student_id, course_id: $course_id) {
        result
      }
    }
  `;

  const handleDeleteCourse = async (courseId) => {
    await graphQLClient.request(mutation, {
      student_id: studentId,
      course_id: parseInt(courseId, 10),
    });

    let _interests = interests;
    _interests = _interests.filter(
      (subject) => subject.id !== courseId
    );

    setInterests(_interests);
  };

  return handleDeleteCourse;
};

export default useDeleteStudentInterest;
