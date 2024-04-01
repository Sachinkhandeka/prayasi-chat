const User = require("../models/userModel");
const ExpressError = require("../utils/ExpressError");
const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat");

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const app_id = process.env.APP_ID;

//test route
// module.exports.testController = (req , res)=> {
//     console.log("MVC working fine!");
//     res.json({
//         message : "route working fine!",
//     });
// }

//signup route handler
module.exports.signupController = async(req ,res)=> {
    const user  = req.body.user ; 
   
    if(!user.fullName || !user.username || !user.mobileNumber || !user.password) {
        throw new ExpressError(404 , "Please provide all the details");
    }
    const  serverClient = connect(api_key , api_secret , app_id);

    const hashedPass = await bcrypt.hash(user.password , 10);
    
    let newUser  =  new User({
        fullName : user.fullName,
        username : user.username,
        mobileNumber : user.mobileNumber,
        password : hashedPass,
    });
    newUser = await newUser.save();
    const userId =  newUser._id.toString() ; 

    const token = serverClient.createUserToken(userId);
    const { password: hashedPassword  , ...rest } = newUser._doc ; 

    res.status(200).json({
        user : {...rest, _id : userId },
        token : token,
    });
}

//login route handler
module.exports.loginController = async(req ,res)=> {
    const data = req.body.user ; 

    const serverClient = connect(api_key, api_secret, app_id);

    const user = await User.findOne({ username : data.username });

    if(!user) {
        throw new ExpressError(500 , "User Not Found");
    }

    const success = await bcrypt.compare(data.password, user.password);

    if(!success) {
        throw new  ExpressError(400 , "Invalid Password");
    }

    const token = serverClient.createUserToken(user._id.toString());
    res.status(200).json({
        token : token,
        user : user,
    });

}