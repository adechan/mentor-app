import { request, gql } from "graphql-request";
import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registrationActions } from '../../../../../store/slices/registrationSlice';


const useRegisterStudent = () => {
    const dispatch = useDispatch();
    const registrationInfo = useSelector((store) => store.registration);

    console.log(registrationInfo)

    const register = () => {
        console.log('register hereer')
    }

    return register;
};

export default useRegisterStudent;
