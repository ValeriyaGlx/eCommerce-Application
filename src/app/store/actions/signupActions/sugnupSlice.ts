import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputState {
  value: string;
  validationError: string | null;
}

interface CountryState {
  shipping: string;
  billing: string;

  [key: string]: string;
}

export interface CheckboxesState {
  isSameAddress: boolean;
  isDefaultBothAddresses: boolean;
  isBillingDefault: boolean;
  isShippingDefault: boolean;
}

interface FormState {
  signup: Record<string, InputState>;
  countries: CountryState;
  checkboxes: CheckboxesState;
}

const initialState: FormState = {
  signup: {
    email: {
      value: '',
      validationError: '',
    },
    password: {
      value: '',
      validationError: '',
    },
    name: {
      value: '',
      validationError: '',
    },
    surname: {
      value: '',
      validationError: '',
    },
    date: {
      value: '',
      validationError: '',
    },
    shipping_city: {
      value: '',
      validationError: '',
    },
    shipping_street: {
      value: '',
      validationError: '',
    },
    shipping_code: {
      value: '',
      validationError: '',
    },
    billing_street: {
      value: '',
      validationError: '',
    },
    billing_city: {
      value: '',
      validationError: '',
    },
    billing_code: {
      value: '',
      validationError: '',
    },
  },

  countries: {
    shipping: 'Choose a country',
    billing: 'Choose a country',
  },

  checkboxes: {
    isSameAddress: true,
    isDefaultBothAddresses: false,
    isBillingDefault: false,
    isShippingDefault: false,
  },
};

const signupSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setSelectValue: (state, action: PayloadAction<{ inputName: string; newValue: string }>) => {
      const { inputName, newValue } = action.payload;
      state.countries[inputName] = newValue;
    },
    setInputValue: (state, action: PayloadAction<{ inputName: string; inputValue: string }>) => {
      const { inputName, inputValue } = action.payload;
      state.signup[inputName].value = inputValue;
    },
    setInputValidationError: (state, action: PayloadAction<{ inputName: string; validationError: string }>) => {
      const { inputName, validationError } = action.payload;
      state.signup[inputName].validationError = validationError;
    },
    clearInputValidationError: (state, action: PayloadAction<{ inputName: string }>) => {
      const { inputName } = action.payload;
      state.signup[inputName].validationError = null;
    },
    changeAddressCheckboxData: (
      state,
      action: PayloadAction<{
        checkbox: keyof CheckboxesState;
        checkboxValue: boolean;
      }>,
    ) => {
      const { checkbox, checkboxValue } = action.payload;
      state.checkboxes[checkbox] = checkboxValue;
    },
    resetState: () => initialState,

    resetPassword: (state) => {
      state.signup.password.value = '';
      state.signup.password.validationError = '';
    },
  },
});

export const {
  setSelectValue,
  setInputValue,
  setInputValidationError,
  clearInputValidationError,
  changeAddressCheckboxData,
  resetState,
  resetPassword,
} = signupSlice.actions;
export default signupSlice.reducer;
