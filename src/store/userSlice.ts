import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  username: string;
  isLoggedIn: boolean;
}

const initialState = {
  username: '',
  isLoggedIn: !!localStorage.getItem('authToken'),
} as IUserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUsername } = userSlice.actions;
export default userSlice.reducer;
