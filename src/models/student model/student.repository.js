import mongoose from "mongoose";
import { studentSchema } from "./student.schema.js";




export const StudentModel = mongoose.model('Student', studentSchema);

export default class StudentRepository{
    async registerStudent(name, rollNo, department) {
        const newStudent = new StudentModel({
            name: name,
            rollNo: rollNo,
            department: department
        });
        await newStudent.save();
        return newStudent;
    }

    async searchStudent(rollNo) {
        return await StudentModel.findOne({rollNo: rollNo});
    }

    async getAllStudent() {
        return await StudentModel.find();
        // console.log(studentList);
        // return studentList;
    }
}