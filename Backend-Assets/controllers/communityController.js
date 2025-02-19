import User from "../models/userModel.js";
import Community from "../models/communityModel.js";
import CommunityMember from "../models/communityMembersModel.js";
import Notification from "../models/notificationModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createCommunity=async(req,res,next)=>{
    try{
        const {name,category,description} = req.body;     
        let {profileImg}=req.body;
        const userId=req.user._id;
        const user=await User.findById(userId);
        if(!user) return res.json({msg:"User not exists"});
        const communityCheck = await Community.findOne({name});
        if(communityCheck) return res.json({msg:"Name already exists"});

        if (profileImg) {
            const uploadAndCompressImage = async (image) => {
                try {
                  const result = await cloudinary.uploader.upload(image, {
                    transformation: [
                      { width: 800, quality: 'auto', fetch_format: 'auto' },
                    ]
                  }); 
                  return result.secure_url;
                } catch (error) {
                  console.error('Error uploading and compressing image:', error);
                }
              };
              
            profileImg=await uploadAndCompressImage(profileImg);
           
		}

        const community = new Community({
            name,
            description,
            category,
            profileImg,
            creator:userId,
        })
        await community.save();

        const adminMember=new CommunityMember({
            community:community._id,
            user:userId,
            role:"Admin",
        })
        await adminMember.save();

        
        await User.findByIdAndUpdate(userId, { $push: { communities: community._id } });

        community.members.push(userId);
        await community.save();

        res.status(200).json({"Community createed succesfully": community});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

export const getAllCommunities =async(req,res)=>{
    try{
        const userId=req.user._id;
        const communities = await Community.find({creator:{$ne:userId}}).populate("creator");
        
        return res.status(200).json(communities);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

export const getCommunitiesBySearch=async(req,res)=>{
    try{
        const communityName = req.query.search;
        const resultCommunities= await Community.find({
            $or:[
                {name:{$regex:'.*'+communityName+'.*',$options:'i'}},
                {category:{$regex:'.*'+communityName+'.*',$options:'i'}},
                {location:{$regex:'.*'+communityName+'.*',$options:'i'}}
            ]
        })

      if(!resultCommunities) return res.json({"Result":"No communities found"});

      return res.status(200).json(resultCommunities);

    }
    catch(error){
        return res.status(500).json(error);
    }
}

export const joinCommunity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { communityName } = req.params;
        console.log(communityName);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User does not exist" });
        }
       

        // Find the community by its name
        const community = await Community.findOne({ name:communityName }); 
        if (!community) {
            return res.status(404).json({ msg: "Community does not exist" });
        }

        // Check if the user is already a member of the community
        const existingMember = await CommunityMember.findOne({
            community: community._id,
            user: userId,
        });

        if (existingMember) {
            return res.status(400).json({ msg: "User is already a member of this community" });
        }

        // Create a new community member record
        const newMember = new CommunityMember({
            community: community._id,
            user: userId,
            role: "Member",
        });

       

        // Update the community's members list
        community.members.push(userId);
        await community.save();

        // Update the user's list of communities
        await User.findByIdAndUpdate(userId, { $push: { communities: community._id } });
        await newMember.save();
        const newNotification=new Notification({
            message:`${user.username} joined the community`,
            type:"UserJoined",
            community:community._id,
            targetUsers:community.members.map(members=>members._id)
        })
        
        await newNotification.save()

        await User.updateMany(
            {_id:{$in:community.members.map(members=>members._id)}},
            {$push:{notifications:newNotification._id}});

        res.status(200).json({ msg: "Joined community successfully", community });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const leaveCommunity = async (req, res) => {
    try {
        // Extract user ID from authenticated request
        const userId = req.user._id;

        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User does not exist" });
        }

        // Extract community name from request parameters
        const { communityName } = req.params;

        // Find the community by its name
        const community = await Community.findOne({ name:communityName });
        if (!community) {
            return res.status(404).json({ msg: "Community does not exist" });
        }

        // Check if the user is a member of the community
        const existingMember = await CommunityMember.findOne({
            community: community._id,
            user: userId,
        });

        if (!existingMember) {
            return res.status(400).json({ msg: "User is not a member of this community" });
        }

        // Remove the community member record
        await CommunityMember.findByIdAndDelete(existingMember._id);

        // Update the community's members list
        community.members.pull(userId);
        await community.save();

        // Update the user's list of communities
        user.communities.pull(community._id);
        await user.save();

const targetUsers=community.members.filter(communityMember=>communityMember._id.toString()!==userId.toString())
                   .map(communityMember=>communityMember._id);

        const newNotification=new Notification({
            message:`${user.username} left the community`,
            type:"UserLeft",
            community:community._id,
            targetUsers:targetUsers
        })
        
        await newNotification.save();

        await User.updateMany(
            {_id:{$in:targetUsers}},
            {$push:{notifications:newNotification._id}});

        res.status(200).json({ msg: "Left community successfully", community });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getCommunityByName=async(req,res)=>{
    const {communityName}=req.params;
    const community=await Community.findOne({communityName});
    if(!community){
        return res.status(404).json({msg:"Community does not exist"});
    }
    res.status(200).json({community});
}

export const getJoinedCommunities = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User does not exist" });
        }

        const communitiesJoined = await Community.find({ members: userId , creator:{$ne:userId}});

    

        if (communitiesJoined.length === 0) {
            return res.status(200).json({ msg: "No communities joined", communitiesJoined: [] });
        }

        return res.status(200).json(communitiesJoined);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getYourCommunities = async (req,res)=>{
    try{
      const userId=req.user._id;
      const yourCommunities=await Community.find({creator:userId});
      if(!yourCommunities)
        return res.json({msg:"You dont have communities"});
    return res.json(yourCommunities);
}
catch(err){
    return res.status(500).json({err:err.message});
}
      
}