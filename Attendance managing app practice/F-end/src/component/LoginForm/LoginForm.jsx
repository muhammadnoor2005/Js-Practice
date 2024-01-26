import axios from "../../axios";
import { useState } from 'react';
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React from "react";
import { Button, Input } from "antd";
import styles from "./LoginForm.module.scss";

import toast, { Toaster } from "react-hot-toast";
import { Bars } from "react-loader-spinner";
// import { TextField } from "@mui/material";

export default function (){
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);

    const [loaderBool,setLoaderBool] = useState(false);
    const router = useRouter();
   
    const login = async (e) => {
        const data = {
            email, password
        }
        e.preventDefault();

        try{
            setLoaderBool(true);
            const resp = await axios.post("/auth/login/",data);
            if(resp.data.token){
                const token = resp.data.token;
                Cookies.set("token",token,{path:"/"});

                setLoaderBool(false);
                toast.success("Login successful");
                router.reload();
            }
            else{
                setLoaderBool(false);
                toast.error("Wrong info");
            };
            
        } catch(err){
            console.log(err);
        }
        
    }

    
    return(
        
        <div>
             <Bars
                height="80"
                width="80"
                color="crimson"
                ariaLabel="bars-loading"
                wrapperStyle={{
                    // display:"none"
                }}
                wrapperClass={loaderBool ? "loadingBars":"loadingBarsHide"}
                visible={loaderBool}        
            />

            <Toaster/>

            <div  className={styles.loginFormParentDiv}>
                <form onSubmit={login} className={styles.loginForm}>
                    <p1>Login</p1>
                    <br />
                    <div>
                        <label>Email: </label> <br />
                        <Input placeholder="Enter your email" type="text" onChange={(e) => {setEmail(e.target.value)}}/>
                
                        <br /> <br />

                        <label>Password: </label><br />
                        <Input.Password placeholder="Enter your password" onChange={(e) => {setPassword(e.target.value)}} /> 

                        <br />
                        <br />
                    </div>

                    <div className={styles.loginButtonDiv}>
                        <Button type="primary" htmlType="submit">Login</Button>
                        <br />
                        <div>
                            <span >Don't have an account? </span>
                            <span className={styles.signupSpan} onClick={() => {router.push("/auth/signup")}}>Signup</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}