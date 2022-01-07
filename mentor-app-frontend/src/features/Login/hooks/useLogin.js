import { gql } from "graphql-request";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetAccountInfo } from "./useSetAccountInfo";

export const useLogin = (accountInfo, graphQLClient) => {
  const setAccountInfo = useSetAccountInfo(graphQLClient);

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
    try {
      await graphQLClient.request(mutation, variables);
      setAccountInfo();
    } catch (e) {
      formik.setFieldError("email", "Invaid email or password");
      formik.setFieldError("password", "Invaid email or password");
    }
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
