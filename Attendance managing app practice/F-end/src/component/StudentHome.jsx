
import { formattedDate, getTimeAgo } from "@/services/date";

import { calculateDistance } from "@/services/locationCalculate";
import { Button } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Bars } from "react-loader-spinner";

import axios from "../axios";

export default function({data,token}){
    //time ago div hide show
    const [timeAgoBool,setTimeAgoBool] = useState(false);
    

    //is attendance array empty
    let isEmpty;
    
    if(data.attendance.length === 0){
        isEmpty = true;
    } else{
        isEmpty = data.attendance[0].checkOutTime;
    }


    
    const router = useRouter();
    const [loadingBar,setLoadingBar] = useState(false);
    const [attendanceBool,setAttendanceBool] = useState(isEmpty);
    const [timeAgo,setTimeAgo] = useState();

   

    useEffect(() => {
        if(data.attendance.length !== 0){
            //changing the time on checkin and checkout
            const isTimeAgoEmpty = data.attendance[0].checkOutTime || data.attendance[0].checkInTime;
            setTimeAgo(getTimeAgo(isTimeAgoEmpty));

            //showing timwe ago div
            setTimeAgoBool(true);

            if(data.attendance[0].checkOutTime){

                setInterval(() => {
                    const t = getTimeAgo(data.attendance[0].checkOutTime);
                    setTimeAgo(t);
                },60000);

            } else{
                // console.log("Ca")
                setInterval(() => {
                    const t = getTimeAgo(data.attendance[0].checkInTime);
                    setTimeAgo(t);
                },60000);
            }
        }
        //updating useEffect on checkin and checkout 
    },[attendanceBool]);
   
    const logout = () => {
        Cookies.remove("token",{path:"/"});
        toast.success("Logged out");
        router.reload();
    }

    //view profile click
    const viewProfileHandle = () =>{
        router.push("/home/profile");
        setLoadingBar(true);
    }
    
 
    //get student location
    const getLocation = async () => {
        return new Promise((resolve,reject) => {

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position) =>{

                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    resolve(calculateDistance(latitude,longitude));

                },(err) => {
                    toast.error(err.message);
                reject(err.message);
            })
            } else{
                toast.error("Not allowed");
            }
        })
        
    }


    //checkin student
    const checkIn = async () => {
        const isInRadius = await getLocation();
        console.log(isInRadius)

        if (!isInRadius) {
            toast.error('You are not in the area!');
            return;
        }else{
            try {
                setLoadingBar(true);
                const checkInTime = new Date().getTime();
                const resp = await axios.post("/student/checkin/",{checkInTime},{
                    headers:{
                        token
                    }
                });

                if(resp.data === "Attendance marked"){
                    setLoadingBar(false);
                    toast.success(resp.data);
                    setAttendanceBool(undefined);
                    router.reload();

                } else{
                    setLoadingBar(false);
                    toast.error(resp.data.message);
                }

            } catch (error) {
                setLoadingBar(false);
                toast.error(error.message);
            }
        }
        
    }

    const checkOut =  async() => {
       
            try {
                setLoadingBar(true);
                const checkOutTime = new Date().getTime();
                const resp = await axios.post("/student/checkout/",{checkOutTime},{
                    headers:{
                        token
                    }
                });

                if(resp.data === "Checked out"){
                    setLoadingBar(false);
                    toast.success(resp.data);
                    setAttendanceBool(true);
                    router.reload();

                } else{
                    setLoadingBar(false);
                    toast.error(resp.data);
                }

            } catch (error) {
                setLoadingBar(false);
                toast.error(error.message);
            }
        
    }
    return(
        <div>
            Student Page
            <Toaster/>
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
            <Button type="primary" onClick={logout}>Signout</Button>
            <Button type="primary" onClick={viewProfileHandle}>View profile</Button>
            {timeAgoBool &&
                <div>
                    {attendanceBool ? <span>Checked out {timeAgo} ago</span> : <span>Checked in {timeAgo} ago</span>}
                </div>
            }

            <div>
                {attendanceBool? <Button type="primary" onClick={checkIn}>Check-in</Button>:
                <Button type="primary" onClick={checkOut}>Check-out</Button>}
            </div>
            <div>
                <Button type="primary" onClick={() => {router.push("home/attendanceHistory")}}>Attendance Record</Button>
            </div>
        </div>
    );
};