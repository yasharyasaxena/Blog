require('dotenv').config()
const cors = require('cors');
const mongoose = require('mongoose')
const express = require('express')
const { dbConnect } = require('./connections/connection')
const { userSchema } = require('./models/user')
const { blogSchema } = require('./models/blog')
const { validPassword, genPassword, genToken, JWTVerify } = require('./utils/utils');

dbConnect(process.env.MONGO_URL)

const Blogs = mongoose.model('Blogs', blogSchema);
const Users = mongoose.model('Users', userSchema);

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
    origin: process.env.FRONTEND_URL,
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
            const blogCount = await Blogs.countDocuments({ 'author.id': user._id });
            await Users.findByIdAndUpdate(user._id, { blogs: blogCount });
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
    .route("/blog/:id")
    .get(async (req, res) => {
        await Blogs.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })
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
    .get(JWTVerify, async (req, res) => {
        const topUserBlogs = await Blogs.find({
            'author.id': req.user.id
        }).sort({ views: -1 }).limit(5)
        return res.status(200).json({
            topUserBlogs: topUserBlogs
        })
    })

app
    .route("/blogs/user")
    .get(JWTVerify, async (req, res) => {
        const userBlogs = await Blogs.find({
            'author.id': req.user.id
        })
        return res.status(200).json({
            userBlogs: userBlogs
        })
    })

app
    .route("/create-blog")
    .post(JWTVerify, async (req, res) => {
        const blog = await Blogs.create({
            ...req.body,
            author: {
                name: req.body.author,
                id: req.user.id
            }
        })
        return res.status(201).json({
            message: 'Blog created successfully',
            blog: blog._id
        })
    })

app
    .route("/profile")
    .get(JWTVerify, async (req, res) => {
        const user = await Users.findById(req.user.id)
        return res.status(200).json({
            name: user.fullName,
            email: user.email,
            blogs: user.blogs
        })
    })

app
    .route("/blog-edit/:id")
    .get(JWTVerify, async (req, res) => {
        const blog = await Blogs.findById(req.params.id)
        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            })
        }
        return res.status(200).json({
            blog: blog
        })
    })
    .post(JWTVerify, async (req, res) => {
        const blog = await Blogs.findById(req.params.id)
        if (blog.author.id.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        await Blogs.findByIdAndUpdate(req.params.id, { $set: req.body })
        return res.status(200).json({
            message: 'Blog updated successfully'
        })
    })

app
    .route("/liked-blogs/:id")
    .get(JWTVerify, async (req, res) => {
        const user = await Users.findById(req.user.id)
        return res.status(200).json({
            likedBlogs: user.likedBlogs
        })
    })
    .post(JWTVerify, async (req, res) => {
        const user = await Users.findById(req.user.id)
        if (!user.likedBlogs.includes(req.params.id)) {
            user.likedBlogs.push(req.params.id)
            await user.save()
            const blog = await Blogs.findById(req.params.id)
            blog.likes = blog.likes + 1
            await blog.save()
            return res.status(200).json({
                message: 'Blog liked successfully'
            })
        }
        else {
            return res.status(409).json({
                message: 'Blog already liked'
            })
        }
    })
    .delete(JWTVerify, async (req, res) => {
        const user = await Users.findById(req.user.id)
        if (user.likedBlogs.includes(req.params.id)) {
            user.likedBlogs = user.likedBlogs.filter(blogId => blogId.toString() !== req.params.id)
            await user.save()
            const blog = await Blogs.findById(req.params.id)
            blog.likes = blog.likes - 1
            await blog.save()
            return res.status(200).json({
                message: 'Blog unliked successfully'
            })
        }
        else {
            return res.status(409).json({
                message: 'Blog not liked yet'
            })
        }
    })

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
