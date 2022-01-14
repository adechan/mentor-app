import { request, gql } from "graphql-request";
import { useDispatch, useSelector } from "react-redux";
import { registrationActions } from "../../../../../store/slices/registrationSlice";

const useRegisterMentor = () => {
  const dispatch = useDispatch();
  const registrationInfo = useSelector((store) => store.registration);

  const mutation = gql`
    mutation registerMentor(
      $first_name: String!
      $last_name: String!
      $email: String!
      $password: String!
      $username: String!
      $profile_image: String
      $mentor_email: String
      $country: String!
      $city: String!
      $hobbies: String
      $statement: String
      $quote: String
    ) {
      register_mentor(
        first_name: $first_name
        last_name: $last_name
        email: $email
        password: $password
        profile: {
          username: $username
          profile_image: $profile_image
          country: $country
          city: $city
          mentor_email: $mentor_email
          hobbies: $hobbies
          statement: $statement
          quote: $quote
        }
      ) {
        result
      }
    }
  `;

  const register = async () => {
    const requestOptions = {
      method: "POST",
      body: registrationInfo.mentorProfile.avatar,
    };

    const response = await fetch(
      "http://127.0.0.1:8080/upload",
      requestOptions
    );
    const filename = await response.json();

    const variables = {
      first_name: registrationInfo.firstName,
      last_name: registrationInfo.lastName,
      email: registrationInfo.email,
      password: registrationInfo.password,
      username: registrationInfo.mentorProfile.username,
      profile_image: filename,
      mentor_email: registrationInfo.mentorProfile.mentorEmail,
      country: registrationInfo.mentorProfile.country,
      city: registrationInfo.mentorProfile.city,
      statement: registrationInfo.mentorProfile.statement,
      hobbies: registrationInfo.mentorProfile.hobbies,
      quote: registrationInfo.mentorProfile.quote,
    };
    await request("http://127.0.0.1:8080/graphql", mutation, variables);

    dispatch(registrationActions.RESET());
  };

  return register;
};

export default useRegisterMentor;
