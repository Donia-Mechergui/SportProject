// import mongoose module
const mongoose = require('mongoose');
// create match schema 
const userSchema = mongoose.Schema({
    // attr:type
    phoneNumber: Number,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: String,
    role: String,
    filePath: String,

});
// affect model name to schema
const user = mongoose.model("User", userSchema);
// make match importable
module.exports = user;