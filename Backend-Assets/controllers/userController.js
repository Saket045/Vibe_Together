import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import admin from 'firebase-admin'
import generateUsername from "../utils/generator.js";
// Firebase SDK setup
import serviceAccount from '../config/serviceAccountKey.json' assert { type: 'json' };
import firebaseConfig from '../config/firebaseConfig.json' assert {type: 'json'};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: firebaseConfig.databaseURL,
  });

export const signup= async(req,res) =>{
    const { fullname,username,email,password,phonenumber}=req.body;
    try{
     const existingUser = await User.findOne({username})
     if(existingUser) return res.status(400).json({message:"Username is taken"})
 
     const existingEmail = await User.findOne({email})
     if(existingEmail) return res.status(400).json({message:"Email already registered"})

         const salt=await bcrypt.genSalt(10);
         const hashedPassword=await bcrypt.hash(password,salt);
 
     const newUser =new User({
         fullname,
         username,
         email,
         password:hashedPassword,
         phonenumber
     })
     if(newUser){
         generateTokenAndSetCookie(newUser._id,res);
         await newUser.save();
 
         res.status(201).json({
             _id:newUser._id,
             fullname:newUser.fullname,
             username:newUser.username,
             email:newUser.email,
             phonenumber:newUser.phonenumber
         })
     }
   else{
        res.status(400).json({message:"Invalid user data"})
   }
     }
    catch(error){
     return res.status(500).json({message:error.message})
    }
 }
 //1 get the fields from the req object i.e. incoming request
 //2 check if the account exists by checking username and email....(User.findOne({field to be compared in model}))
 //3 generate salt through bcrypt
 //4 hash the password
 //5 create new user with the fields you got
 //6 if newUser created ,generate token for every unique user i.e. according to newUser._id 
 //7 now save the user
 export const login= async(req,res) =>{
     try{
         const { email, password } = req.body;
         const user = await User.findOne({ email });
         const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
 
         if (!user || !isPasswordCorrect) {
             return res.status(400).json({ error: "Invalid username or password" });
         }
         generateTokenAndSetCookie(user._id, res);
 
         res.status(200).json({
             _id: user._id,
             fullName: user.fullName,
             username: user.username,
             email: user.email,
             phonenumber: user.phonenumber
         });
     }
     catch(error){
         return res.status(500).json({message:error.message})
        }
 }

 //Sign-Up
 export const googleApiCallback = async (req, res, next) => {
  const { idToken } = req.body;

  try {
    // Verify the ID token and extract user details
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, picture } = decodedToken;

    // Hardcoded values for demonstration (replace with actual request body values if needed)
    const fullname = "Saket"; // Replace with `req.body.fullname` if passed from frontend
    const phonenumber = "7880974597"; // Replace with `req.body.phonenumber` if passed from frontend
    const username = "Saket"; // Replace with a generated username if needed

    // Generate a random password
    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

    // Create a new User instance
    const newUser = new User({
      fullname,
      username,
      email,
      phonenumber,
      password: generatedPassword,
      profileImg: picture,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a token and set it in the response cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Respond with user details
    res.json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      phonenumber: newUser.phonenumber,
    });
  } catch (err) {
    // Handle errors
    next(err);
  }
};

//Sign-In
 export const googleApi=async(req,res)=>{
    const {idToken}=req.body;
    try{
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const {username,email,picture}=decodedToken;

  const user=await User.findOne({email});
  if(!user){
    return res.status(401).json({message:"User not found"})
  }
  generateTokenAndSetCookie(user._id,res);

  res.json({success:true,message:"Google Sign in successful"});
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
 }

 export const logout= async(req,res) =>{
     try {
         res.cookie("jwt", "", { maxAge: 0 });
         res.status(200).json({ message: "Logged out successfully" });
     } catch (error) {
         console.log("Error in logout controller", error.message);
         res.status(500).json({ error: "Internal Server Error" });
     }
 }
 //1 set the cookie named jwt to maxAge 0 and logout happens
 
 export const getMe = async (req, res) => {
     try {
         const user = await User.findById(req.user._id).select("-password");
         res.status(200).json(user);
     } catch (error) {
         console.log("Error in getme controller", error.message);
         res.status(500).json({ error: "Internal Server Error" });
     }
 };