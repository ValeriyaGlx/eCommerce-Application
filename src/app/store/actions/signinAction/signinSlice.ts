import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputState {
  value: string;
  validationError: string | null;
}

const initialState: Record<string, InputState> = {
  email: {
    value: '',
    validationError: '',
  },
  password: {
    value: '',
    validationError: '',
  },
};

const signinSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setSingInInputValue: (state, action: PayloadAction<{ inputName: string; inputValue: string }>) => {
      const { inputName, inputValue } = action.payload;
      state[inputName].value = inputValue;
    },
    setSingInInputValidationError: (
      state,
      action: PayloadAction<{
        inputName: string;
        validationError: string;
      }>,
    ) => {
      const { inputName, validationError } = action.payload;
      state[inputName].validationError = validationError;
    },
  },
});

export const { setSingInInputValue, setSingInInputValidationError } = signinSlice.actions;
export default signinSlice.reducer;
