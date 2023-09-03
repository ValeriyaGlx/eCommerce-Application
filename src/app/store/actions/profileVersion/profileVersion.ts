import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    version: 1,
  },
  reducers: {
    setVersion: (state, action: PayloadAction<{ version: number }>) => {
      const { version } = action.payload;
      state.version = version;
    },
  },
});

export const { setVersion } = profileSlice.actions;

export default profileSlice.reducer;
