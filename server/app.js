const express = require('express')
const app=express();
const dotenv=require("dotenv");
const connectDB = require('./src/mdconnection/mongoConnection');
const cors = require('cors');
const videoUploadRoute=require('./src/routes/vedioUploadRouter')
const rateLimiter=require('./src/RateLimiting/RateLimiting');
const cookieParser=require('cookie-parser');
dotenv.config()


// routes import
const userRoute=require('./src/routes/userRoutes');
const courseRoute=require('./src/routes/courseRouter')
const lectureRoute=require('./src/routes/lectureRouter')
const paymentRoute=require('./src/routes/paymentRouter')


// cors configuration
app.use(cors({
    origin:"http://localhost:5173" ,
    credentials: true,
   
}));

app.use(express.json());
app.use(cookieParser());


// Apply rate limiting middleware to all routes
app.use(rateLimiter);




const PORT=process.env.PORT || 5000

// routes 
app.use('/api/users', userRoute);
app.use('/api/course',courseRoute);
app.use('/api/lecture',lectureRoute);
app.use('/api/payment',paymentRoute);
app.use('/api/video-upload',videoUploadRoute)

// connect to mongodb   
connectDB();
app.listen(PORT,()=>{
    console.log(`the is running on port ${PORT}`)
})