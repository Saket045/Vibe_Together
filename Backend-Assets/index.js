import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import communityRoute from './routes/communityRoute.js'
import eventRoute from './routes/eventRoute.js'
import connectToMongoDB from './database/connectToMongoDB.js'
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";
import eventCleanUp from './cron-job/eventCleanUp.js'
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app=express();
app.use(cors());
eventCleanUp();
const PORT=process.env.PORT || 5001
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
// Increase limit to 10MB
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/user",userRoute);
app.use("/api/community",communityRoute);
app.use("/api/event",eventRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectToMongoDB();
})