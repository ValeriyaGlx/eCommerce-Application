import { configureStore } from '@reduxjs/toolkit';

import signupReducer from './validationActions/sugnupSlice';

export const store = configureStore({
  reducer: {
    inputs: signupReducer,
  },
});
