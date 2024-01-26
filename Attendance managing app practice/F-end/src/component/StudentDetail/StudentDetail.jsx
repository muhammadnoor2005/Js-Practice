import { Button } from "antd";
import styles from "./StudentDetail.module.scss";
import Profile from "../profile/Profile";
import { useState } from "react";
import SignupForm from "../SignupForm/SignupForm";
import { useRouter } from "next/router";


export default function({students,token}){
    const [studentToUpdate,setStudentToUpdate] = useState();
    const [editStudentBool,setEditStudentBool] = useState(false);
    const [addStudentBool, setAddStudentBool] = useState(false);

    const router = useRouter();

    const handleEditStudent = (student) => {
        setStudentToUpdate(student);
        setEditStudentBool(true);
    }

    const studentsData = students.map((student) => {
        return(
            <div className={styles.studentDiv} key={student.email}>
                <div className={styles.studentNameAndEdit}>
                    <span>{student.fName + " " + student.lName}</span>
                    <Button type="primary" onClick={() => {handleEditStudent(student)}}>Edit student</Button>
                    <br />
                    <Button type="primary" onClick={() => {router.push(`/studentDetails/${student.email}`)}}>View Attendance</Button>
                    
                </div>
                <img src={student.img.imgURL} alt="student" style={{
                maxWidth:"50px"
            }}/>
            </div>
        );
    });

    return(
        <div>
            <div className={styles.studentPageHeader}>
                <span>Students</span>
                <Button type="primary" onClick={() => {setAddStudentBool(true)}}>Add student</Button>
            </div>

            {/* signup form is utilized as add student form */}
            <div className={addStudentBool? "backDrop":"backDropHide"}>
                <SignupForm formHeading={"Add Student"} setAddStudentBool={setAddStudentBool} addStudentBool={addStudentBool} token={token}/>
            </div>

            <div className={editStudentBool ? "backDrop":"backDropHide"}>
                {studentToUpdate ? <Profile data={studentToUpdate} token={token} profileHead={"Edit Student"} setEditStudentBool={setEditStudentBool}/>:<></>}
            </div>
                
            <div className={styles.studentCollectionDiv}>
                {studentsData}
            </div>
        </div>
    )
}