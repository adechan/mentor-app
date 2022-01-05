import { useDispatch, useSelector } from 'react-redux';
import { registrationActions } from '../../../../../../store/slices/registrationSlice';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

export const useGetProfileSecondStep = (secondStep) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const studentProfile = useSelector((store) => store.registration.studentProfile);

    const handleNextStep = () => {
        dispatch(registrationActions.SET_ACCOUNT_INFO({
            studentProfile: {
                ...studentProfile,
                statement: secondStep.statement,
                hobbies: secondStep.hobbies, 
            }
        }))

        history.push("/mentor-account/create-student/interests")
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
