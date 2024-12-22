import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
    name: { type: String,
            required: true,
            unique: true
         },
    description: {
         type: String,
         required:true
         },
    location:{
        type: String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    creator: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User', required: true }, 
    members: [{ 
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'CommunityMember'
         }], 
    createdAt: { type: Date, default: Date.now },
  });
  
  const Community=mongoose.model('Community',communitySchema)
  export default Community;