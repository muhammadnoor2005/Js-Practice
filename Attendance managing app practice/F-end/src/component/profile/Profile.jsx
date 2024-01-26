import axios from "../../axios";

import { useState } from "react";
import { useRouter } from "next/router";

import { Bars } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

import styles from "./Profile.module.scss";

import EditInfoForm from "./EditInfoForm/EditInfoForm";
import Info from "./Info/Info";
import EditPass from "./EditPass/EditPass";
import ProfileManageContext from "@/context/ProfileManageContext";

export default function({data,token,profileHead,setEditStudentBool}){
    console.log(setEditStudentBool)
    const [editNameBool,setNameBool] = useState(false);
    const [editPassBool,setPassBool] = useState(false);
    const [loaderBool,setLoaderBool] = useState(false);
    const router = useRouter();
    
    const {email} = data;

    //upadte img
    const editImg = async (img) => {
        try{    
            setLoaderBool(true);
            const resp = await axios.post("/profile/editImg",{email,img},{ // sirf img bhej rahengy hongy to usko obj mai rakh k bhejengy warna error aega
                headers:{
                    'Content-Type': 'multipart/form-data',
                    token:token
                }
            });

            setLoaderBool(false);
            toast.success(resp.data);

            router.reload();
        } catch(err){
            toast.error(err);
        }
        // console.log(img);
    }

    //update name
    const editedInfo = async (newFName,newLName) => {
        const data = {
            email,newFName,newLName
        }
        try{
            const resp = await axios.post("/profile/edit",data,{
                headers:{
                    token
                }
            });
            if(resp.data === "Updated"){
                toast.success(resp.data);
                router.reload();
            } else{
                toast.error(resp.data);
            }
   
        }catch(err){
            toast.error(err);
        }
    }

    //update Pass
    const verifyOldPass = async(oldPass) => {
        try {
            const resp = await axios.post("/profile/verifyOldPass",{email,oldPass},{
                headers:{
                    token
                }
            });
            return resp.data;
            
        } catch (error) {
            console.log(err);
        }
    }

    //upadte the password
    const updatePass = async  (password) => {
        try{
            const resp = await axios.post("/profile/upadtePassword",{email,password},{
                headers:{
                    token
                }
            })
            return resp.data;
        } catch(err){
            console.log(err);
        }
    }

    //to delete account
    const deleteAcc = async () => {
        try {
            const resp = await axios.post("/profile/deleteAccount",{email},{
                headers:{
                    token
                }
            });
            return resp.data;
                          
        } catch (err) {
            console.log(resp.data);
         return(err)   
        }
       
    }


    return(
        <div className={styles.mainProfileDiv}>
            <Toaster/>
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
            <ProfileManageContext.Provider value={{
                data,
                editImg,
                setNameBool,
                setPassBool,
                deleteAcc,
                profileHead,
                editedInfo,
                editNameBool,
                verifyOldPass,
                updatePass,
                editPassBool,
                setEditStudentBool
            }}>
                <div className={styles.infoDiv}>
                    <div>
                        <Info profileHead={profileHead}/>
                    </div>

                    <div style={{
                        display:editNameBool ? "block": "none"
                    }}>
                        <EditInfoForm/>
                    </div>

                    <div >
                        <EditPass/>
                    </div>
                </div>
            </ProfileManageContext.Provider>
        </div>
    )
}