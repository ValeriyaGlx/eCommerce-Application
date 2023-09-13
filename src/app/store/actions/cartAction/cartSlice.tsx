import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  numberOfProductToCart: number;
}

const initialState: CartState = {
  numberOfProductToCart: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setNumberOfProductToCart: (state, action: PayloadAction<number>) => {
      state.numberOfProductToCart = action.payload;
    },
  },
});

export const { setNumberOfProductToCart } = cartSlice.actions;
export default cartSlice.reducer;
