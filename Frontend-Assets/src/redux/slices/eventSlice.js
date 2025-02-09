import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllEvents,
  fetchScheduledEvents,
  fetchYourEvents,
} from "../thunks/eventThunk.js";

const initialState = {
  yourEvents: { data: [], status: "idle", error: null },
  allEvents: { data: [], status: "idle", error: null },
  scheduledEvents: { data: [], status: "idle", error: null },
};

const eventsDataSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //yourEvents
      .addCase(fetchYourEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchYourEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.yourEvents.data =  [...action.payload];
      })
      .addCase(fetchYourEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //allEvents
      .addCase(fetchAllEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allEvents.data = [...action.payload];
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //joinedEvents
      .addCase(fetchScheduledEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchScheduledEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.scheduledEvents.data = [...action.payload];
      })
      .addCase(fetchScheduledEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export {fetchAllEvents,fetchScheduledEvents,fetchYourEvents} ;
export default eventsDataSlice.reducer;
