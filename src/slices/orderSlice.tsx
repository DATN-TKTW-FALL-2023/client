import { createSlice } from "@reduxjs/toolkit";

const showtimeSlice = createSlice({
  name: "showtimeOrder",
  initialState: {
    showtime: null,
    seats: [],
  },
  reducers: {
    setCurrentShowtime: (state, action) => {
      state.showtime = action.payload.showtime;
      state.seats = action.payload.seats;
    },
    removeOrder: (state) => {
      state.showtime = null;
      state.seats = [];
    },
  },
});

export const { removeOrder, setCurrentShowtime } = showtimeSlice.actions;

export default showtimeSlice.reducer;
