import { REGISTER, DispatchTypes, LOGIN, AUTH } from '../Types/Types';
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

export const Authentication = (data: string) => async (dispatch: Dispatch<DispatchTypes>) => {
    try {
        const res = await axios.post(`/api/user/auth?token=` + data).then(response => response.data);

        dispatch({
            type: AUTH,
            payload: res
        })

    } catch (e) {
        console.log(e)
    }
};