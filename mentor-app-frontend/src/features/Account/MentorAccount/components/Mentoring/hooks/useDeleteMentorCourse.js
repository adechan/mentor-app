import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useDeleteMentorCourse = (
  mentoringSubjects,
  setMentoringSubjects,
  graphQLClient
) => {
  const account = useSelector((store) => store.account);
  const [mentorId, setMentorId] = useState("");

  useEffect(() => {
    if (account.profiles.mentorId === account.selectedProfileId) {
      setMentorId(account.selectedProfileId);
    }
  }, [account]);

  const mutation = gql`
    mutation deleteMentorCourse($mentor_id: ID!, $course_id: ID!) {
      delete_mentor_course(mentor_id: $mentor_id, course_id: $course_id) {
        result
      }
    }
  `;

  const handleDeleteCourse = async (courseId) => {
    await graphQLClient.request(mutation, {
      mentor_id: mentorId,
      course_id: parseInt(courseId, 10),
    });

    let _mentorCourses = mentoringSubjects;
    _mentorCourses = _mentorCourses.filter((subject) => subject.id !== courseId);

    setMentoringSubjects(_mentorCourses);
  };

  return handleDeleteCourse;
};

export default useDeleteMentorCourse;
