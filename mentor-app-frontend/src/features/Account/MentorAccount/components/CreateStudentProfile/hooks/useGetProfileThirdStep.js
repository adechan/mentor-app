import { useDispatch, useSelector } from 'react-redux';
import { registrationActions } from '../../../../../../store/slices/registrationSlice';
import useCreateStudentProfile from "./useCreateStudentProfile";

import { useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory} from 'react-router-dom';

export const useGetProfileThirdStep = (thirdStep, graphQLClient) => {

  const createStudentProfile = useCreateStudentProfile(graphQLClient);
  const dispatch = useDispatch();
  const history = useHistory();

  const studentProfile = useSelector((store) => store.registration.studentProfile);

    const handleNextStep = () => {
        dispatch(registrationActions.SET_ACCOUNT_INFO({
            studentProfile: {
                ...studentProfile,
                interest: thirdStep.id,
            }
        }))

        history.push("/mentor-account/reviews")
    }
    

    useEffect(() => {
        if (studentProfile.interest) {
            createStudentProfile();
        }
    }, [studentProfile.interest])


    const formik = useFormik({
        initialValues: {
            interest: '',
        },
        validationSchema: Yup.object({
        interest: Yup.string()
            .required('Required'),
        }),
        onSubmit: () => {
            handleNextStep();
        },
    });
    return { formik };
};  
