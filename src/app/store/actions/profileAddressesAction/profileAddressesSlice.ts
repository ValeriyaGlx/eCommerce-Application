import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  },
});

export const {
  initializeAddresses,
  setAddressInputValue,
  setAddressInputValidationError,
  clearAddressInputValidationError,
} = profileAddressSlice.actions;
export default profileAddressSlice.reducer;
