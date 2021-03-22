import React, { useState } from 'react'
import '../LoginPage/LoginPage.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Register } from '../../ReduxFiles/Actions/UserActions'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RootStore } from '../../index'

const schema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    userName: yup.string().required(),
    dob: yup.date().required(),
    password: yup.string().min(4).max(15).required()
});
const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const [Error, setError] = useState(false);
    const [Value, setValue] = useState<RegisterValues>({
        email: "",
        fullName: "",
        password: "",
        userName: "",
        dob: ""
    });

    const state = useSelector((state: RootStore) => state.mainReducer.register);
    // onchange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...Value, [e.target.name]: e.target.value
        });
    }

    // submit
    const submitForm = (): void => {
        dispatch(Register(Value));
        if (state?.status) {
            window.location.replace('/login')
        }
        else{
            setError(true)
        }
    }
    return (
        <div className="login-page">
            <div className="container">
                <div className="text">
                    Log in to continue
               </div>
                <div className={errors ? "register-page" : "page"}>
                    <div className="title">
                        instagram
                   </div>
                    <form className="login-form" onSubmit={handleSubmit(submitForm)}>
                        <input name="email" type="email" placeholder="email" onChange={handleChange} value={Value.email} ref={register} />
                        <span className={errors.email ? "login-errors" : "login-errors-none"}>*invalid email</span>
                        <input name="fullName" type="text" placeholder="full name" onChange={handleChange} value={Value.fullName} ref={register} />
                        <span className={errors.fullName ? "login-errors" : "login-errors-none"}>*name is invalid</span>
                        <input name="userName" type="text" placeholder="username" onChange={handleChange} value={Value.userName} ref={register} />
                        <span className={errors.userName ? "login-errors" : "login-errors-none"}>*invalid username</span>
                        <input name="dob" type="date" placeholder="DOB" onChange={handleChange} value={Value.dob} ref={register} />
                        <span className={errors.dob ? "login-errors" : "login-errors-none"}>*dob is required</span>
                        <input name="password" type="password" placeholder="password" onChange={handleChange} value={Value.password} ref={register} />
                        <span className={errors.password ? "login-errors" : "login-errors-none"}>*invalid password</span>
                        <button type="submit">Sign up</button>
                    </form>
                    <span className={Error ? "login-errors" : "login-errors-none"}>*account already exist</span>
                    <div className="signup">
                        <p>Have an account?<Link to='/login'>Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
