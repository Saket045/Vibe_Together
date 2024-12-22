import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import communityRoute from './routes/communityRoute.js'
import connectToMongoDB from './database/connectToMongoDB.js'
dotenv.config()
const app=express();
app.use(cors());

const PORT=process.env.PORT || 5001
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/user",userRoute);
app.use("/api/community",communityRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectToMongoDB();
})