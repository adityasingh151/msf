import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  timestamp: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true;
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
      };
      state.timestamp = Date.now();
    },
    clearUser(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.timestamp = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
