import React, { useState } from 'react'
import './LoginPage.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Login } from '../../ReduxFiles/Actions/UserActions';
import { RootStore } from '../..';
const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required()
});
const LoginPage: React.FC = () => {

    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    // states
    const [Value, setValue] = useState<LoginValues>({
        email: "",
        password: ""
    });

    const state = useSelector((state: RootStore) => state.mainReducer.login);
    if (state?.status) {
        window.sessionStorage.setItem('token', state.token || '')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...Value, [e.target.name]: e.target.value
        })
    }

    // submit form
    const submitForm = (data: LoginValues): void => {
        dispatch(Login(Value))
    }

    return (
        <div className="login-page">
            <div className="container">
                <div className="text">
                    Log in to continue
               </div>
                <div className="page">
                    <div className="title">
                        instagram
                   </div>
                    <form className="login-form" onSubmit={handleSubmit(submitForm)}>
                        <input name="email" type="email" placeholder="email  address" onChange={handleChange} ref={register} />
                        <span className={errors.email ? "login-errors" : "login-errors-none"}>*invalid email</span>
                        <input name="password" type="password" placeholder="password" onChange={handleChange} ref={register} />
                        <span className={errors.password ? "login-errors" : "login-errors-none"}>*invalid password</span>
                        <button type="submit">Log in</button>
                    </form>
                    <div className="signup">
                        <p>Don't have an account?<Link to='/register'>Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
