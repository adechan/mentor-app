import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetAllStudents = (graphQLClient) => {
  const profiles = useSelector((store) => store.account.profiles);

  const [allStudents, setAllStudents] = useState([]);

  const query = gql`
    query getAllStudents($mentor_id: ID!) {
      get_mentor_all_students(mentor_id: $mentor_id) {
        student_id
        course_id
        username
        course_title
        awarded
      }
    }
  `;

  const getAllStudents = async () => {
    const variables = {
      mentor_id: profiles.mentorId,
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_mentor_all_students;
    if (!result.length) {
      return;
    }

    console.log(result);
    let students = [];
    result.forEach((resultItem) => {
      const item = {
        studentId: resultItem.student_id,
        studentName: resultItem.username,
        courseId: resultItem.course_id,
        courseTitle: resultItem.course_title,
        awarded: resultItem.awarded
      };

      students.push(item);
    });

    setAllStudents(students);
  };

  useEffect(() => {
    if (profiles.mentorId) {
      getAllStudents();
    }
  }, [profiles.mentorId]);

  return { allStudents, setAllStudents };
};

export default useGetAllStudents;
