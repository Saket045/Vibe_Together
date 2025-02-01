// Thunks for multiple APIs
import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk for fetching "Communities data"
export const fetchYourCommunities = createAsyncThunk(
  'communities/fetchYourCommunities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/community/getYourCommunities', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate', 
          'Pragma': 'no-cache', 
          'Expires': '0'
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching communities');
    }
  }
);

export const fetchAllCommunities = createAsyncThunk(
  'communities/fetchAllCommunities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/community/getAllCommunities', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate', 
          'Pragma': 'no-cache', 
          'Expires': '0'
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching communities');
    }
  }
);

export const fetchJoinedCommunities = createAsyncThunk(
  'communities/fetchJoinedCommunties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/community/getJoinedCommunities', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate', 
          'Pragma': 'no-cache', 
          'Expires': '0'
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching communities');
    }
  }
);
