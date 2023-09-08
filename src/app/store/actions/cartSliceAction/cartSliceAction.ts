import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  productsInCart: string[];
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    productsInCart: [],
  } as CartState,
  reducers: {
    addProduct: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      state.productsInCart.push(productId);
    },
    clearCart: (state) => {
      state.productsInCart = [];
    },
  },
});

export const { addProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
