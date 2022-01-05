import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetAllAppointments = (graphQLClient) => {
  const profiles = useSelector((store) => store.account.profiles);

  const [allAppointments, setAllAppointments] = useState([]);

  const query = gql`
    query getAllMentorAppointments($mentor_id: ID!) {
      get_mentor_all_appointments(mentor_id: $mentor_id) {
        appointment_id
        student_username
        student_email
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
      mentor_id: profiles.mentorId,
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_mentor_all_appointments;
    if (!result.length) {
      return;
    }

    let appointments = [];
    result.forEach((resultItem) => {
      const item = {
        appointmentId: resultItem.appointment_id,
        studentName: resultItem.student_username,
        studentEmail: resultItem.student_email,
        courseTitle: resultItem.course,
        price: resultItem.price,
        day: resultItem.day,
        hour: resultItem.hour,
        status: resultItem.status,
      };

      appointments.push(item);
    });

    setAllAppointments(appointments);
  };

  useEffect(() => {
    if (profiles.mentorId) {
      getAllAppointments();
    }
  }, [profiles.mentorId]);

  return { allAppointments, setAllAppointments };
};

export default useGetAllAppointments;
