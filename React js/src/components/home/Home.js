import { useContext } from "react";
import AuthContext from "../../context/AuthContext"
import React from 'react';

export default function Home(){
    const authCtx = useContext(AuthContext)
    return(
        <button onClick={authCtx.onLogout}>Logout</button>
    )

} 