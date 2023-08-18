import { configureStore } from '@reduxjs/toolkit';

import signupReducer from './signupActions/sugnupSlice';
import signinReducer from './signinAction/signinSlice';
import modalSliceReducer from './modalSliceAction/modalSlice';
import authorizationSlice from './authorizationAction/authorizationSlice';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
    modal: modalSliceReducer,
    authorization: authorizationSlice,
  },
});
