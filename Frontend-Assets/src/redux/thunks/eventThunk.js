import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchYourEvents = createAsyncThunk(
  'events/fetchYourEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/event/getYourEvents', {
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
      return rejectWithValue(error.response?.data || 'Error fetching events');
    }
  }
);

export const fetchAllEvents = createAsyncThunk(
  'events/fetchAllEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/event/getAllEvents', {
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
      return rejectWithValue(error.response?.data || 'Error fetching events');
    }
  }
);

export const fetchScheduledEvents = createAsyncThunk(
  'events/fetchScheduledEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/event/getScheduledEvents', {
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
      return rejectWithValue(error.response?.data || 'Error fetching events');
    }
  }
);
