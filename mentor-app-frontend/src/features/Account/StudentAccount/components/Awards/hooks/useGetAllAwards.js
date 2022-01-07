import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetAllAwards = (graphQLClient) => {
  const profiles = useSelector((store) => store.account.profiles);

  const [allAwards, setAllAwards] = useState([]);

  const query = gql`
    query getAllAwards($student_id: ID!) {
      get_student_awards(student_id: $student_id) {
        course_title
        mentor_username
        date
      }
    }
  `;

  const getAllAwards = async () => {
    const variables = {
      student_id: profiles.studentId,
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_student_awards;
    if (!result.length) {
      return;
    }

    let awards = [];
    result.forEach((resultItem) => {
      const item = {
        courseTitle: resultItem.course_title,
        mentorName: resultItem.mentor_username,
        date: resultItem.date,
      };

      awards.push(item);
    });

    setAllAwards(awards);
  };

  useEffect(() => {
    if (profiles.studentId) {
      getAllAwards();
    }
  }, [profiles.studentId]);

  return  allAwards;
};

export default useGetAllAwards;
