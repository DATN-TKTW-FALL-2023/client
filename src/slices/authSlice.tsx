import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
    profile: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearAuth: (state) => {
      state.auth = null;
      state.profile = null;
    },
  },
});

export const { setAuth, clearAuth, setProfile } = authSlice.actions;
export default authSlice.reducer;
