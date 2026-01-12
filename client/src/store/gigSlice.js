import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchGigs = createAsyncThunk(
  'gigs/fetchGigs',
  async (search = '', { rejectWithValue }) => {
    try {
      const response = await api.get(`/gigs${search ? `?search=${search}` : ''}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch gigs');
    }
  }
);

export const fetchGig = createAsyncThunk(
  'gigs/fetchGig',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/gigs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch gig');
    }
  }
);

export const createGig = createAsyncThunk(
  'gigs/createGig',
  async (gigData, { rejectWithValue }) => {
    try {
      const response = await api.post('/gigs', gigData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create gig');
    }
  }
);

export const fetchMyGigs = createAsyncThunk(
  'gigs/fetchMyGigs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/gigs/my-gigs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your gigs');
    }
  }
);

export const fetchMyBids = createAsyncThunk(
  'gigs/fetchMyBids',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/gigs/my-bids');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your bids');
    }
  }
);

const initialState = {
  gigs: [],
  currentGig: null,
  myGigs: [],
  myBids: [],
  isLoading: false,
  error: null
};

const gigSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {
    clearCurrentGig: (state) => {
      state.currentGig = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateGigInList: (state, action) => {
      const updatedGig = action.payload;
      const index = state.gigs.findIndex(g => g._id === updatedGig._id);
      if (index !== -1) {
        state.gigs[index] = updatedGig;
      }
      if (state.currentGig?._id === updatedGig._id) {
        state.currentGig = updatedGig;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all gigs
      .addCase(fetchGigs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gigs = action.payload.gigs;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch single gig
      .addCase(fetchGig.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentGig = action.payload.gig;
      })
      .addCase(fetchGig.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create gig
      .addCase(createGig.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gigs.unshift(action.payload.gig);
        state.myGigs.unshift(action.payload.gig);
      })
      .addCase(createGig.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch my gigs
      .addCase(fetchMyGigs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyGigs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myGigs = action.payload.gigs;
      })
      .addCase(fetchMyGigs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch my bids
      .addCase(fetchMyBids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myBids = action.payload.bids;
      })
      .addCase(fetchMyBids.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentGig, clearError, updateGigInList } = gigSlice.actions;
export default gigSlice.reducer;
