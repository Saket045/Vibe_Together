import express from 'express';
import { cancelEvent, createEvent, registerForEvent, unregisterFromEvent } from '../controllers/eventController.js';
import {protectRoute} from '../middleware/protectRoute.js'
const router=express.Router();

router.post("/createEvent/:communityName",protectRoute,createEvent);
router.post("/registerForEvent/:communityId/:eventId",protectRoute,registerForEvent);
router.post("/unregisterFromEvent/:communityId/:eventId",protectRoute,unregisterFromEvent);
router.post("/cancelEvent/:communityId/:eventId", protectRoute, cancelEvent);

export default router;