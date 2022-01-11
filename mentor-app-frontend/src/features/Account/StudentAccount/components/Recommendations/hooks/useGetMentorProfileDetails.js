
import { gql } from "graphql-request";
import { useEffect, useState } from "react";

const useGetMentorProfileDetails = (graphQLClient, mentorId) => {

  const [profileInfo, setProfileInfo] = useState({
      username: "",
      city: "",
      country: "",
      quote: "",
      courses: [],
      reviews: [],
  });

  const query = gql`
    query getMentorProfileDetails($mentor_id: ID!) {
      get_mentor_details(mentor_id: $mentor_id) {
        mentor_username
        country
        city
        quote
        courses {
          course_id
          course_title
          price
        }
        reviews {
          review
          course_title
          student_username
        }
      }
    }
  `;

  const getMentorProfileInfo = async () => {
    const variables = {
      mentor_id: mentorId,
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_mentor_details;
    console.log(result);

    const item = {
        username: result.mentor_username,
        city: result.city,
        country: result.country,
        quote: result.quote,
        courses: result.courses,
        reviews: result.reviews,
    }

    setProfileInfo(item);
  };

  useEffect(() => {
    if (mentorId) {
      getMentorProfileInfo();
    }
  }, [mentorId]);

  return profileInfo
};

export default useGetMentorProfileDetails;
