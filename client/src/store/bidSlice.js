import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const submitBid = createAsyncThunk(
  'bids/submitBid',
  async (bidData, { rejectWithValue }) => {
    try {
      const response = await api.post('/bids', bidData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit bid');
    }
  }
);

export const fetchBidsForGig = createAsyncThunk(
  'bids/fetchBidsForGig',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/bids/${gigId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bids');
    }
  }
);

export const hireBid = createAsyncThunk(
  'bids/hireBid',
  async (bidId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/bids/${bidId}/hire`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to hire freelancer');
    }
  }
);

const initialState = {
  bids: [],
  isLoading: false,
  error: null
};

const bidSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    clearBids: (state) => {
      state.bids = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    addBid: (state, action) => {
      state.bids.unshift(action.payload);
    },
    updateBidsAfterHire: (state, action) => {
      const hiredBidId = action.payload;
      state.bids = state.bids.map(bid => ({
        ...bid,
        status: bid._id === hiredBidId ? 'hired' : 'rejected'
      }));
    }
  },
  extraReducers: (builder) => {
    builder
      // Submit bid
      .addCase(submitBid.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitBid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bids.unshift(action.payload.bid);
      })
      .addCase(submitBid.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch bids for gig
      .addCase(fetchBidsForGig.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBidsForGig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bids = action.payload.bids;
      })
      .addCase(fetchBidsForGig.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Hire bid
      .addCase(hireBid.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(hireBid.fulfilled, (state, action) => {
        state.isLoading = false;
        const hiredBidId = action.payload.bid._id;
        state.bids = state.bids.map(bid => ({
          ...bid,
          status: bid._id === hiredBidId ? 'hired' : 'rejected'
        }));
      })
      .addCase(hireBid.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearBids, clearError, addBid, updateBidsAfterHire } = bidSlice.actions;
export default bidSlice.reducer;
