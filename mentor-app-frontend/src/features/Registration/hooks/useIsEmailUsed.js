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

  // TODO: SOMETHING IS BROKEN HERE???
  const isEmailUsed = () => {
   request("http://127.0.0.1:8080/graphql", query, variables).then((data) =>
      console.log(data)
    );
  }
 
  return isEmailUsed;
};

export default useIsEmailUsed;
