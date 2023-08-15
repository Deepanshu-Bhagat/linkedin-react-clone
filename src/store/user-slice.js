import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  user: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
