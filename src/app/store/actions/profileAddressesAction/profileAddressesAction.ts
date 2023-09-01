import { createSlice } from '@reduxjs/toolkit';

interface AddressState {
  value: string;
  validationError: string;
}

export type State = {
  validation: Record<string, Record<string, AddressState>>;
  withoutValidation: Record<string, AddressState>;
};

const profileAddressSlice = createSlice({
  name: 'addresses',
  initialState: {
    validation: {},
    withoutValidation: {},
  } as State,

  reducers: {
    initializeAddresses: (state, action) => {
      return action.payload;
    },
    setAddressValue: (state, action) => {
      const { inputName, fieldName, value } = action.payload;

      if (!state.validation[inputName]) {
        state.validation[inputName] = {};
      }
      state.validation[inputName][fieldName] = value;
    },
  },
});

export const { initializeAddresses } = profileAddressSlice.actions;
export default profileAddressSlice.reducer;
