import { request, gql } from "graphql-request";
import { useDispatch, useSelector } from "react-redux";
import { accountActions } from "../../../../../../store/slices/accountSlice";
import { registrationActions } from "../../../../../../store/slices/registrationSlice";

const useCreateStudentProfile = (graphQLClient) => {
  const dispatch = useDispatch();
  const registrationInfo = useSelector((store) => store.registration);
  const accountId = useSelector((store) => store.account.accountId)
  const profiles = useSelector((store) => store.account.profiles);

  const mutation = gql`
    mutation createStudentProfile(
      $account_id: ID!
      $username: String!
      $profile_image: String
      $student_email: String
      $country: String!
      $city: String!
      $hobbies: String
      $statement: String
      $course_id: ID
    ) {
      create_student_profile(
        account_id: $account_id,
        profile: {
          username: $username,
          profile_image: $profile_image,
          country: $country,
          city: $city,
          student_email: $student_email,
          hobbies: $hobbies,
          statement: $statement,
          course_id: $course_id
        }
      ) {
        result
      }
    }
  `;

  const variables = {
    account_id: accountId,
    username: registrationInfo.studentProfile.username,
    profile_image: registrationInfo.studentProfile.avatar,
    student_email: registrationInfo.studentProfile.studentEmail,
    country: registrationInfo.studentProfile.country,
    city: registrationInfo.studentProfile.city,
    statement: registrationInfo.studentProfile.statement,
    hobbies: registrationInfo.studentProfile.hobbies,
    course_id: registrationInfo.studentProfile.interest,
  };

  const createStudentProfile = async () => {
    const data = await graphQLClient.request(mutation, variables);

    const result = data?.create_student_profile?.result;
    if (result) {
      dispatch(accountActions.SET_PROFILES({
        ...profiles,
        studentId: result    
    }));
    }

    dispatch(registrationActions.RESET());

  };

  return createStudentProfile;
};

export default useCreateStudentProfile;
