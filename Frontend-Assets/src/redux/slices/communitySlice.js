import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllCommunities,
  fetchJoinedCommunities,
  fetchYourCommunities,
} from "../thunks/communityThunk";

const initialState = {
  yourCommunities: { data: [], status: "idle", error: null },
  allCommunities: { data: [], status: "idle", error: null },
  joinedCommunities: { data: [], status: "idle", error: null },
};

const communitiesDataSlice = createSlice({
  name: "communities",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      //yourCommunities
      .addCase(fetchYourCommunities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchYourCommunities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.yourCommunities.data =  [...action.payload];
      })
      .addCase(fetchYourCommunities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //allCommunities
      .addCase(fetchAllCommunities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCommunities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allCommunities.data = [...action.payload];
      })
      .addCase(fetchAllCommunities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //joinedCommunities
      .addCase(fetchJoinedCommunities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJoinedCommunities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.joinedCommunities.data = [...action.payload];
      })
      .addCase(fetchJoinedCommunities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export {fetchAllCommunities,fetchJoinedCommunities,fetchYourCommunities} ;
export default communitiesDataSlice.reducer;
