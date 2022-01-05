import { useDispatch, useSelector } from 'react-redux';
import { registrationActions } from '../../../../../../store/slices/registrationSlice';
import useCreateMentorProfile from "./useCreateMentorProfile";

import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

export const useGetProfileStep3 = (thirdStep, graphQLClient) => {

  const createMentorProfile = useCreateMentorProfile(graphQLClient);
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

        history.push("/student-account/awards")
    }

    useEffect(() => {
        if (mentorProfile.quote) {
            createMentorProfile();
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
