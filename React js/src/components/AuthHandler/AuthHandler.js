import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import React from 'react';
import Home from '../home/Home';
import Login from "../logIn/Login";

export default function AuthHandler(){
    const authCtx = useContext(AuthContext);
    return(
        <div>{authCtx.isLoggedin?<Home/>:<Login/>}</div>
    )
} 