import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const useAwardStudent = (
  graphQLClient,
  student,
  allStudents,
  setAllStudents
) => {
  const profiles = useSelector((store) => store.account.profiles);
  const selectedProfileId = useSelector(
    (store) => store.account.selectedProfileId
  );

  const [mentorId, setMentorId] = useState("");

  useEffect(() => {
    if (selectedProfileId === profiles.mentorId) {
      setMentorId(selectedProfileId);
    }
  }, [selectedProfileId, profiles.mentorId]);

  const mutation = gql`
    mutation awardStudent($mentor_id: ID!, $student_id: ID!, $course_id: ID!) {
      mentor_award_student(
        mentor_id: $mentor_id
        student_id: $student_id
        course_id: $course_id
      ) {
        result
      }
    }
  `;

  const awardStudent = async () => {
    const variables = {
      student_id: student.studentId,
      mentor_id: mentorId,
      course_id: student.courseId,
    };

    await graphQLClient.request(mutation, variables);

    const index = allStudents.findIndex(
      (studentItem) =>
        studentItem.studentId === student.studentId &&
        studentItem.courseId === student.courseId
    );

    let item = allStudents[index];

    let _allStudents = allStudents;
    _allStudents = _allStudents.filter(
      (studentItem) =>
        studentItem.studentId === student.studentId &&
        studentItem.couseId === student.courseId
    );

    _allStudents.push({
      ...item,
      awarded: true,
    });

    setAllStudents(_allStudents);

  };

  return awardStudent;
};

export default useAwardStudent;
