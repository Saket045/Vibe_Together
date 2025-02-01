import express from 'express';
import { allEvents, cancelEvent, createEvent, registerForEvent, scheduledEvents, unregisterFromEvent, yourEvents } from '../controllers/eventController.js';
import {protectRoute} from '../middleware/protectRoute.js'
const router=express.Router();

router.post("/createEvent/:communityName",protectRoute,createEvent);
router.post("/registerForEvent/:communityId/:eventId",protectRoute,registerForEvent);
router.post("/unregisterFromEvent/:communityId/:eventId",protectRoute,unregisterFromEvent);
router.post("/cancelEvent/:communityId/:eventId", protectRoute, cancelEvent);
router.get("/allEvents", protectRoute, allEvents);
router.get("/yourEvents", protectRoute, yourEvents);
router.get("/scheduledEvents", protectRoute, scheduledEvents);

export default router;