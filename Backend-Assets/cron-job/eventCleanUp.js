import cron from 'node-cron';
import Event from '../models/eventModel.js';
import Community from '../models/communityModel.js';

// Cron job runs every hour to check for events that have passed and delete them
const startCleanUpJob=()=>{
cron.schedule('0 * * * *', async () => {
    try {
        const now = new Date(); // Get the current date and time
        console.log(`[${now.toISOString()}] Running event cleanup job...`);

        // Find events where both startDate and startTime have passed
        const eventsToDelete = await Event.find({ combinedDateTime: { $lte: now } });

        if (eventsToDelete.length > 0) {
            for (let event of eventsToDelete) {
                const community = await Community.findById(event.organizedBy);

                if (community) {
                    // Remove the event from the community's upcomingEvents array
                    community.upcomingEvents = community.upcomingEvents.filter(eventId => !event._id.equals(eventId));
                    await community.save();
                }

                // Delete the event
                await Event.deleteOne({ _id: event._id });
                console.log(`[${now.toISOString()}] Deleted event: ${event.name}`);
            }
        } else {
            console.log(`[${now.toISOString()}] No events to delete.`);
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error deleting expired events:`, error);
    }
});
}
export default startCleanUpJob;