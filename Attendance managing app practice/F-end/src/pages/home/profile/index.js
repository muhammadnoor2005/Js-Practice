import { parse } from "cookie";
import axios from "../../../axios";

import Profile from "@/component/profile/Profile";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Bars } from "react-loader-spinner";

export default function({token}){
    const [data,setData] = useState();
    useEffect(() => {
        const fetch = async() => {
            try{
            const resp = await axios.get("/profile/",{
                headers:{
                    token
                }
            });
    
            if(resp.status === 200){
                setData(resp.data);
            }
            } catch(err){
                toast.error(err.message);
            }
        }

        fetch();
    },[]);


    if(!data){
        return(   
            <div className="loadingBars">
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
        );
    };

    return(
        <div>
            <Toaster/>
            <div style={{display:"flex",justifyContent:"center"}}>
                <Profile data={data} token={token} profileHead={"Profile"}/>
            </div>
        </div>
    )
}

export async function getServerSideProps({req}){
    const cookies = req.headers.cookie || '';
    const parsedCookie = parse(cookies);
    // console.log(parsedCookie.token)

    if(!parsedCookie.token){
        return{
            redirect:{
                destination:"/auth/login",
                permanent:false,
            }
        };
    }else{
        return {
            props:{
                token:parsedCookie.token,
            }
        } 
    }
};