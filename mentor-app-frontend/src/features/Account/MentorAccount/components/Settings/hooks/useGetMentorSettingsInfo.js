import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useGetMentorSettingsInfo = (graphQLClient) => {
  const accountId = useSelector((store) => store.account.accountId);

  const [initialSettings, setInitialSettings] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    description: "",
    hobbies: "",
    quote: "",
  });

  const query = gql`
    query getMentorSettingsInfo($account_id: ID!) {
      get_mentor_settings_info(account_id: $account_id) {
        first_name
        last_name
        mentor_email
        country
        city
        statement
        hobbies
        quote
      }
    }
  `;

  const getMentorSettingsInfo = async () => {
    const variables = {
      account_id: accountId,
    };

    const data = await graphQLClient.request(query, variables);
    if (!data) {
      return;
    }

    const result = data?.get_mentor_settings_info;

    setInitialSettings((prev) => ({
      ...prev,
      firstName: result.first_name,
      lastName: result.last_name,
      email: result.mentor_email,
      country: result.country,
      city: result.city,
      description: result.statement,
      hobbies: result.hobbies,
      quote: result.quote,
    }));
  };

  useEffect(() => {
    if (accountId) {
      getMentorSettingsInfo();
    }
  }, [accountId]);

  return initialSettings;
};

export default useGetMentorSettingsInfo;
