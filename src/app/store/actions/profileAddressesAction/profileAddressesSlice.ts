import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
  value: string;
  validationError: string | null;
}

export type State = {
  [addressId: string]: {
    validation: Record<string, AddressState>;
    withoutValidation: Record<string, string | boolean>;
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

    changeProfileAddressCheckboxData: (
      state,
      action: PayloadAction<{
        addressId: string;
        checkboxValue: boolean;
      }>,
    ) => {
      const { addressId, checkboxValue } = action.payload;
      state[addressId].withoutValidation.defaultAddress = checkboxValue;
    },

    createNewAddress: (state, action: PayloadAction<{ newAddressId: string; inputName: string }>) => {
      const { newAddressId, inputName } = action.payload;
      state[newAddressId] = {
        validation: {
          code: {
            value: '',
            validationError: '',
          },
          city: {
            value: '',
            validationError: '',
          },
          street: {
            value: '',
            validationError: '',
          },
        },
        withoutValidation: {
          country: 'Choose a country',
          defaultAddress: false,
          type: inputName,
        },
      };
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      const newAddressId = action.payload;
      delete state[newAddressId];
    },
    setDefaultAddress: (state, action: PayloadAction<{ addressId: string; type: string }>) => {
      const { addressId, type } = action.payload;

      Object.values(state).forEach((address) => {
        if (address.withoutValidation.type === type) {
          address.withoutValidation.defaultAddress = false;
        }
      });
      state[addressId].withoutValidation.defaultAddress = true;
    },
  },
});

export const {
  initializeAddresses,
  setAddressInputValue,
  setAddressInputValidationError,
  clearAddressInputValidationError,
  setProfileSelectValue,
  createNewAddress,
  changeProfileAddressCheckboxData,
  removeAddress,
  setDefaultAddress,
} = profileAddressSlice.actions;
export default profileAddressSlice.reducer;
