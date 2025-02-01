require('dotenv').config()
const cors = require('cors');
const mongoose = require('mongoose')
const express = require('express')
const { dbConnect } = require('./connections/connection')
const { userSchema } = require('./models/user')
const { blogSchema } = require('./models/blog')

dbConnect(process.env.MONGO_URL)

const Blogs = mongoose.model('Blogs', blogSchema);
const Users = mongoose.model('Users', userSchema);

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

app
    .post("/register", async (req, res) => {
        const fullName = req.body.fullName
        const email = req.body.email
        const password = req.body.password

        // return res.status(200).json({ fullName, email, password })

        const user = await Users.findOne({ email: email })

        if (!user) {
            await Users.create({
                fullName,
                email,
                password
            })
            return res.status(200).json({
                message: 'User created successfully',
            })
        }
        else {
            return res.status(409).json({
                message: 'User already exists',
                user: user
            })
        }
    })
// .get((req, res) => {
//     res.send('Register')
// })


// const sessionStore = MongoStore.create({
//     mongoUrl: process.env.MONGO_URL,
//     collectionName: 'sessions'
// })


// async function passwordVerify(user, password) {
//     if (await user.password == password) {
//         return true;
//     }
//     else {
//         return false;
//     }
// }

// const app = express();
// app.use(express.urlencoded({ extended: false }))
// app.use(session({
//     secret: 'qwerty',
//     resave: false,
//     store: sessionStore,
//     saveUninitialized: true
// }))

// function isAuthenticated(req, res, next) {
//     if (req.session.user) {
//         if (req.session.author) {
//             res.redirect('/quiz_maker');
//         }
//         else res.redirect('/quiz_taker');
//     }
//     else next();
// }

// app
//     .route("/")
//     .get((req, res) => {
//         return res.render('home');
//     })

// app
//     .route("/login")
//     .get(isAuthenticated, (req, res) => {
//         return res.render('login');
//     })
//     .post(async (req, res) => {
//         const body = req.body;
//         const user = await Users.findOne({ email: body.email });
//         if (!user) {
//             return res.redirect('/signup');
//         }
//         else if (!await passwordVerify(user, body.password)) {
//             return res.redirect('/login');
//         }
//         else if (await passwordVerify(user, body.password)) {
//             req.session.user = body.email;
//             if (user.author) {
//                 req.session.author = true;
//                 return res.redirect('/quiz_maker');
//             }
//             else {
//                 req.session.author = false;
//                 return res.redirect('/quiz_taker');
//             }
//         }
//     })

// app
//     .route("/quiz_maker")
//     .get(async (req, res) => {
//         return res.render('quiz_maker', {
//             email: req.session.user,
//             db: Quizes,
//             questions: await Quizes.findOne({ author: req.session.user }) ? Object.values(await Quizes.find({ author: req.session.user }))[0].questions : null,
//         });
//     })
//     .post(async (req, res) => {
//         console.log()
//         let question = await Quizes.findOne({ author: req.session.user }) ? Object.values(await Quizes.find({ author: req.session.user }))[0].questions : []
//         question.push(...[{
//             text: req.body.question,
//             a: req.body.a,
//             b: req.body.b,
//             c: req.body.c,
//             d: req.body.d,
//             correctOption: req.body.correctOption
//         }])
//         if (!await Quizes.findOne({ author: req.session.user })) {
//             await Quizes.create({
//                 author: req.session.user,
//                 quizTitle: req.body.quizTitle,
//                 questions: question
//             })
//         }
//         else {
//             await Quizes.findByIdAndUpdate(Object.values(await Quizes.find({ author: req.session.user }))[0]._id, {
//                 questions: question
//             })
//         }
//         if (req.body.save) {
//             return res.redirect('/quiz_taker')
//         }
//         else return res.redirect('/quiz_maker')
//     })


// app
//     .route("/quiz_taker")
//     .get((req, res) => {
//         return res.render('quiz_taker');
//     })

// app
//     .route("/signup")
//     .get(isAuthenticated, (req, res) => {
//         return res.render('signup');
//     })
//     .post(async (req, res) => {
//         const body = req.body;
//         await Users.create({
//             firstName: body.firstname,
//             lastName: body.lastname,
//             email: body.email,
//             password: body.password
//         });
//         return res.redirect('/login');
//     })

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
