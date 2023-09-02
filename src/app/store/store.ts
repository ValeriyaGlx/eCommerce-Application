import { configureStore } from '@reduxjs/toolkit';

import signupReducer from './actions/signupActions/sugnupSlice';
import signinReducer from './actions/signinAction/signinSlice';
import modalSliceReducer from './actions/modalSliceAction/modalSlice';
import authorizationSlice from './actions/authorizationAction/authorizationSlice';
import profileAddressSlice from './actions/profileAddressesAction/profileAddressesAction';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
    modal: modalSliceReducer,
    authorization: authorizationSlice,
    profileAddresses: profileAddressSlice,
  },
});
