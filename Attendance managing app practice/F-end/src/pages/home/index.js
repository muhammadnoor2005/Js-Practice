import StudentHome from "@/component/StudentHome";
import TeacherHome from "@/component/TeacherHome/TeacherHome";
import axios from "../../axios";
import { parse } from "cookie";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

export default function HomePage({token}){
    const [data,setData] = useState();
    const [role,setRole] = useState();

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
                    setRole(resp.data.role);
                }

                return {
                    props:{
                        role:data.role,
                        token:parsedCookie.token,
                        data
                    }
                }
            } catch(err){
                console.log(err);
            }
        }

        fetch();
    },[]);

    if(!data || !role){
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


    if(role === "Student"){
        return (
        <>
            <StudentHome data={data} token={token}/>
        </>
        )
    } else{
        return(
            <>
                <TeacherHome/>
            </>
        );
    };
};

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
        return {
            props:{
                token:parsedCookie.token                
            }
        }
    } 
};