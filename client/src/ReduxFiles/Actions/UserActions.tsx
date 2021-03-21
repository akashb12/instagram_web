import { REGISTER,DispatchTypes, LOGIN } from '../Types/Types';
import axios from 'axios'
import { Dispatch } from "redux";

export const Register = (data: RegisterValues) => async (dispatch: Dispatch<DispatchTypes>) => {
    try {

        const res = await axios.post(`/api/user/register`, data).then(response => response.data);

        dispatch({
            type: REGISTER,
            payload: res
        })

    } catch (e) {
        console.log(e)
    }
};

export const Login = (data: LoginValues) => async (dispatch: Dispatch<DispatchTypes>) => {
    try {

        const res = await axios.post(`/api/user/login`, data).then(response => response.data);

        dispatch({
            type: LOGIN,
            payload: res
        })

    } catch (e) {
        console.log(e)
    }
};