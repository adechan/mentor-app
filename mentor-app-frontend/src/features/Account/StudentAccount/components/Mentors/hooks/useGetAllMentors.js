import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetAllMentors = (graphQLClient) => {
  const profiles = useSelector((store) => store.account.profiles);

  const [allMentors, setAllMentors] = useState([]);

  const query = gql`
    query getAllMentors($student_id: ID!) {
      get_student_all_mentors(student_id: $student_id) {
        mentor_id
        username
        course_id
        course_title
        review
        stars
      }
    }
  `;

  const getAllMentors = async () => {
    const variables = {
      student_id: profiles.studentId,
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_student_all_mentors;
    if (!result.length) {
      return;
    }

    let mentors = [];
    result.forEach((resultItem) => {
      const item = {
        mentorId: resultItem.mentor_id,
        mentorName: resultItem.username,
        courseId: resultItem.course_id,
        courseTitle: resultItem.course_title,
        review: resultItem.review,
        stars: resultItem.stars,
      };

      mentors.push(item);
    });

    setAllMentors(mentors);
  };

  useEffect(() => {
    if (profiles.studentId) {
      getAllMentors();
    }
  }, [profiles.studentId]);

  return { allMentors, setAllMentors };
};

export default useGetAllMentors;
