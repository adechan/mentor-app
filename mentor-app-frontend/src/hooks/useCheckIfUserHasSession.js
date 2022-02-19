import { gql } from "graphql-request";
import {  useEffect } from "react";
import { useDispatch } from "react-redux";

import { accountActions } from "../store/slices/accountSlice";

const useCheckIfUserHasSession = (graphQLClient) => {
  const dispatch = useDispatch();

  const query = gql`
    query getAccountInfo {
      account_info {
        account_id
        mentor_id
        student_id
      }
    }
  `;

  const setAccountInfo = async (accountInfo) => {
    dispatch(accountActions.SET_ACCOUNT_ID(accountInfo?.account_id));

    let profiles = [];

    if (accountInfo?.student_id || accountInfo?.mentor_id) {
      dispatch(
        accountActions.SET_PROFILES({
          ...profiles,
          studentId: accountInfo?.student_id || null,
          mentorId: accountInfo?.mentor_id || null,
        })
      );
    }

    if (accountInfo?.student_id) {
      dispatch(accountActions.SET_SELECTED_PROFILE_ID(accountInfo.student_id));
      return;
    }

    if (accountInfo.mentor_id) {
      dispatch(accountActions.SET_SELECTED_PROFILE_ID(accountInfo?.mentor_id));
      return;
    }
  };

  const getAccountId = async () => {
    try {
      const data = await graphQLClient.request(query);
      setAccountInfo(data?.account_info);
    } catch (e) {
      console.log("not authenticated");
    }
  };

  useEffect(() => {
    getAccountId();
  }, []);
};

export default useCheckIfUserHasSession;
