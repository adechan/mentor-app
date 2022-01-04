import { request, gql } from "graphql-request";
import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registrationActions } from '../../../../../store/slices/registrationSlice';


const useRegisterMentor = () => {
    const dispatch = useDispatch();
    const registrationInfo = useSelector((store) => store.registration);

    console.log(registrationInfo)

    const register = () => {
        console.log('register hereer')
        // + add stuff into the Account slice maybe
        // + reset Registration slice
    }

    return register;
};

export default useRegisterMentor;
