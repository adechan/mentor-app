import { request, gql } from "graphql-request";

const useIsEmailUsed = (email) => {
  const query = gql`
    query isEmailInUse($email: String!) {
      is_email_in_use(email: $email) {
        result
      }
    }
  `;

  const variables = {
    email: email,
  };

  const isEmailUsed = async () => {
   const data = await request("http://127.0.0.1:8080/graphql", query, variables);
   return data.is_email_in_use?.result;
  }
 
  return isEmailUsed;
};

export default useIsEmailUsed;
