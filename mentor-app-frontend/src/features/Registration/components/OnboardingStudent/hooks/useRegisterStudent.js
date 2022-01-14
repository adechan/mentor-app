import { request, gql } from "graphql-request";
import { useDispatch, useSelector } from "react-redux";
import { registrationActions } from "../../../../../store/slices/registrationSlice";

const useRegisterStudent = () => {
  const dispatch = useDispatch();
  const registrationInfo = useSelector((store) => store.registration);

  const mutation = gql`
    mutation registerStudent(
      $first_name: String!
      $last_name: String!
      $email: String!
      $password: String!
      $username: String!
      $profile_image: String
      $student_email: String
      $country: String!
      $city: String!
      $hobbies: String
      $statement: String
      $course_id: ID
    ) {
      register_student(
        first_name: $first_name
        last_name: $last_name
        email: $email
        password: $password
        profile: {
          username: $username
          profile_image: $profile_image
          country: $country
          city: $city
          student_email: $student_email
          hobbies: $hobbies
          statement: $statement
          course_id: $course_id
        }
      ) {
        result
      }
    }
  `;

  const register = async () => {
  
    const requestOptions = {
      method: "POST",
      body: registrationInfo.studentProfile.avatar,
    };

    const response = await fetch("http://127.0.0.1:8080/upload", requestOptions);
    const filename = await response.json()

    const variables = {
      first_name: registrationInfo.firstName,
      last_name: registrationInfo.lastName,
      email: registrationInfo.email,
      password: registrationInfo.password,
      username: registrationInfo.studentProfile.username,
      profile_image: filename,
      student_email: registrationInfo.studentProfile.studentEmail,
      country: registrationInfo.studentProfile.country,
      city: registrationInfo.studentProfile.city,
      statement: registrationInfo.studentProfile.statement,
      hobbies: registrationInfo.studentProfile.hobbies,
      course_id: registrationInfo.studentProfile.interest,
    };
    await request("http://127.0.0.1:8080/graphql", mutation, variables);

    dispatch(registrationActions.RESET());
  };

  return register;
};

export default useRegisterStudent;
