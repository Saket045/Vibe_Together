import User from "../models/userModel.js";
import Community from "../models/communityModel.js";
import Event from "../models/eventModel.js";
import CommunityMember from "../models/communityMembersModel.js";
import Notification from "../models/notificationModel.js";

export const createEvent=async(req,res)=>{
    try{
        const {name,description,category,eventType,location,date,startTime}=req.body;
       
        const userId=req.user._id;
        const {eventName}=req.params;

        const user=await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const community=await Community.findOne({name:eventName});

        if(!community){
            return res.status(404).json({message:"Community not found"});
        }

        const communityMember=await CommunityMember.findOne({$and:[{community:community._id},{role:"Admin"},{user:userId}]});

        if(!communityMember) return res.status(200).json({msg:"Only admins can create events"});

        if(!name || !description || !category || !eventType || !date || !startTime)
            return res.json({msg:"Fill all fields"});
        if(eventType==='Offline' && !location  )
            return res.json({msg:"Fill location"});

        const event=new Event({
            name,
            description,
            category,
            eventType,
            location,
            date,
            startTime,
            organizedBy:community._id
        })
         await event.save();   

         if(!event){
            return res.status(400).json({message:"Failed to create event"});
         }

         community.upcomingEvents.push(event._id);
         await community.save();

         const newNotification=new Notification({
            message:`${user.username} scheduled this event`,
            type:"EventCreated",
            community:community._id,
            targetUsers:community.members.map(members=>members._id)
        })
        
        await newNotification.save()

        await User.updateMany(
            {_id:{$in:community.members.map(members=>members._id)}},
            {$push:{notifications:newNotification._id}});

         return res.status(200).json(event);
    }
    catch(error){
        res.status(500).json({error:error.message});
        throw new Error(error);
    }
}

export const registerForEvent=async(req,res,next)=>{
    try{
       const userId=req.user._id;
       const communityId=req.params.communityId;
       const user=await User.findById(userId);
       if(!user){
        return res.status(404).json({message:"User not found"});
       }
       const community=await Community.findById(communityId);
       if(!community){
         return res.status(404).json({message:"Community not found"});
         }
       const eventId=req.params.eventId;
       const event=await Event.findById(eventId);
       if(!event) return res.status(404).json({message:"Event not found"});
       if(event.registeredBy.includes(userId)){
        return res.status(200).json({msg:"You are already registered"});
       }
       
       const newNotification=new Notification({
        message:`${user.username} registered for the event`,
        type:"Register",
        community:community._id,
        targetUsers:community.members.map(members=>members._id)
    })
    
    await newNotification.save()

    await User.updateMany(
        {_id:{$in:community.members.map(members=>members._id)}},
        {$push:{notifications:newNotification._id}});
       event.registeredBy.push(userId);
       await event.save();

       return res.status(200).json({msg:"Registered for event"});
    }
    catch(err){
        return res.status(500).json({err:err.message});
    }
}

export const unregisterFromEvent=async(req,res)=>{
    try{
        const userId=req.user._id;
        const user=await User.findById(userId);
        if(!user){
         return res.status(404).json({message:"User not found"});
        }
        const communityId=req.params.communityId;
        const community=await Community.findById(communityId);
        if(!community){
          return res.status(404).json({message:"Community not found"});
          }
        const eventId=req.params.eventId;
        const event=await Event.findById(eventId);
        if(!event) return res.status(404).json({message:"Event not found"});
        if(!event.registeredBy.includes(userId)){
            return res.status(200).json({msg:"You are not registered for this event"});
        }
        event.registeredBy.pull(userId);
        await event.save();
        const newNotification=new Notification({
            message:`${user.username} unregistered for the event`,
            type:"Unregister",
            community:community._id,
            targetUsers:community.members.map(members=>members._id)
        })
        
        await newNotification.save()
    
        await User.updateMany(
            {_id:{$in:community.members.map(members=>members._id)}},
            {$push:{notifications:newNotification._id}});
        return res.status(200).json({msg:"Unregistered from event"});
    }
    catch(err){
        return res.status(500).json({err:err.message});
    }
}

export const cancelEvent=async(req,res)=>{
try {
    const { communityId, eventId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find community
    const community = await Community.findById(communityId);
    if (!community) return res.status(404).json({ message: "Community not found" });

    // Check if user is an admin in the community
    const communityMember = await CommunityMember.findOne({
        community: community._id,
        role: "Admin",
        user: userId,
    });
    if (!communityMember) return res.status(403).json({ message: "Only admins can delete events" });

    // Find and delete the event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (!community.upcomingEvents.includes(eventId))
        return res.status(400).json({ message: "Event does not belong to this community" });

    await Event.findByIdAndDelete(eventId);

    // Use pull to remove eventId from upcomingEvents
    community.upcomingEvents.pull(eventId);
    await community.save();

    const registeredUsers=event.registeredBy;
    const communityMembers=community.members;

    const allUsersToSend = [...new Set([...registeredUsers, ...communityMembers])];


    const newNotification=new Notification({
        message:`${event.name} is cancelled`,
        type:"Cancel",
        community:community._id,
        targetUsers:allUsersToSend.map(members=>members._id)
    })
    
    await newNotification.save()

    await User.updateMany(
        {_id:{$in:allUsersToSend.map(members=>members._id)}},
        {$push:{notifications:newNotification._id}});
       event.registeredBy.push(userId);

    return res.status(200).json({ message: "Event deleted successfully" });
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
}
}

export const yourEvents=async(req,res)=>{
    try{
        const userId = req.user._id;

const yourEvents = await Community.find({ creator: userId });
if (!yourEvents || yourEvents.length === 0) {
  return res.json({ msg: "You don't have Events" });
}
const yourEventIds = yourEvents.flatMap(community => community.upcomingEvents);
console.log(yourEventIds);

if (yourEventIds.length === 0) {
  return res.status(200).json({ msg: "No events" });
}
const events = await Event.find({ _id: { $in: yourEventIds } });

if (!events || events.length === 0) {
  return res.status(404).json({ msg: "No events found" });
}

return res.json(events); 

    }
    catch(err){
        throw err;
    }
}

export const allEvents=async(req,res)=>{
    try{
        const userId=req.user._id;
        const allEvents=await Event.find();
        if(!allEvents)
            return res.json({msg:"No events"});
        const Events=await Community.find({creator:{$ne:userId}});

        const showEvents =await Event.find({organizedBy:[...Events]})
        return res.status(200).json(showEvents);
    }
    catch(err){
        throw err;
    }
}

export const scheduledEvents=async(req,res)=>{
    try{
        const userId=req.user._id;
        const scheduledEvents=await Event.find({registeredBy:userId});
        if(!scheduledEvents){
            return res.status(200).json({msg:"No events"});
        }
        return res.status(200).json(scheduledEvents);
    }
    catch(err){
        throw err;
    }
}

export const getEventsBySearch=async(req,res)=>{
    try{
        const eventName = req.query.search;
        const resultEvents= await Event.find({
            $or:[
                {name:{$regex:'.*'+eventName+'.*',$options:'i'}},
                {category:{$regex:'.*'+eventName+'.*',$options:'i'}},
                {location:{$regex:'.*'+eventName+'.*',$options:'i'}}
            ]
        })

      if(!resultEvents) return res.json({"Result":"No Events found"});

      return res.status(200).json(resultEvents);

    }
    catch(error){
        return res.status(500).json(error);
    }
}