import { useDispatch, useSelector } from 'react-redux';
import { registrationActions } from '../../../../../store/slices/registrationSlice';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

export const useGetProfileStep2 = (secondStep) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const mentorProfile = useSelector((store) => store.registration.mentorProfile);

    const handleNextStep = () => {
        dispatch(registrationActions.SET_ACCOUNT_INFO({
            mentorProfile: {
                ...mentorProfile,
                statement: secondStep.statement,
                hobbies: secondStep.hobbies, 
            }
        }))

        history.push("/create-profile-mentor/interests")
    }


    const formik = useFormik({
        initialValues: {
            statement: '',
            hobbies: '',
        },
        validationSchema: Yup.object({
        statement: Yup.string()
            .required('Required'),
        hobbies: Yup.string()
            .required('Required'),
        }),
        onSubmit: () => {
            handleNextStep();
        },
    });
    return { formik };
};  
