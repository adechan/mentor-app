import { useDispatch, useSelector } from "react-redux";
import { request, gql } from "graphql-request";

import { useHistory } from "react-router-dom";
import { accountActions } from "../../../store/slices/accountSlice";

export const useSetAccountInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  
  const profiles = useSelector((store) => store.account.profiles);

  const getAccountInfoQuery = gql`
    query getAccountInfo($account_id: ID!) {
      account_info(account_id: $account_id) {
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
    // HARD CODED - ACCOUNT ID
    const hardCodedAccountId = 12;
    dispatch(accountActions.SET_ACCOUNT_ID(hardCodedAccountId));

    const accountInfoVariables = {
        account_id: hardCodedAccountId,
      };

      const data = await request(
        "http://127.0.0.1:8080/graphql",
        getAccountInfoQuery,
        accountInfoVariables
      );

      const result = data?.account_info;
    
      let profiles = []
      if (result.student_id) {
        dispatch(accountActions.SET_PROFILES({
            ...profiles,
            studentId: result.student_id    
        }));
      }

      if (result.mentor_id) {
        dispatch(accountActions.SET_PROFILES({
            ...profiles,
            mentorId: result.mentor_id    
        }));
      }
     
      if (result.student_id) {
        dispatch(accountActions.SET_SELECTED_PROFILE_ID(result?.student_id));

        history.push("/student-account")
        return;
      } 

      if (result.mentor_id) {
        dispatch(accountActions.SET_SELECTED_PROFILE_ID(result?.mentor_id));

        history.push("/mentor-account")
        return;
      }

      console.log("> ", data)
  };

  return setAccountInfo;
};
