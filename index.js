const express = require("express")
const app = express()
const mongoose = require("mongoose")
const User = require("./models/User.js")
const passport = require("passport")
const cors = require("cors")
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session)
require('./passport.js')

app.use(cors({
    origin: "http://localhost:3000", // This should be changed to our front-end url
    credentials: true
}))

mongoose.connect("mongodb+srv://glen-demo:TId7r1FphLDWMT5X@mern-2020b.awfus.mongodb.net/logins?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log("Connected to the database"))
.catch(() => console.log(`There was an error connecting to db`))


app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(cookieParser('secret'))



app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())


app.get("/", (req, res) => {
    res.send("Hello World")
})


    // 3 Arguments
    // 1: New user object
    // 2: password
    // 3: Callback
app.post("/users/register", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            res.sendStatus(400)
        }
        passport.authenticate('local')(req, res, () => {
            res.send({username: user.username})
        })
        // Session management
        // Send back session, user
        // return res.sendStatus(200)
    })
})

// #authenticate 2 Args
// 1: strategy
// 2: Callback
app.post("/users/login", (req, res, next) => {
    console.log("Trying to login")
    passport.authenticate("local", (err, user) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        if (!user) {
            res.sendStatus(401)
        } else {
            // No error, user found
            // "login"
            req.logIn(user, (error) => {
                if (error) throw error
                res.send({username: user.username})
            })
        }
    })(req, res, next)
})

app.get("/users/me", (req, res) => {
    // find the user
    // send back the user
    console.log("Hitting /me")
    if (req.user) {
        res.send({username: req.user.username})
    } else {
        res.send({username: null})
    }
})

app.listen(5000, () => {
    console.log("Listening")
})