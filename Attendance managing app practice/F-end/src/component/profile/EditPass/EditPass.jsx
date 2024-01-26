import { Button, Input } from "antd";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import styles from "./EditPass.module.scss";

import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import ProfileManageContext from "@/context/ProfileManageContext";



export default function(){
    const profileCtx = useContext(ProfileManageContext);

    const [oldPass,setOldPass] = useState();
    const router = useRouter();
    
    //show or hide edit password box
    const [newPassBool,setNewPassBool] = useState(false);

    const [newPass,setNewPass] = useState();
    const [confNewPass,setConfNewPass] = useState();

    //for clearing the fields on cancel press
    const handleOldPassCancel = () => {
        setOldPass("");
        profileCtx.setPassBool(false);
    }
    const handleNewPassCancel = () => {
        setNewPass("");
        setConfNewPass("");
        setNewPassBool(false);

    }


    //sends the value of oldPass to profile k index.js
    const handleOldPass = async(e) => {
        e.preventDefault();
        const resp = await profileCtx.verifyOldPass(oldPass);

        if(resp == "Password matched"){
            profileCtx.setPassBool(false);
            setNewPassBool(true);

            toast.success(resp);
            setOldPass("");
        }else{
            toast.error(resp);
        }
    }

    //sends value of new pass to index.js of profile.js and show response recived
    const handlePassUpdate= async (e) => {
        e.preventDefault();
        if(newPass !== confNewPass){
            toast.error("New password and confirm new password not matched!");
        }
        else{
            const resp = await profileCtx.updatePass(newPass);

            if(resp != "New password cannot be your old password"){
                setNewPassBool(false);
                toast.success(resp);
                // router.reload();   
                setNewPass("");
                setConfNewPass(""); 
            } else{
                toast.error(resp);
            }
        }
    }
    return(
        <div >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {/* old pass form */}
            <div className={profileCtx.editPassBool ? "backDrop" : "backDropHide"}>
                <form className={styles.oldPassForm} onSubmit={handleOldPass}>
                    <div className={styles.dialogBoxHeadDiv}>
                        <p1>Verify Identity</p1>
                    </div>

                    
                    <label>Enter old password: </label>
                    <br />

                    <Input.Password value= {oldPass} type="password" onChange={(e) => {setOldPass(e.target.value)}} minLength=""/>

                    <div className={styles.buttonDiv}>
                        <Button type="primary" onClick={handleOldPassCancel} className={styles.cancelButton}>Cancel</Button>
                        <Button type="primary" htmlType="submit" className={styles.verifyButton}>Verify</Button>
                    </div>
                   
                </form>
            </div>

            {/* new pass form */}
            <div className={newPassBool ? "backDrop" : "backDropHide"}>
                <form onSubmit={handlePassUpdate} className={styles.newPassForm}>

                    <div className={styles.dialogBoxHeadDiv}>
                        <p1>Set New Password</p1>
                    </div>

                    <label>Enter new password: </label>
                    <Input.Password value={newPass} type="password" onChange={(e) => {setNewPass(e.target.value)}} minLength=""/>

                    <br />

                    <label>Re-enter new password: </label>
                    <Input.Password value={confNewPass} type="password"  onChange={(e) => {setConfNewPass(e.target.value)}} minLength=""/>

                    <br />
                    <div className={styles.buttonDiv}>
                        <Button type="primary" onClick={handleNewPassCancel} className={styles.cancelButton}>Cancel</Button>
                        <Button type="primary" htmlType="submit" className={styles.verifyButton}>Update</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}