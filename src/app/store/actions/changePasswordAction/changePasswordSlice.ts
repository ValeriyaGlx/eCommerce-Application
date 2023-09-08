import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordState {
  value: string;
  validationError: string | null;
}

export interface ChangePasswordState {
  currentPassword: PasswordState;
  confirmPassword: PasswordState;
  password: PasswordState;
}

const initialState: ChangePasswordState = {
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
};

const changePassword = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    resetPasswordState: () => initialState,
    setPasswordValue: (state, action: PayloadAction<{ inputName: keyof ChangePasswordState; inputValue: string }>) => {
      const { inputName, inputValue } = action.payload;
      state[inputName].value = inputValue;
    },
    validateAllFields: (state, action: PayloadAction<{ inputName: keyof ChangePasswordState }>) => {
      const { inputName } = action.payload;
      if (!state[inputName].value) {
        state[inputName].validationError = 'This field is required';
      } else {
        state[inputName].validationError = null;
      }

      if (state.confirmPassword.value !== state.password.value) {
        state.confirmPassword.validationError = 'Passwords do not match';
      }

      if (state.confirmPassword.value && !state.password.value) {
        state.confirmPassword.validationError = 'Set a new password first';
      }

      if (
        state.confirmPassword.value === state.password.value &&
        !state.confirmPassword.value &&
        state.password.value
      ) {
        state.confirmPassword.validationError = null;
      }
    },
  },
});

export const { resetPasswordState, setPasswordValue, validateAllFields } = changePassword.actions;
export default changePassword.reducer;
