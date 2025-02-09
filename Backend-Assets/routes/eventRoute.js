import express from 'express';
import { allEvents, cancelEvent, createEvent, getEventsBySearch, registerForEvent, scheduledEvents, unregisterFromEvent, yourEvents } from '../controllers/eventController.js';
import {protectRoute} from '../middleware/protectRoute.js'
const router=express.Router();

router.post("/createEvent/:communityName",protectRoute,createEvent);
router.post("/registerForEvent/:communityId/:eventId",protectRoute,registerForEvent);
router.post("/unRegisterFromEvent/:communityId/:eventId",protectRoute,unregisterFromEvent);
router.post("/cancelEvent/:communityId/:eventId", protectRoute, cancelEvent);
router.get("/getAllEvents", protectRoute, allEvents);
router.get("/getYourEvents", protectRoute, yourEvents);
router.get("/getScheduledEvents", protectRoute, scheduledEvents);
router.get("/getEventsBySearch", protectRoute, getEventsBySearch);

export default router;