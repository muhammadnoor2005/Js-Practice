const { getStudents, createUser, getAttendance } = require("../models/user");
const bcrypt = require("bcrypt");

exports.getStudents = async () => {
    const users = await getStudents();
    const students = [];

    users.forEach((user) =>{
        students.push({
            fName: user.fName ,
            lName: user.lName,
            email: user.email,
            img:{
                imgURL:user.img.imgURL,
                public_id:user.img.public_id
            },
        }); 
    });
    return students;
};

exports.addStudent = async (fName,lName,email,password,imgURL,imgPID) => {
    try{
        const hashedPass = await bcrypt.hash(password,12);
        return await createUser(fName,lName,email,hashedPass,"Student",imgURL,imgPID);

    } catch(err){
        throw(err);
    };  
};

exports.getAttendance = async (email) => {
    try {
        return await getAttendance(email);
    } catch (err) {
        throw(err);
    };
};