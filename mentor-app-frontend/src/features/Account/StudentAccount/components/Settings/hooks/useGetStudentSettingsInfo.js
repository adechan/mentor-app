import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetStudentSettingsInfo = (graphQLClient) => {
  const accountId = useSelector((store) => store.account.accountId);

  const [initialSettings, setInitialSettings] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    description: "",
    hobbies: "",
  });

  const query = gql`
    query getStudentSettingsInfo($account_id: ID!) {
      get_student_settings_info(account_id: $account_id) {
        first_name
        last_name
        student_email
        country
        city
        statement
        hobbies
      }
    }
  `;

  const getStudentSettingsInfo = async () => {
    const variables = {
      account_id: accountId,
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_student_settings_info;

    setInitialSettings((prev) => ({
      ...prev,
      firstName: result.first_name,
      lastName: result.last_name,
      email: result.student_email,
      country: result.country,
      city: result.city,
      description: result.statement,
      hobbies: result.hobbies,
    }));
  };

  useEffect(() => {
    if (accountId) {
      getStudentSettingsInfo();
    }
  }, [accountId]);

  return initialSettings;
};

export default useGetStudentSettingsInfo;
