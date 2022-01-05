import { gql } from "graphql-request";
import { useEffect, useState } from "react";

const useGetDataForAppointment = (graphQLClient, mentorId, courseId) => {
  const [appointmentData, setAppointmentData] = useState({
    courseTitle: "",
    courseId: "",
    mentorEmail: "",
    mentorName: "",
    price: "",
    availableHours: [], 
  });

  const query = gql`
    query getAppointmentData($mentor_id: ID!, $course_id: ID!) {
      get_create_appointment_info(
        mentor_id: $mentor_id
        course_id: $course_id
      ) {
        mentor_username
        mentor_email
        course
        course_id
        price
        available_hours {
          day
          hour
          available_hours_id
        }
      }
    }
  `;

  const getAppointmentData = async () => {
    const variables = {
      mentor_id: mentorId,
      course_id: courseId
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_create_appointment_info;

    if (!result) {
        return;
    }

    setAppointmentData({
        courseTitle: result.course,
        courseId: result.course_id,
        mentorEmail: result.mentor_email,
        mentorName: result.mentor_username,
        price: result.price,
        availableHours: result.available_hours, 
    })

    console.log(result);

  };

  useEffect(() => {
    if (mentorId && courseId) {
        getAppointmentData();
    }
  }, [mentorId, courseId]);

  return appointmentData;
};

export default useGetDataForAppointment;
