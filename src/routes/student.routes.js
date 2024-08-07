import express from 'express';
import StudentController from '../controllers/student.controller.js';


const studentRouter = express.Router();
const studentController = new StudentController();


studentRouter.get('/register', (req, res) => {
    studentController.getRegisterPage(req, res);
});

studentRouter.post('/register', (req, res) => {
    studentController.studentRegister(req, res);
});


export default studentRouter;