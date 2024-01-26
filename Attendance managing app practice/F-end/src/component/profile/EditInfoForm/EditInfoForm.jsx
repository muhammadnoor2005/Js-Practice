import { Button, Input } from "antd";
import { useContext, useRef, useState } from "react";
import styles from "./EditInfoForm.module.scss";
import styles2 from "../EditPass/EditPass.module.scss";
import ProfileManageContext from "@/context/ProfileManageContext";

export default function(){
    const profileCtx = useContext(ProfileManageContext);
    const {fName,lName} = profileCtx.data;

    const [newFName,setfName] = useState(fName);
    const [newLName,setLName] = useState(lName);


    //on from submit
    const onEdit = (e) => {
        e.preventDefault();
        profileCtx.setNameBool(false)
        profileCtx.editedInfo(newFName,newLName);
    }

    const handleLastNameChange = (e) =>{
        setLName(e.target.value);
    }

    const handleFirstNameChange = (e) =>{
        setfName(e.target.value);
    }

    //hides edit name box and set fields value to default
    const handleCancel = () => {
        profileCtx.setNameBool(false);
        setfName(fName);
        setLName(lName);
    }

    // call on focus of edit first name field and clears the field
    const clearDefFName = () =>{
        if(fName === newFName){
            setfName("");
        }
    }
    //called on blur of edit first name field and set def name if field is left empty
    const setDefFName = () => {
        if(newFName === ""){
            setfName(fName);
        }
    }

    // call on focus of edit last name field and clears the field
    const clearDefLName = () =>{
        if(lName === newLName){
            setLName("");
        }
    }
    //called on blur of edit last name field and set def name if field is left empty
    const setDefLName = () => {
        if(newLName === ""){
            setLName(fName);
        }
    }

    return(
        <div>
            <div className={profileCtx.editNameBool ? "backDrop" : "backDropHide" }>
                <form className={styles.editInfoForm} onSubmit={onEdit}>

                    <div className={styles2.dialogBoxHeadDiv}>
                        <p1>Change Name</p1>
                    </div>

                    <label>First Name:</label>
                    <Input value={newFName} type="text" onFocus={clearDefFName} onBlur={setDefFName} onChange={handleFirstNameChange} minLength="3"/>
            
                    <br />

                    <label>Last Name:</label>
                    <Input value={newLName} type="text" onFocus={clearDefLName} onBlur={setDefLName} onChange={handleLastNameChange} minLength="3"/>
            
                    <br />

                    {/* <input type='file' accept="image/*" onChange={(e) => {setImg(e.target.files[0])}}/> */}
                    <div className={styles2.buttonDiv}>
                        <Button className={styles2.cancelButton} type="primary" onClick={handleCancel}>Cancel</Button>
                        <Button  className={styles2.verifyButton} type="primary" htmlType="submit">Edit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}