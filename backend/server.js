require('dotenv').config()
const cors = require('cors');
const mongoose = require('mongoose')
const express = require('express')
const { dbConnect } = require('./connections/connection')
const { userSchema } = require('./models/user')
const { blogSchema } = require('./models/blog')
const { validPassword, genPassword } = require('./utils/utils');
const { genToken } = require('./utils/utils');

dbConnect(process.env.MONGO_URL)

const Blogs = mongoose.model('Blogs', blogSchema);
const Users = mongoose.model('Users', userSchema);

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
    origin: 'http://localhost:5175',
};
app.use(cors(corsOptions));

app
    .post("/register", async (req, res) => {
        const fullName = req.body.fullName
        const email = req.body.email
        const password = req.body.password
        const user = await Users.findOne({ email: email })

        if (!user) {
            await Users.create({
                fullName,
                email,
                ...genPassword(password)
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

app
    .route("/login")
    .post(async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        const user = await Users.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        else if (!validPassword(password, user.hash, user.salt)) {
            return res.status(401).json({
                message: 'Incorrect password'
            })
        }
        else if (validPassword(password, user.hash, user.salt)) {
            return res.status(200).json({
                message: 'Login successful',
                token: genToken({ id: user._id }, process.env.SECRET_KEY),
                name: user.fullName,
            })
        }
    })

app
    .route("/blogs")
    .get(async (req, res) => {
        const blogs = await Blogs.find()
        return res.status(200).json({
            blogs: blogs
        })
    })

app
    .route("/blogs/:id")
    .get(async (req, res) => {
        const blog = await Blogs.findById(req.params.id)
        return res.status(200).json({
            blog: blog
        })
    })

app
    .route("/home")
    .get(async (req, res) => {
        const topBlogs = await Blogs.find().sort({ views: -1 }).limit(5)
        return res.status(200).json({
            topBlogs: topBlogs
        })
    })

app
    .route("/dashboard")
    .get(async (req, res) => {
        const authorization = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY)
        const topUserBlogs = await Blogs.findById(decoded.id).sort({ views: -1 }).limit(5)
        return res.status(200).json({
            topUserBlogs: topUserBlogs
        })
    })

app
    .route("/blogs/user")
    .get(async (req, res) => {
        const authorization = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY)
        const userBlogs = await Blogs.findById(decoded.id)
        return res.status(200).json({
            userBlogs: userBlogs
        })
    })

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
