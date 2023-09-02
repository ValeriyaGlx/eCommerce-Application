import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
  value: string;
  validationError: string | null;
}

export type State = {
  [addressId: string]: {
    validation: Record<string, AddressState>;
    withoutValidation: Record<string, string>;
  };
};

const profileAddressSlice = createSlice({
  name: 'addresses',
  initialState: {} as State,

  reducers: {
    initializeAddresses: (state, action) => {
      return action.payload;
    },
    setAddressInputValue: (
      state,
      action: PayloadAction<{
        addressId: string;
        inputName: string;
        inputValue: string;
      }>,
    ) => {
      const { addressId, inputName, inputValue } = action.payload;
      state[addressId].validation[inputName].value = inputValue;
    },
    setAddressInputValidationError: (
      state,
      action: PayloadAction<{
        addressId: string;
        inputName: string;
        validationError: string;
      }>,
    ) => {
      const { addressId, inputName, validationError } = action.payload;

      state[addressId].validation[inputName].validationError = validationError;
    },
    clearAddressInputValidationError: (state, action: PayloadAction<{ addressId: string; inputName: string }>) => {
      const { addressId, inputName } = action.payload;
      state[addressId].validation[inputName].validationError = null;
    },

    setProfileSelectValue: (
      state,
      action: PayloadAction<{
        addressId: string;
        inputName: string;
        newValue: string;
      }>,
    ) => {
      const { addressId, inputName, newValue } = action.payload;
      state[addressId].withoutValidation[inputName] = newValue;
    },
  },
});

export const {
  initializeAddresses,
  setAddressInputValue,
  setAddressInputValidationError,
  clearAddressInputValidationError,
  setProfileSelectValue,
} = profileAddressSlice.actions;
export default profileAddressSlice.reducer;
