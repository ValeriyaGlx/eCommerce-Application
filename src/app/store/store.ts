import { configureStore } from '@reduxjs/toolkit';

import signupReducer from './validationActions/sugnupSlice';
import signinReducer from './signinAction/signinSlice';

export const store = configureStore({
  reducer: {
    inputs: signupReducer,
    signin: signinReducer,
  },
});
