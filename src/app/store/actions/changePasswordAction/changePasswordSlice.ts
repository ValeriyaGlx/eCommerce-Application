import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const changePassword = createSlice({
  name: 'changePassword',
  initialState: {
    currentPassword: {
      value: '',
      validationError: '',
    },
    confirmPassword: {
      value: '',
      validationError: '',
    },
    password: {
      value: '',
      validationError: '',
    },
  },

  reducers: {
    setPasswordValue: (state, action: PayloadAction<{ inputName: keyof typeof state; inputValue: string }>) => {
      const { inputName, inputValue } = action.payload;
      state[inputName].value = inputValue;
    },
    validateAllFields: (state, action: PayloadAction<{ inputName: string }>) => {
      const { inputName } = action.payload;
      if (!state[inputName].value) {
        state[inputName].validationError = 'This field is required';
      } else {
        state[inputName].validationError = '';
      }

      if (!state.confirmPassword.value) {
        state.confirmPassword.validationError = 'This field is required';
      } else if (state.confirmPassword.value !== state.password.value) {
        state.confirmPassword.validationError = 'Passwords do not match';
      } else {
        state.confirmPassword.validationError = '';
      }
    },
  },
});

export const { setPasswordValue, validateAllFields } = changePassword.actions;
export default changePassword.reducer;
