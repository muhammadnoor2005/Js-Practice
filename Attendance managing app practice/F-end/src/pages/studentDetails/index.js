import { parse } from "cookie";
import axios from "../../axios";
import StudentDetail from "@/component/StudentDetail/StudentDetail";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Bars } from "react-loader-spinner";

export default function({token}){
    const [students,setStudents] = useState();

    useEffect(() => {
        const fetch = async () => {
            try {
                 //gets all students in an array
                const resp =  await axios.get("/student/allStudents",{
                headers:{
                    token
                }    
            })

            setStudents(resp.data);
                
            } catch (err) {
                toast.error(err.message);
            }
        }
        fetch();
    },[]);


    if(!students){
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
            <StudentDetail students={students} token={token}/>
        </div>
    )
}

export async function getServerSideProps({req}){
    const cookies = req.headers.cookie || '';
    const parsedCookie = parse(cookies);

    if(!parsedCookie.token){
        return{
            redirect:{
                destination:"/auth/login",
                permanent:false,
            }
        }
    }
    try{//gets the user role
        const resp = await axios.get("/student/",{
            headers:{
                token:parsedCookie.token
            }
        });

        //recived role in data
        const data = resp.data;

        //if role != teacher then not allow
        if(data === "Student"){
            return{
                redirect:{
                    destination:"/home",
                    permanent:false,
                }
            }

        } else{
            return{
                props:{
                    token:parsedCookie.token
                }
            }
        }
    } catch(err){
        console.log(err);
    }
    return{
        props:{}
    }
}