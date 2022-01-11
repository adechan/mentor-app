import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const useReviewMentor = (
  graphQLClient,
  mentor,
  review,
  handleClose,
  allMentors,
  setAllMentors
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
    mutation reviewMentor(
      $student_id: ID!
      $course_id: ID!
      $mentor_id: ID!
      $review: String!
    ) {
      student_review_mentor(
        student_id: $student_id
        course_id: $course_id
        mentor_id: $mentor_id
        review: $review
      ) {
        result
      }
    }
  `;

  const reviewMentor = async () => {
    if (!review) {
      return;
    }

    const variables = {
      student_id: studentId,
      mentor_id: mentor.mentorId,
      course_id: mentor.courseId,
      review: review,
    };

    await graphQLClient.request(mutation, variables);

    const index = allMentors.findIndex(
      (mentorItem) =>
        mentorItem.mentorId === mentor.mentorId &&
        mentorItem.courseId === mentor.courseId
    );

    console.log(index);

    let item = allMentors[index];

    let _allMentors = allMentors;
    _allMentors = _allMentors.filter(
      (mentorItem) =>
        mentorItem.mentorId === mentor.mentorId &&
        mentorItem.courseId === mentor.courseId
    );

    _allMentors.push({
      ...item,
      review: review,
    });

    setAllMentors(_allMentors);

    handleClose();
  };

  return reviewMentor;
};

export default useReviewMentor;
