import { useDispatch } from "react-redux";
import { request, gql } from "graphql-request";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { accountActions } from "../../../store/slices/accountSlice";
import { useSetAccountInfo } from "./useSetAccountInfo";

export const useLogin = (accountInfo) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const setAccountInfo = useSetAccountInfo();

  const mutation = gql`
    mutation loginAccount($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        result
        error
      }
    }
  `;

  const variables = {
    email: accountInfo.email,
    password: accountInfo.password,
  };

  const handleLogin = async () => {
    const data = await request(
      "http://127.0.0.1:8080/graphql",
      mutation,
      variables
    );

    // PUTS STUFF INTO THE ACCOUNT SLICE
    // history.push("/create-profile");

    setAccountInfo();
    console.log(data);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(5, "Email or password invalid")
        .required("Required"),
    }),
    onSubmit: () => {
      handleLogin();
    },
  });
  return { formik };
};
