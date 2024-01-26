import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import axios from "../../axios";
import { parse } from "cookie";
import AttendanceHistory from "@/component/AttendanceHistory/AttendanceHistory";
import { Bars } from "react-loader-spinner";

export default function({token}) {
    const router = useRouter();

    const {attendanceRecord} = router.query;
    const [attendance,setAttendance] = useState(false);
    
    useEffect(() => {
        const fetch = async() => {
            const data = {
                email:attendanceRecord
            }
            try {
                const resp = await axios.post("/student/attendance/",data,{
                    headers:{
                        token
                    }
                });
                
                if(resp.status === 200){
                    setAttendance(resp.data);
                }
                
            } catch (err) {
                throw(err);
            }
        }

        fetch();
    },[]);

    //while data fetching
    if(!attendance){
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
            <AttendanceHistory data={{attendance}}/>
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