import EmployeeRepository from "../models/employee model/employee.repository.js";
import bcrypt from 'bcrypt';
import StudentRepository from "../models/student model/student.repository.js";


export default class EmployeeController {
    constructor() {
        this.employeeRepository = new EmployeeRepository();
        this.studentRepository = new StudentRepository();
    }

    async signupPage(req, res) {
        return res.render('signup', {user: null});
    }
    async signup(req, res) {
        const {name, designation, password} = req.body;
        console.log(name);
        const hashedPassword = await bcrypt.hash(password, 12);
        const msg = await this.employeeRepository.employeeSignup(name, designation, hashedPassword);
        if(msg=='success') {
            return res.render('login', {user: null});
        } else {
            return res.render('failed', {failed: msg});
        }
    }

    async loginpage(req, res) {
        return res.render('login',{user: null});
    }

    async login(req, res) {
        console.log('login controller');
        const {name, password} = req.body;
        console.log('login controller'+ name+ password);
        const loggedUser = await this.employeeRepository.employeeLogin(name, password);
        console.log(loggedUser);
        if(!loggedUser) {
            
            return res.redirect('/employee/login');
        }
        res.redirect('/employee/employee-dashboard'); 
    }

    async employeeDashboardController(req, res) {
        res.render('employee-dash', {user: req.user});
    }

    async studentListPage(req, res) {
        const students = await this.studentRepository.getAllStudent();
        console.log("Student list page  "+ students);
        console.log("Type of students:", Array.isArray(students));
        res.render('student-list', {students: students, user: req.user});
    }

    async addCompany(req, res) {
        const {studentName, companyName} = req.body;
        await this.employeeRepository.addACompany(studentName, companyName);
        const students = await this.studentRepository.getAllStudent();
        return students;
    }

    async getCompanyList(req, res) {
        const listOfCompanies = await this.employeeRepository.companyList();
        console.log(listOfCompanies);
        res.render('company-list', {companies: listOfCompanies, user: req.user});
    }

    async logout(req, res) {
        req.logout((err) => {
            res.redirect('/');
        })
    }
}