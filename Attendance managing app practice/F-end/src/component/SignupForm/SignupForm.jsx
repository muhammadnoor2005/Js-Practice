import { useRouter } from "next/router";
import axios from "../../axios";
import { useRef, useState } from 'react';
import Cookies from "js-cookie";
import { Button, Input, Radio, Upload } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { HiOutlineCamera } from "react-icons/hi2";

import styles from './SignupForm.module.scss';
import { IoMdArrowBack } from "react-icons/io";


export default function SignupForm({formHeading,addStudentBool,setAddStudentBool,token}){
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [fName,setfName] = useState(null);
    const [lName,setLName] = useState(null);
    const [role,setRole] = useState(null);
    const [loaderBool,setLoaderBool] = useState(false);
    const [radioBool,setRadioBool] = useState(false);

    //img to show while upload
    const [img,setImg] = useState(null);
    //img ref for upload
    const imgUploadRef = useRef(null);
    //img to send on server
    const [imgToUpload,setImgToUpload] = useState();

    const router = useRouter();
    
    const signup = async () => {
        // e.preventDefault();
    
        const data = {
            fName,
            lName,
            email, 
            password, 
            img:imgToUpload,
            role
        };
    
        try{
            setLoaderBool(true);
        const resp = await axios.post("/auth/signup",data,{
            headers:{
            'Content-Type': 'multipart/form-data',
            }
        });
        
        //logging direct on singup
        if(resp.data.token){
            const token = resp.data.token;
            Cookies.set("token",token,{path:"/"});
            
            toast.success("Signup successful");

            router.reload();
        }
        else{
            setLoaderBool(false);
            toast.error(resp.data);
        };

        // alert(resp.data);
        } catch(err){
            toast.error(err);
        }
    }

    //hidden input 
    const handleImageUploadClick = () =>{
        imgUploadRef.current.click();
    }

    //when a file is uploaded thorigh hiddem input
    const handleImageUpload = () =>{
        setImgToUpload(imgUploadRef.current.files[0]);
        //reading uploaded to display it
        const file = imgUploadRef.current.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            setImg(e.target.result);
        }
        reader.readAsDataURL(file)
    }
    const removeImg = () =>{
        setImgToUpload(null);
        setImg(null);
    }

    const handleRadioChange = (e) => {
        setRole(e.target.value);
        setRadioBool(true);
    }

    //when form is used as add student form then this function will run on add student button click
    const addStudent = async  () => {
        const data = {
            fName,
            lName,
            email, 
            password, 
            img:imgToUpload,
        };
        try {
            setLoaderBool(true);
            const resp = await axios.post("/student/addStudent",data,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    token
                }
            });
            if(resp.data === "User created"){
                toast.success(resp.data);
                setAddStudentBool(false);
            }else{
                toast.error(resp.data);
            }
            setLoaderBool(false);
        } catch (err) {
            toast.error(err.message);
            setLoaderBool(false);
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(addStudentBool){
            addStudent();   
        } else{
            signup();
        }
    }
    
    return (
        <>
        <div>
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
            <div className={styles.signupFormDiv}>
                <form onSubmit={onSubmitHandler} className={styles.signupForm}>

                { //add student form with back button
                addStudentBool? 
                    <div className={styles.addStudentHeading}>
                         <IoMdArrowBack onClick={() => {setAddStudentBool(false)}}/>
                        <p1>Add Student</p1>
                    </div>

                    : <div className={styles.singupHeading}>
                        <p1>Signup</p1>
                    </div>
                }

                    <div>
                        <label>First Name:</label>
                        <Input type="text" onChange={(e) => {setfName(e.target.value)}} minLength="3"/>
                
                        <label>Last Name:</label>
                        <Input type="text" onChange={(e) => {setLName(e.target.value)}} minLength="3"/>
                
                        <label>Email:</label>
                        <Input type="text" onChange={(e) => {setEmail(e.target.value)}} minLength="3"/>
                
                        <label>Password:</label>
                        <Input.Password type="password" onChange={(e) => {setPassword(e.target.value)}} minLength=""/>


                        {/*  if form is used as add student form then hide this radio button */
                         !addStudentBool &&
                         <div >
                            <label>Role:</label>
                            <Radio.Group onChange={handleRadioChange} style={{display:"flex"}}>
                                <Radio value="Student" > Student </Radio>
                                <Radio value="Teacher"> Teacher </Radio>
                            </Radio.Group>
                         </div>
                        }
                    </div>

                    {/* image upload and show div */
                    img?
                        // showing uploaded img preview
                        <div className={styles.uploadedImgPreviewDiv}>
                            <img src={img} alt="profileIMG" className={styles.uploadedImg}/>
                            <span className={styles.removeImgSpan} onClick={removeImg}>Remove image</span>
                        </div>
                        :// :before uploading image
                        <div className={styles.uploadImgDiv} onClick={handleImageUploadClick}>
                            <input type="file" ref={imgUploadRef} hidden onChange={handleImageUpload} accept="image/*"/>
                            <HiOutlineCamera style={{color:"white"}}/>
                            <span className={styles.uploadImgSpan}>Upload profile picture</span>
                        </div>
                    }

                    <br />

                    <div className={styles.singupButtonDiv}>
                        {addStudentBool? <Button type="primary" htmlType="submit">Add Student</Button>

                        :  <Button type="primary" htmlType="submit" disabled={!radioBool}>Signup</Button>}
                        <br />

                        {/* if form is used as edit form then login link will be hidden */
                        !addStudentBool &&
                        <div >
                            <span >Already have an account? </span>
                            <span className={styles.loginLinkSpan} onClick={() => {router.push("/auth/login")}}>Login</span>
                        </div>
                        }
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}