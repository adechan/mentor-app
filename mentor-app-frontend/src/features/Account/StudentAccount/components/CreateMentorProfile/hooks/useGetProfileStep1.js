import { useDispatch } from 'react-redux';
import { registrationActions } from '../../../../../../store/slices/registrationSlice';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

export const useGetProfileStep1 = (step1) => {

  const dispatch = useDispatch();
  const history = useHistory();

    const handleNextStep = () => {
        dispatch(registrationActions.SET_ACCOUNT_INFO({
            mentorProfile: {
                avatar: step1.avatar,
                username: step1.username,
                mentorEmail: step1.mentorEmail,
                country: step1.country,
                city: step1.city,
            }
        }))

        history.push("/student-account/create-mentor/personal")
    }


    const formik = useFormik({
        initialValues: {
            avatar: '',
            username: '',
            mentorEmail: '',
            country: '',
            city: '',
        },
        validationSchema: Yup.object({
        avatar: Yup.string(),
        username: Yup.string()
            .required('Required'),
        mentorEmail: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        country: Yup.string()
            .required('Required'),
        city: Yup.string()
            .required('Required'),
        }),
        onSubmit: () => {
            handleNextStep();
        },
    });
    return { formik };
};  
