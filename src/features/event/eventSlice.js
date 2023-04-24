import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchEventByIdAPI } from "./eventAPI";

const initialState = {
  loading: false,
  event: null,
};

export const fetchEventById = createAsyncThunk(
  "event/fetchEventById",
  async (id) => {
    const response = await fetchEventByIdAPI(id);
    return response.data;
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventById.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchEventById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.event = action.payload;
        state.loading = false;
      });
  },
});

export default eventSlice.reducer;
