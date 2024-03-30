if( process.env.NODE_ENV !== "production" ) {
    require("dotenv").config();
}
const express = require("express");
const port = 8080 || process.env.PORT ; 
const app = express();
const cors = require("cors");
const userRouter = require("./routes/user");
const  mongoose  = require("mongoose");
const DB_URL = process.env.MONGO_URL ;

main().then(()=> {
    console.log("Connection to mongoDB successfull!");
}).catch((err)=> {
    console.log(err.message);
});

async function main() {
    await mongoose.connect(DB_URL);
}

//some helpfull middlewares 
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended : true }));


// Mounting the userRouter onto the "/test" route
app.use("/test", userRouter);


//middleware for error handling
app.use((err ,req ,res ,next)=> {
    let { status = 500 , message = "Internal Server Error" } = err ; 

    res.status(status).json({
        success : false,
        statusCode : status,
        message : message,
    });
});

app.listen(port , ()=> {
    console.log(`port is running on port number ${port}`);
});