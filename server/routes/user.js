const express = require("express");
const router = express.Router({ mergeParams : true });
const user = require("../controllers/userController.js");
const { wrapAsync }  = require("../utils/wrapAsync.js");

// //test route 
// router.get(
//     "/" ,
//     user.testController,
// );

//signup route
router.post(
    "/signup",
    wrapAsync(user.signupController),
);

//login route
router.post(
    "/login",
    wrapAsync(user.loginController),
);

module.exports = router ; 