const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    username :  {
        type : String,
        required : true,
    },
    mobileNumber : {
        type : Number,
        required : true,
    },
    avatar : {
        type  : String,
        default : 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg',
    },
    password : {
        type : String,
        required : true,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User ; 