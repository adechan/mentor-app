import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetAllRecommendations = (graphQLClient) => {
  const profiles = useSelector((store) => store.account.profiles);

  const [allRecommendations, setAllRecommendations] = useState([]);

  const query = gql`
    query getAllRecommendations($student_id: ID!) {
      get_student_all_recommendations(student_id: $student_id) {
        mentor_id
        mentor_profile_image
        mentor_username
        mentor_country
        mentor_city
        course
        course_id
        price
        average_rating
        number_of_reviews
      }
    }
  `;

  const getAllRecommendations = async () => {
    const variables = {
        student_id: profiles.studentId,
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_student_all_recommendations;
    if (!result.length) {
        return;
    }

    console.log(result);
    let recommendations = []
    result.forEach(resultItem => {
        const item = {
            mentorAvatar: resultItem.mentor_profile_image,
            mentorId: resultItem.mentor_id,
            mentorName: resultItem.mentor_username,
            mentorCity: resultItem.mentor_city,
            mentorCountry: resultItem.mentor_country,
            courseId: resultItem.course_id,
            averageRating: resultItem.average_rating,
            numberOfReviews: resultItem.number_of_reviews,
            courseTitle: resultItem.course,
            price: resultItem.price,
        }

        recommendations.push(item)
    });

    setAllRecommendations(recommendations)
  };

  useEffect(() => {
    if (profiles.studentId) {
        getAllRecommendations();
    }
  }, [profiles.studentId]);

  return allRecommendations;
};

export default useGetAllRecommendations;
