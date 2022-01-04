import { gql,  } from "graphql-request";

export const useLogout = (graphQLClient) => {

  const mutation = gql`
    mutation logout {
      logout {
        result
        error
      }
    }
  `;

  const handleLogout = async () => {
     await graphQLClient.request(mutation);
  };

  return handleLogout
};
