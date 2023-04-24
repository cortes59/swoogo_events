import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchEventSessionsAPI, fetchSessionByIdAPI } from "./sessionAPI";

const initialState = {
  loading: false,
  sessionByIdLoading: false,
  sessions: [],
  sessionsTotalCount: 0,
  session: null,
};

export const fetchEventSessions = createAsyncThunk(
  "session/fetchEventSessions",
  async (params) => {
    const response = await fetchEventSessionsAPI(params);
    return response.data;
  }
);

export const fetchSessionById = createAsyncThunk(
  "session/fetchEventById",
  async (id) => {
    const response = await fetchSessionByIdAPI(id);
    return response.data;
  }
);

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionById.pending, (state) => {
        state.sessionByIdLoading = true;
      })
      .addCase(fetchSessionById.rejected, (state) => {
        state.sessionByIdLoading = false;
      })
      .addCase(fetchSessionById.fulfilled, (state, action) => {
        state.session = action.payload;
        state.sessionByIdLoading = false;
      })
      .addCase(fetchEventSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventSessions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchEventSessions.fulfilled, (state, action) => {
        state.sessions = action.payload.items;
        state.sessionsTotalCount = action.payload._meta.totalCount;
        state.loading = false;
      });
  },
});

export default sessionSlice.reducer;
