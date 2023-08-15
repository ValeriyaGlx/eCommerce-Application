import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    isAuthorization: false,
    token: '',
  },
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.isAuthorization = true;
      const { token } = action.payload;
      state.token = token;
    },
    logOut: (state) => {
      state.isAuthorization = false;
      state.token = '';
    },
  },
});

export const { loginSuccess, logOut } = authorizationSlice.actions;

export default authorizationSlice.reducer;
