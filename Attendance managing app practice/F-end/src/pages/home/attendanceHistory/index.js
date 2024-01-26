import AttendanceHistory from "@/component/AttendanceHistory/AttendanceHistory";
import { parse } from "cookie";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Bars } from "react-loader-spinner";

//page for student
export default function({token}){
    const [data,setData] = useState();

    useEffect(() => {
        const fetch = async () => {
            try{
                const resp = await axios.get("/profile/",{
                    headers:{
                        token
                    }
                });
                if(resp.status === 200){
                    setData(resp.data);
                    // console.log(resp.data)
                } else{
                    toast.error(resp.data.message);
                }
            } catch(err){
                toast.error(err.message);
            }
        }

        fetch();
    },[]);

    //while the request is completing
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
        )
    }

    return(
        <div>
            <Toaster/>

            <AttendanceHistory data={data}/>
        </div>
    )
}

export async function getServerSideProps({req}){
    const cookies = req.headers.cookie || '';
    // console.log(cookies);
    const parsedCookie = parse(cookies);

    if(!parsedCookie.token){
        return{
            redirect:{
                destination:"/auth/login",
                permanent:false,
            }
        };
    } else{
        return{
            props:{
                token: parsedCookie.token,
            }
        }
    }
};