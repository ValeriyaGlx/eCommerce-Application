import { createSlice } from '@reduxjs/toolkit';

interface AddressState {
  value: string;
  validationError: string;
}

const profileAddressSlice = createSlice({
  name: 'addresses',
  initialState: {} as Record<string, Record<string, AddressState>>,
  reducers: {
    initializeAddresses: (state, action) => {
      return action.payload;
    },
    setAddressValue: (state, action) => {
      const { inputName, fieldName, value } = action.payload;

      if (!state[inputName]) {
        state[inputName] = {};
      }
      state[inputName][fieldName] = value;
    },
  },
});

export const { initializeAddresses, setAddressValue } = profileAddressSlice.actions;
export default profileAddressSlice.reducer;
