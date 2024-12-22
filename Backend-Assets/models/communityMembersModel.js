import mongoose from "mongoose";

const communityMemberSchema = new mongoose.Schema({
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['Member', 'Admin'], default: 'Member' }, // Role in the community
  joinedAt: { type: Date, default: Date.now },
});

const CommunityMember = mongoose.model('CommunityMember', communityMemberSchema);

export default CommunityMember;
