import User from "../models/userModel.js";
import Community from "../models/communityModel.js";
import CommunityMember from "../models/communityMembersModel.js";

export const createCommunity=async(req,res,next)=>{
    try{
        const {name,description,location,category} = req.body;
        const userId=req.user._id;
        const user=await User.findById(userId);
        if(!user) return res.json({msg:"User not exists"});
        const communityCheck = await Community.findOne({name});
        if(communityCheck) return res.json({msg:"Name already exists"});
        const community = new Community({
            name,
            description,
            location,
            category,
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

        community.members.push(adminMember._id);
        await community.save();

        res.status(200).json({"Community createed succesfully": community});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

export const getAllCommunities =async(req,res)=>{
    try{
        const communities = await Community.find().populate("members").populate("creator");
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