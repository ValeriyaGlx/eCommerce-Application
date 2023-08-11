import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputState {
  value: string;
  validationError: string | null;
}

interface FormState {
  signup: Record<string, InputState>;
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
};

const signupSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
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
  },
});

export const { setInputValue, setInputValidationError, clearInputValidationError } = signupSlice.actions;
export default signupSlice.reducer;
