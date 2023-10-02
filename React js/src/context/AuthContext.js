import React from "react"; 

const AuthContext = React.createContext({
    isLoggedin : false,
    onLogin:()=>{},
    onLogout:()=>{}
}) 

export default AuthContext;