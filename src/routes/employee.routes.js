import express from 'express';
import EmployeeController from '../controllers/employee.controller.js';
import { ensureAuthenticated } from '../middlewares/auth.config.js';
import passport from 'passport';



const employeeRouter = express.Router();
const employeeController = new EmployeeController();

employeeRouter.get('/signup', (req, res) => {
    employeeController.signupPage(req, res);
});

employeeRouter.get('/employee-dashboard', ensureAuthenticated,(req, res) => {
    employeeController.employeeDashboardController(req, res);
});

employeeRouter.get('/login', (req, res) => {
    employeeController.loginpage(req, res);
});

employeeRouter.get('/student-list', ensureAuthenticated, (req, res) => {
    employeeController.studentListPage(req, res);
});

employeeRouter.post('/register', (req, res) => {
    employeeController.signup(req, res);
});

employeeRouter.post('/login', passport.authenticate('local', {
    failureRedirect:'/employee/login'
}),(req, res) => {
    employeeController.login(req, res);
});

employeeRouter.post('/addcompany', ensureAuthenticated, (req, res) => {
    employeeController.addCompany(req, res);
});

employeeRouter.get('/company-list', ensureAuthenticated, (req, res) => {
    employeeController.getCompanyList(req, res);
});

employeeRouter.get('/logout', (req, res) => {
    employeeController.logout(req, res);
})

export default employeeRouter;
