import StudentRepository from "../models/student model/student.repository.js";



export default class StudentController {
    constructor() {
        this.studentRepository = new StudentRepository();
    }

    async studentRegister(req, res) {
        const {name, rollNo, department} = req.body;
        const registration = await this.studentRepository.registerStudent(name ,rollNo, department);
        if(registration) {
            return res.render('studentregistration',  {success: true, user: null});
        }
        res.render('studentregistration',  {success: false, user: null});
    }

    async getRegisterPage(req, res) {
        res.render('studentregistration', {success: false, user: null});
    }

    async searchYourself(req, res) {
        const {rollNo} = req.body;
        const student = await this.searchYourself(rollNo);
        res.render('studentregistration', {student: student, user: null});
    }
}