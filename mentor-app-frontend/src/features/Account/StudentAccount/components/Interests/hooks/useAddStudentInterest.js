import {  gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState, } from "react";

const useAddStudentInterst = (
  graphQLClient,
  chosenInterest,
  setChosenInterest,
  handleClose,
  interests,
  setInterests
) => {
  const account = useSelector((store) => store.account);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    if (account.profiles.studentId === account.selectedProfileId) {
      setStudentId(account.selectedProfileId);
    }
  }, [account]);

  const mutation = gql`
    mutation addStudentInterest(
      $student_id: ID!
      $course_id: ID!
    ) {
        add_student_interest(
        student_id: $student_id
        course_id: $course_id
      ) {
        result
      }
    }
  `;

  const handleAddInterest = async () => {
    await graphQLClient.request(mutation, {
      student_id: studentId,
      course_id: parseInt(chosenInterest.courseId, 10),
    });

    setChosenInterest({
      courseId: "",
      courseTitle: "",
    });
    handleClose();

    const courses = [...interests, {
        id: chosenInterest.courseId,
        title: chosenInterest.courseTitle,
    }]

    setInterests(courses);
  };

  return handleAddInterest;
};

export default useAddStudentInterst;
