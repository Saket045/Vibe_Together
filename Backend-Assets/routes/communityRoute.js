import express from 'express';
const router=express.Router();
import { createCommunity,getAllCommunities, getCommunitiesBySearch, getCommunityByName, getJoinedCommunities, getYourCommunities, joinCommunity, leaveCommunity } from '../controllers/communityController.js';
import { protectRoute } from '../middleware/protectRoute.js';

router.post("/createCommunity", protectRoute ,createCommunity);
router.get("/getAllCommunities", protectRoute ,getAllCommunities);
router.get("/getCommunitiesBySearch", protectRoute ,getCommunitiesBySearch);
router.post("/joinCommunity/:communityName", protectRoute ,joinCommunity);
router.post("/leaveCommunity/:name", protectRoute ,leaveCommunity);
router.get("/getCommunityByName/:name", protectRoute ,getCommunityByName);
router.get("/getJoinedCommunities", protectRoute ,getJoinedCommunities);
router.get("/getYourCommunities", protectRoute ,getYourCommunities);

export default router;