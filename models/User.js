const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new mongoose.Schema({})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)

// username: {
//     type: String,
//     required: true,
//     unique: true
// },
// password: {
//     type: String,
//     required: true
// },



// local strategy - mongoose


//
// Routes 
// signup => POSTing username, password
// iterate over all Users, 
    // find the user with the username == username
    // can't create
    // hash password
    // create User w/ posted information

// login => POSTing username, password
// iterate over all Users, 
    // find the user with the username == username
    // unhash the existing password 
    // compare password with password
    // 'login' the user
    // else fail login