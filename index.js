import express from 'express';
import passport from 'passport';
import session from 'express-session';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import employeeRouter from './src/routes/employee.routes.js';
import { connectUsingMongoose } from './src/middlewares/mongoose.config.js';
import studentRouter from './src/routes/student.routes.js';
import './src/middlewares/passport.config.js';


const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.use('/employee', employeeRouter);
app.use('/student', studentRouter);
app.get('/', (req, res) => {
    res.render('home', {user: null});
});



app.listen(3400, () => {
    console.log('Server running on 3400');
    connectUsingMongoose();
});
