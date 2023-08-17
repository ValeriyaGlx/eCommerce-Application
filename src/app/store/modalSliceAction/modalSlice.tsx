import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    isSignUpModal: false,
    isSignUpSuccessful: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    setSingUpModalValue: (
      state,
      action: PayloadAction<{ isOpen: boolean }>,
    ) => {
      const { isOpen } = action.payload;
      state.isSignUpModal = isOpen;
    },
    setSingUpSuccess: (
      state,
      action: PayloadAction<{ isSuccess: boolean }>,
    ) => {
      const { isSuccess } = action.payload;
      state.isSignUpSuccessful = isSuccess;
    },
  },
});

export const { openModal, closeModal, setSingUpModalValue, setSingUpSuccess } =
  modalSlice.actions;

export default modalSlice.reducer;
