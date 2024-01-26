import { Button, Popconfirm, message } from "antd";
import { useContext, useRef, useState } from "react";

import { HiCamera } from "react-icons/hi2";
import { IoMdArrowBack } from "react-icons/io";

import styles from "./Info.module.scss";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ProfileManageContext from "@/context/ProfileManageContext";

export default function({profileHead}){
    const profileCtx = useContext(ProfileManageContext)

    const router = useRouter();
    const imgRef = useRef();
    
    const {fName,lName,img} = profileCtx.data;
    const fullName = fName + " " + lName;
    

    //back button show or hide that appears only when teacher clicks on edit student
    const backButtonBool = profileHead !== "Profile";
    
    //called when the file is uploaded
    const handleFileChange = () => {
        const img = imgRef.current.files[0];
        profileCtx.editImg(img);
    };

    //called when edit button is clicked and opens the choose file menu
    const handleUploadClick = () =>{
        imgRef.current.click();
    }

    const confirmDelete = async () => {
        const resp = await profileCtx.deleteAcc();
        if (resp === true){
            message.success("Account deleted successfully");
        } else{
            message.error("Error while deleting account");
        }
        //if teacher is deleting a student
        if(profileCtx.data.role){
            Cookies.remove("token");
        }
        router.reload();
        
    };
     
    return(
        <div className={styles.mainDiv}>
            
            <div className={backButtonBool ? styles.profileHeadingWBackButton:styles.profileHeading}>
                {backButtonBool && <IoMdArrowBack onClick={() => {profileCtx.setEditStudentBool(false)}}/>}
                <p1>{profileHead}</p1>
                
            </div>

            <br />

            <div className={styles.imgDiv}>
                <img src={img.imgURL} alt="userIMG"
                    style={{
                        maxWidth:"100px"
                    }} ref={imgRef}/>
                <HiCamera  className={styles.imageEditIcon} onClick={handleUploadClick}/>
                

                <input type="file" accept="image/*" ref={imgRef} onChange={handleFileChange} hidden/>
            </div>

           
            <span className={styles.fullName}>{fullName}</span>
             <br />

            <div className={styles.buttonsDiv}>
                <Button className={styles.changeNameButton} type="primary" onClick={() =>{profileCtx.setNameBool(true)}}>Change Name</Button>
                
                <br />
                <Button className={styles.changePassButton} type="primary" onClick={() =>{profileCtx.setPassBool(true)}}>Change Password</Button>
                {/* acc del */}

                <br />
                
                <Popconfirm
                    title="Delete this Account"
                    description="Are you sure to delete this account?"
                    onConfirm={confirmDelete}
                    // onCancel={cancelDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete Account</Button>
                </Popconfirm>
                
                
            </div>

        </div>
    );
}