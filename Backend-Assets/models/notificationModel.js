import mongoose from "mongoose";

const notificationSchema=mongoose.Schema({
    message:{
        type:String,
    },
    type: {
        type: String,
        enum: ["UserJoined","UserLeft", "EventCreated", "Register","Unregister","Cancel"], 
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    targetUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
})

const Notification=mongoose.model("Notification",notificationSchema);

export default Notification;