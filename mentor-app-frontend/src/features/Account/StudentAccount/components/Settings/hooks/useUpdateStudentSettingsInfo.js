import { gql } from "graphql-request";
import { useSelector } from "react-redux";

const useUpdateStudentSettingsInfo = (graphQLClient, updatedSettings) => {
  const accountId = useSelector((store) => store.account.accountId);

  const mutation = gql`
    mutation updateStudentSettingsInfo(
      $account_id: ID!
      $first_name: String!
      $last_name: String!
      $student_email: String!
      $country: String!
      $city: String!
      $hobbies: String!
      $statement: String!
    ) {
      update_student_settings_info(
        account_id: $account_id
        settings_info: {
          first_name: $first_name
          last_name: $last_name
          student_email: $student_email
          country: $country
          city: $city
          hobbies: $hobbies
          statement: $statement
        }
      ) {
        result
      }
    }
  `;

  const updateStudentSettings = async () => {
    const variables = {
      account_id: accountId,
      first_name: updatedSettings.firstName,
      last_name: updatedSettings.lastName,
      student_email: updatedSettings.email,
      country: updatedSettings.country,
      city: updatedSettings.city,
      hobbies: updatedSettings.hobbies,
      statement: updatedSettings.description,
    };

    await graphQLClient.request(mutation, variables);
   
  };

  return updateStudentSettings;
};

export default useUpdateStudentSettingsInfo;
