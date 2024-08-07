import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import EmployeeRepository from "../models/employee model/employee.repository.js";


const employeeRepository = new EmployeeRepository();

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
}, async(name, password, done) => {
    const authLoginUser = await employeeRepository.employeeLogin(name, password);
    console.log(authLoginUser);
    if(!authLoginUser) {
        return done(null, false, {
            message: 'Invalid Credentials'
        });
    }
    return done(null, authLoginUser);
}));

passport.serializeUser((user, done) => {
    console.log('Serializing user: ', user);
    done(null, user._id);
});


passport.deserializeUser(async(id, done) => {
    const user = await employeeRepository.findById(id);
    if(!user) {
        return done(new Error('User not found'));
    }
    done(null, user);
});

export default passport;