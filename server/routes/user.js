const express = require("express");
const router = express.Router({ mergeParams : true });
const user = require("../controllers/userController.js");

//test route 
router.get(
    "/" ,
    user.testController,
);

module.exports = router ; 