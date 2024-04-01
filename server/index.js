if( process.env.NODE_ENV !== "production" ) {
    require("dotenv").config();
}
const express = require("express");
const port = process.env.PORT || 8080; 
const app = express();
const cors = require("cors");
const userRouter = require("./routes/user");
const  mongoose  = require("mongoose");
const DB_URL = process.env.MONGO_URL ;

//some helpfull middlewares 
app.use(express.json()); //for json pauload data from client to server
app.use(cors());  //for cross origin req

main().then(()=> {
    console.log("Connection to mongoDB successfull!");
}).catch((err)=> {
    console.log(err.message);
});

async function main() {
    await mongoose.connect(DB_URL);
}

// Mounting the userRouter onto the "/test" route
// app.use("/test", userRouter);
app.use("/api/user", userRouter );


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