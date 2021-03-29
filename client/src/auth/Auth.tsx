/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "..";
import { Authentication } from "../ReduxFiles/Actions/UserActions";
export default function (SpecificComponent: React.FC, option: boolean) {
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const token: string = window.sessionStorage.getItem('token') || "";
    const state = useSelector((state: RootStore) => state.mainReducer.auth!);

// useEffect(() => {
//   if(state && state.error && state.error.name==="TokenExpiredError" ){
//     window.sessionStorage.removeItem('token')
//     window.location.replace('/login')
//   }
// }, [token]);
    useEffect(() => {
      dispatch(Authentication(token))
      if (token && !option) {
        window.location.replace('/')
      }
      else if (!token && option) {
        window.location.replace('/login')
      }
    }, [token]);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
