import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const useRateRecommendedBook = (
  graphQLClient,
  book_id,
  rating,
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
    mutation rateRecommendedBook(
      $student_id: ID!
      $book_id: ID!
      $rating: Float!
    ) {
        student_rate_book(
        student_id: $student_id
        book_id: $book_id
        rating: $rating
      ) {
        result
      }
    }
  `;

  const rateBook = async () => {
    if (!book_id || !studentId || !rating) {
        return;
    }

    const variables = {
      student_id: studentId,
      book_id: book_id,
      rating: parseInt(rating, 10),
    };

    await graphQLClient.request(mutation, variables);
  };

  return rateBook;
};

export default useRateRecommendedBook;
