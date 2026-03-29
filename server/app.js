const express = require('express')
const app=express();
const dotenv=require("dotenv");
const connectDB = require('./src/mdconnection/mongoConnection');
const cors = require('cors');
const userRoute=require('./src/routes/userRoutes');
const courseRoute=require('./src/routes/courseRouter')
const videoUploadRoute=require('./src/routes/vedioUploadRouter')
const cookieParser=require('cookie-parser');
dotenv.config()




app.use(cors({
    origin:"http://localhost:5173" ,
    credentials: true,
   
}));

app.use(express.json());
app.use(cookieParser());




const PORT=process.env.PORT || 5000

// routes
app.use('/api/users', userRoute);
app.use('/api/course',courseRoute);
app.use('/api/video-upload',videoUploadRoute)

// connect to mongodb   
connectDB();
app.listen(PORT,()=>{
    console.log(`the is running on port ${PORT}`)
})