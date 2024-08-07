import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { employeeSchema } from "./employee.schema.js";
import { StudentModel } from "../student model/student.repository.js";


const EmployeeModel = mongoose.model('Employee', employeeSchema);


export default class EmployeeRepository {
    async employeeSignup(name, designation, password) {
        try {
            const newEmployee = new EmployeeModel({
                name: name,
                designation: designation,
                password: password
            });
            await newEmployee.save();
            return "success";
        } catch (error) {
            console.log(error);
            return "fail";
        }
    }

    async employeeLogin(name, password) {
        try {
            const loggedEmployee = await EmployeeModel.findOne({name: name});

            if(!loggedEmployee) {
                return "Wrong employee id";
            }
            const dbPassword = loggedEmployee.password;
            const passwordCheck = await bcrypt.compare(password, dbPassword);
            console.log(passwordCheck);
            if(passwordCheck) {
                return loggedEmployee;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async findById(id) {
        return await EmployeeModel.findById(id);
    }

    async addACompany(studentName, companyName) {
        const student = await StudentModel.findOne({name: studentName});
        if(!student.companiesApplied.includes(companyName)) {
            student.companiesApplied.push(companyName);
            await student.save();
        }

        return "success";
    }

    async companyList() {
        const list = await StudentModel.aggregate([
            {$unwind: "$companiesApplied"},
            {
                $group: {_id: null, uniqueCompanies: {
                        $addToSet: "$companiesApplied"
                    }
                }
            }, 
            {$project: {_id: 0, uniqueCompanies: 1}}
        ]);
        
        return list.length > 0 ? list[0].uniqueCompanies: [];
    }

}