import { useDispatch,} from "react-redux";
import { gql } from "graphql-request";

import { useHistory } from "react-router-dom";
import { accountActions } from "../../../store/slices/accountSlice";

export const useSetAccountInfo = (graphQLClient) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getAccountInfoQuery = gql`
    query getAccountInfo {
      account_info {
        account_id
        mentor_id
        student_id
        first_name
        last_name
        email
      }
    }
  `;

  const setAccountInfo = async () => {

      const data = await graphQLClient.request(
        getAccountInfoQuery,
      );

      const result = data?.account_info;

       dispatch(accountActions.SET_ACCOUNT_ID(result.account_id));

    
      let profiles = []

      if (result.student_id || result.mentor_id) {
        dispatch(accountActions.SET_PROFILES({
            ...profiles,
            studentId: result?.student_id || null,
            mentorId: result?.mentor_id || null 
        }));
      }

      if (result.student_id) {
        dispatch(accountActions.SET_SELECTED_PROFILE_ID(result?.student_id));

        history.push("/student-account/awards")
        return;
      } 

      if (result.mentor_id) {
        dispatch(accountActions.SET_SELECTED_PROFILE_ID(result?.mentor_id));

        history.push("/mentor-account/reviews")
        return;
      }
  };

  return setAccountInfo;
};
