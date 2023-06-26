import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  username: string;
  password: string;
};
const initialState = {
  value: {
    isAuth: false,
    username: '',
    password: '',
  } as AuthState,
} as InitialState;

type user = {
  username: string;
  password: string;
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },

    userInfo: (state, action: PayloadAction<user>) => {
      state.value.username = action.payload.username;
      state.value.password = action.payload.password;
    },
  },
});

export const { logOut, userInfo } = auth.actions;
export default auth.reducer;
