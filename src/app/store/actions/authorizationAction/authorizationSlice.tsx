import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    isAuthorization: false,
    isRegistration: false,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthorization = true;
    },
    logOut: (state) => {
      state.isAuthorization = false;
    },

    setRegistrationValue: (
      state,
      action: PayloadAction<{ isSubmit: boolean }>,
    ) => {
      const { isSubmit } = action.payload;
      state.isRegistration = isSubmit;
    },
  },
});

export const { loginSuccess, logOut, setRegistrationValue } =
  authorizationSlice.actions;

export default authorizationSlice.reducer;
