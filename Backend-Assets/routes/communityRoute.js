import express from 'express';
const router=express.Router();
import { createCommunity,getAllCommunities, getCommunitiesBySearch } from '../controllers/communityController.js';
import { protectRoute } from '../middleware/protectRoute.js';

router.post("/createCommunity", protectRoute ,createCommunity);
router.get("/getAllCommunities", protectRoute ,getAllCommunities);
router.get("/getCommunitiesBySearch", protectRoute ,getCommunitiesBySearch);

export default router;