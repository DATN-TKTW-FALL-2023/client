import { createSlice } from '@reduxjs/toolkit';

const showtimeSlice = createSlice({
  name: 'showtime',
  initialState: {
    selectedShowtime: null,
    selectedSeats: [],
  },
  reducers: {
    setSelectedShowtime: (state, action) => {
      state.selectedShowtime = action.payload;
    },
    setSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload;
    },
    clearSelectedShowtimeAndSeats: (state) => {
      state.selectedShowtime = null;
      state.selectedSeats = [];
    },
  },
});

export const {
  setSelectedShowtime,
  setSelectedSeats,
  clearSelectedShowtimeAndSeats,
} = showtimeSlice.actions;

export default showtimeSlice.reducer;