import { request, gql } from "graphql-request";
import { useDispatch, useSelector } from "react-redux";
import { accountActions } from "../../../../../../store/slices/accountSlice";
import { registrationActions } from "../../../../../../store/slices/registrationSlice";

const useCreateMentorProfile = (graphQLClient) => {
  const dispatch = useDispatch();
  const registrationInfo = useSelector((store) => store.registration);
  const profiles = useSelector((store) => store.account.profiles);
  const accountId = useSelector((store) => store.account.accountId);

  const mutation = gql`
    mutation createMentorProfile(
      $account_id: ID!
      $username: String!
      $profile_image: String
      $mentor_email: String
      $country: String!
      $city: String!
      $hobbies: String
      $statement: String
      $quote: String
    ) {
      create_mentor_profile(
        account_id: $account_id
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

  const createMentorProfile = async () => {
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
      account_id: accountId,
      username: registrationInfo.mentorProfile.username,
      profile_image: filename,
      mentor_email: registrationInfo.mentorProfile.mentorEmail,
      country: registrationInfo.mentorProfile.country,
      city: registrationInfo.mentorProfile.city,
      statement: registrationInfo.mentorProfile.statement,
      hobbies: registrationInfo.mentorProfile.hobbies,
      quote: registrationInfo.mentorProfile.quote,
    };

    const data = await graphQLClient.request(mutation, variables);

    const result = data?.create_mentor_profile?.result;
    if (result) {
      dispatch(
        accountActions.SET_PROFILES({
          ...profiles,
          mentorId: result,
        })
      );
    }

    dispatch(registrationActions.RESET());
  };

  return createMentorProfile;
};

export default useCreateMentorProfile;
