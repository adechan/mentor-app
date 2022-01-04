import { useDispatch, useSelector } from 'react-redux';
import { registrationActions } from '../../../../../store/slices/registrationSlice';
import useRegisterMentor from "./useRegisterMentor";

import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

export const useGetProfileStep3 = (thirdStep) => {

  const register = useRegisterMentor();
  const dispatch = useDispatch();
  const history = useHistory();

  const mentorProfile = useSelector((store) => store.registration.mentorProfile);

    const handleNextStep = () => {
        dispatch(registrationActions.SET_ACCOUNT_INFO({
            mentorProfile: {
                ...mentorProfile,
                quote: thirdStep.quote,
            }
        }))

        history.push("/login")
    }

    useEffect(() => {
        if (mentorProfile.quote) {
            register();
        }
    }, [mentorProfile.quote])


    const formik = useFormik({
        initialValues: {
            interest: '',
        },
        validationSchema: Yup.object({
        quote: Yup.string()
            .required('Required'),
        }),
        onSubmit: () => {
            handleNextStep();
        },
    });
    return { formik };
};  
