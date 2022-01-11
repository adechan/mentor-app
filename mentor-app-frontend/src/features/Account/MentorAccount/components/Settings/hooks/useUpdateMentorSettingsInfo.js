import { gql } from "graphql-request";
import { useSelector } from "react-redux";

const useUpdateMentorSettingsInfo = (graphQLClient, updatedSettings) => {
  const accountId = useSelector((store) => store.account.accountId);

  const mutation = gql`
    mutation updateMentorSettingsInfo(
      $account_id: ID!
      $first_name: String!
      $last_name: String!
      $username: String!
      $mentor_email: String!
      $country: String!
      $city: String!
      $hobbies: String!
      $statement: String!
      $quote: String!
    ) {
      update_mentor_settings_info(
        account_id: $account_id
        settings_info: {
          first_name: $first_name
          last_name: $last_name
          username: $username
          mentor_email: $mentor_email
          country: $country
          city: $city
          hobbies: $hobbies
          statement: $statement
          quote: $quote
        }
      ) {
        result
      }
    }
  `;

  const updateMentorSettings = async () => {
    const variables = {
      account_id: accountId,
      first_name: updatedSettings.firstName,
      last_name: updatedSettings.lastName,
      username: updatedSettings.mentorUsername,
      mentor_email: updatedSettings.email,
      country: updatedSettings.country,
      city: updatedSettings.city,
      hobbies: updatedSettings.hobbies,
      statement: updatedSettings.description,
      quote: updatedSettings.quote
    };

    await graphQLClient.request(mutation, variables);
   
  };

  return updateMentorSettings;
};

export default useUpdateMentorSettingsInfo;
