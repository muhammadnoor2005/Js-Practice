import { Button } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Bars } from "react-loader-spinner";


export default function(){
        const router = useRouter();
        const [loadingBar,setLoadingBar] = useState(false);
        //router.push can go back
    
        const logout = () => {
            Cookies.remove("token",{path:"/"});
            toast.success("Logged out")
            router.reload();
        }

        const profileHandler = () => {
            router.push("/home/profile");
            setLoadingBar(true);
        }
        const studentDetailsHandler = () => {
            router.push("studentDetails");
            setLoadingBar(true);
        }
    
        return(
            <div>
                <Toaster/>
                Teacher
                <Button type="primary" onClick={logout}>Signout</Button>
                <Button type="primary" onClick={profileHandler}>Edit profile</Button>
                <Button type="primary" onClick={studentDetailsHandler}>Show Students</Button>
                
                <div className={loadingBar ? "loadingBars":"loadingBarsHide"}>
                    <Bars
                        height="80"
                        width="80"
                        color="crimson"
                        ariaLabel="bars-loading"
                        wrapperStyle={{
                            // display:"none"
                        }}
                        wrapperClass=""
                        visible={true}        
                    />
                </div>
            </div>
        )
        
}