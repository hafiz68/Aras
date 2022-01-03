const studentServices = require("../services/studentsServices");
const authService = require("../services/authServices");
const mailService = require("../services/mailServices");
const Validation = require("../validation/usersValidations");

const { v4 } = require("uuid");
const uuid = v4;
const bcrypt = require("bcrypt");
const { response } = require("express");
const createStudent =async (req, res) =>{
   const {name, batch} = req.body;
   try{
       console.log(req.body);
       let stud = {
        studentName: name,
        batch: batch
       }
       const students = await studentServices.createStudent(stud);
       if(students.error)res.status(students.error).send(students.error.message);
       return res.status(200).send(students)
   }
   catch(err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const allStudents =async (req, res) =>{
    try{
        const students = await studentServices.getStudents();
        if(students.error)res.status(students.error).send(students.error.message);
        return res.status(200).send(students)
    }
    catch(err) {
     console.error(err);
     res.status(500).send("Something went wrong. Please try again");
   }
 };
 const studentsByid = async (req,res)=>{
    try{
        const {id} = req.params;
        const student = await studentServices.getStudentById(id);
        if(student.error)res.status(student.error).send(student.error.message);
        return res.status(200).send(student)
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
}
const studentsByBatch = async (req,res)=>{
    try{
        const {batch} = req.body;
        const student = await studentServices.getStudentByBatch(batch);
        if(student.error)res.status(student.error).send(student.error.message);
        return res.status(200).send(student)
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
}

module.exports = {
    createStudent,
    allStudents,
    studentsByBatch,
    studentsByid
};
