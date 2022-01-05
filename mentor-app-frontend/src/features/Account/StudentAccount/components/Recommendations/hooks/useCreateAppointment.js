import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const useCreateAppointment = (
  graphQLClient,
  mentorId,
  courseId,
  selectedHourId,
  setSelectedHourId,
  handleClose,
) => {
  const profiles = useSelector((store) => store.account.profiles);
  const selectedProfileId = useSelector(
    (store) => store.account.selectedProfileId
  );

  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    if (selectedProfileId === profiles.studentId) {
      setStudentId(selectedProfileId);
    }
  }, [selectedProfileId, profiles.studentId]);

  const mutation = gql`
    mutation createAppointment(
      $student_id: ID!
      $mentor_id: ID!
      $course_id: ID!
      $available_hours_id: ID!
    ) {
      create_appointment(
        student_id: $student_id
        mentor_id: $mentor_id
        course_id: $course_id
        available_hours_id: $available_hours_id
      ) {
        result
      }
    }
  `;

  const createAppointment = async () => {
    if (!selectedHourId || !studentId || !mentorId || !courseId) {
        return;
    }

    const variables = {
      student_id: studentId,
      mentor_id: mentorId,
      course_id: courseId,
      available_hours_id: selectedHourId,
    };

    await graphQLClient.request(mutation, variables);

    setSelectedHourId('');
    handleClose();
  };

  return createAppointment;
};

export default useCreateAppointment;
