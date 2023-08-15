import { configureStore } from '@reduxjs/toolkit';

import signupReducer from './validationActions/sugnupSlice';
import signinReducer from './signinAction/signinSlice';
import modalSliceReducer from './modalSliceAction/modalSlice';
import authorizationSlice from './authorizationAction/authorizationSlice';

export const store = configureStore({
  reducer: {
    inputs: signupReducer,
    signin: signinReducer,
    modal: modalSliceReducer,
    authorization: authorizationSlice,
  },
});
