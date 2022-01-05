import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetAllAppointments = (graphQLClient) => {
  const profiles = useSelector((store) => store.account.profiles);

  const [allAppointments, setAllAppointments] = useState([]);

  const query = gql`
    query getAllStudentAppointments($student_id: ID!) {
      get_student_all_appointments(student_id: $student_id) {
        appointment_id
        mentor_username
        mentor_email
        course
        price
        day
        hour
        status
      }
    }
  `;

  const getAllAppointments = async () => {
    const variables = {
      student_id: profiles.studentId,
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_student_all_appointments;
    if (!result.length) {
      return;
    }

    let appointments = [];
    result.forEach((resultItem) => {
      const item = {
        appointmentId: resultItem.appointment_id,
        mentorName: resultItem.mentor_username,
        mentorEmail: resultItem.mentor_email,
        courseTitle: resultItem.course,
        price: resultItem.price,
        day: resultItem.day,
        hour: resultItem.hour,
        status: resultItem.status
      };

      appointments.push(item);
    });

    setAllAppointments(appointments);
  };

  useEffect(() => {
    if (profiles.studentId) {
      getAllAppointments();
    }
  }, [profiles.studentId]);

  return {allAppointments, setAllAppointments};
};

export default useGetAllAppointments;
