import { useDispatch } from 'react-redux';
import { registrationActions } from '../../../store/slices/registrationSlice';
import useIsEmailUsed from "./useIsEmailUsed";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

export const useRegistration = (accountInfo) => {
    const isEmailUsed = useIsEmailUsed(accountInfo.email);

  const dispatch = useDispatch();
  const history = useHistory();

    const handleNextStep = () => {
        dispatch(registrationActions.SET_ACCOUNT_INFO({
            firstName: accountInfo.firstName,
            lastName: accountInfo.lastName,
            email: accountInfo.email,
            password: accountInfo.password,
        }))

        history.push("/create-profile");
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('First name is required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .test('unique-email', 'This email is already taken',  async () => {
                return !await isEmailUsed();
            })
            .required('Email is required'),
        password: Yup.string()
            .min(5, "Password must be at least 5 characters")
            .required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match")
        }),
        onSubmit: () => {
            handleNextStep();
        },
    });
    return { formik };
};  
