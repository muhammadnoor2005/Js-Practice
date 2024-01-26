const express = require("express");
const { getUser, checkIn, checkOut } = require("../controllers/profileInfo");
const { getStudents, addStudent, getAttendance } = require("../controllers/students");
const {storage} = require("../cloudinary");
const multer = require("multer");
const parser = multer({storage});

const router = express.Router();

//sends role
router.get("/",async(req,res) => {
    try {
        const resp = await getUser(req.user);
        const { role } = resp;

        if (role === "Teacher"){
            res.status(200).send("Teacher");
        } else{
            res.status(200).send("Student");
        }
    } catch (err) {
        res.send(err.message);
    }            
})

//shows teacher the list of all student
router.get("/allStudents", async(req,res) => {
    try {
        const resp = await getStudents();
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    };
});

//when a teacher adds a student
router.post("/addStudent",parser.single("img"),async(req,res) => {
    try {
        console.log(req.body);
        let resp;

        if(req.file){
            resp = await addStudent(req.body.fName,req.body.lName,req.body.email,req.body.password,req.file.path,req.file.filename);
        } else{
            const defaultUrl = process.env.DEFAULT_IMG_URL;
            // const defImgPublicID = "my-folder/userImg_uyy5m9.jpg";
            resp = await addStudent(req.body.fName,req.body.lName,req.body.email,req.body.password,defaultUrl,"");
        }
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

//student checkin
router.post("/checkin",async(req,res) => {
    try {
        const resp = await checkIn(req.user,req.body.checkInTime);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
   

})

router.post("/checkout",async(req,res) => {
    try {
        const resp = await checkOut(req.user,req.body.checkOutTime);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

//sends a single student's attendance record
router.post("/attendance", async(req,res) => {
    try {
        const resp = await getAttendance(req.body.email);
        console.log(resp);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
})

module.exports = router;