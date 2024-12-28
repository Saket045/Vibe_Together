import mongoose from "mongoose";

const eventSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        required:true
    },
    eventType:{
        type:String,
        enum:['Online','Offline'],
        required:true
    },
    location:{
        type:String,
        required: function(){
            return this.eventType==='Offline'
        }
    },
    date:{
       type:String,
       required:true
    },
    startTime:{
        type:String,
        required:true
    },
    registeredBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    organizedBy:{
           type:mongoose.Schema.Types.ObjectId,
           ref:'Community'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Event=mongoose.model('Event',eventSchema);
export default Event;