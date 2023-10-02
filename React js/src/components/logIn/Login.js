import { useContext, useEffect, useState } from "react";
import AuthContext from '../../context/AuthContext';
import React from 'react';

// const Login = ()=>{

//     // useEffect(()=>{
//     //     console.log("USE EFFECT")
//     //     const timeOut = setTimeout(()=>{
//     //         setData(data.length > 6)
//     //     },500) ;
//     //     return () => {
//     //         clearTimeout(timeOut)
//     //     }
//     // },[data])
//     const authCtx = useContext(AuthContext);
//     return(
//     <div>
//         <button onClick={authCtx.onLogin}>Login</button>
//         {/* <input type ="text" onChange={onTextChange} value={data}/> */}
//     </div>
//     )
// }


function Login(){
    const authCtx = useContext(AuthContext);
    return(
        <button onClick={authCtx.onLogin}>Login</button>
    )
} 
export default Login;