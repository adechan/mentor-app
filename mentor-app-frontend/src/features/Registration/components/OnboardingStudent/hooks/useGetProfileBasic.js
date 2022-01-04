import { useDispatch } from 'react-redux';
import { registrationActions } from '../../../../../store/slices/registrationSlice';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

export const useGetProfileBasic = (profileBasic) => {

  const dispatch = useDispatch();
  const history = useHistory();

    const handleNextStep = () => {
        dispatch(registrationActions.SET_ACCOUNT_INFO({
            studentProfile: {
                avatar: profileBasic.avatar,
                username: profileBasic.username,
                studentEmail: profileBasic.studentEmail,
                country: profileBasic.country,
                city: profileBasic.city,
            }
        }))

        history.push("/create-profile-student/personal")
    }


    const formik = useFormik({
        initialValues: {
            avatar: '',
            username: '',
            studentEmail: '',
            country: '',
            city: '',
        },
        validationSchema: Yup.object({
        avatar: Yup.string(),
        username: Yup.string()
            .required('Required'),
        studentEmail: Yup.string()
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
