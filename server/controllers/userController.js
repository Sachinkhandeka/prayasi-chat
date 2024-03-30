
module.exports.testController = (req , res)=> {
    console.log("MVC working fine!");
    res.json({
        message : "route working fine!",
    });
}