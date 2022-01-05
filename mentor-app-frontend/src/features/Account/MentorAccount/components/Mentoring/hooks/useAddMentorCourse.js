import { request, gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useAddMentorCourse = (graphQLClient, info,
    setAddMentorCourseValues, handleClose) => {
  const account = useSelector((store) => store.account);
  const [mentorId, setMentorId] = useState("");

  useEffect(() => {
    if (account.profiles.mentorId === account.selectedProfileId) {
      setMentorId(account.selectedProfileId);
    }
  }, [account]);

  const mutation = gql`
    mutation addMentorCourse(
      $mentor_id: ID!
      $course_id: ID!
      $price: Float!
      $day: Int!
      $hours: [Int!]!
    ) {
      add_mentor_course(
        mentor_id: $mentor_id
        course_id: $course_id
        price: $price
        day: $day
        hours: $hours
      ) {
        result
      }
    }
  `;

  const handleAddCourse = async () => {
    await graphQLClient.request(mutation, {
      mentor_id: mentorId,
      course_id: parseInt(info.courseId, 10),
      price: parseInt(info.price, 10),
      day: parseInt(info.day, 10),
      hours: info.hours,
    });

    setAddMentorCourseValues({
        courseId: "",
        price: 0,
        day: "",
        hours: [],
    })
    handleClose();
  };

  return handleAddCourse;
};

export default useAddMentorCourse;
