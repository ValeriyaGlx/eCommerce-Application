import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
  numberOfPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  numberOfPage: 3,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setNumberOfPage: (state, action: PayloadAction<number>) => {
      state.numberOfPage = action.payload;
    },
  },
});

export const { setCurrentPage, setNumberOfPage } = paginationSlice.actions;
export default paginationSlice.reducer;
