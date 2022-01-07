import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetAllReviews = (graphQLClient) => {
  const profiles = useSelector((store) => store.account.profiles);

  const [allReviews, setAllReviews] = useState([]);

  const query = gql`
    query getAllReviews($mentor_id: ID!) {
      get_mentor_reviews(mentor_id: $mentor_id) {
        course_title
        review
        stars
        student_username
        date
      }
    }
  `;

  const getAllReviews = async () => {
    const variables = {
      mentor_id: profiles.mentorId,
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_mentor_reviews;
    if (!result.length) {
      return;
    }

    let reviews = [];
    result.forEach((resultItem) => {
      const item = {
        courseTitle: resultItem.course_title,
        review: resultItem.review,
        studentName: resultItem.student_username,
        date: resultItem.date,
      };

      reviews.push(item);
    });

    setAllReviews(reviews);
  };

  useEffect(() => {
    if (profiles.mentorId) {
      getAllReviews();
    }
  }, [profiles.mentorId]);

  return allReviews;
};

export default useGetAllReviews;
