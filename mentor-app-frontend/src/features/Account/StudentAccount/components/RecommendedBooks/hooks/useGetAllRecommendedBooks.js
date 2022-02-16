import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetAllRecommendedBooks = (graphQLClient) => {
  const profiles = useSelector((store) => store.account.profiles);

  const [allRecommendations, setAllRecommendations] = useState([]);

  const query = gql`
    query getAllRecommendedBooks($student_id: ID!) {
      get_all_recommended_books(student_id: $student_id) {
        book_id
        image
        title
        author
        rating
      }
    }
  `;

  const getAllRecommendedBooks = async () => {
    const variables = {
      student_id: profiles.studentId,
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_all_recommended_books;
    if (result && !result?.length) {
      return;
    }

    let recommendations = [];

    if (!result?.length) {
      return;
    }

    result.forEach((resultItem) => {
      const item = {
        image: resultItem.image,
        author: resultItem.author,
        title: resultItem.title,
        rating: resultItem.rating,
        book_id: resultItem.book_id,
      };

      recommendations.push(item);
    });

    setAllRecommendations(recommendations);
  };

  useEffect(() => {
    if (profiles.studentId) {
      getAllRecommendedBooks();
    }
  }, [profiles.studentId]);

  return allRecommendations;
};

export default useGetAllRecommendedBooks;
