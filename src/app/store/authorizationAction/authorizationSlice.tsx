import { createSlice } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    isAuthorization: false,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthorization = true;
    },
    logOut: (state) => {
      state.isAuthorization = false;
    },
  },
});

export const { loginSuccess, logOut } = authorizationSlice.actions;

export default authorizationSlice.reducer;
