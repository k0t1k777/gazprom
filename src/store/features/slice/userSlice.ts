import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegisterDataProps } from 'src/services/types';
import { registration } from 'src/store/api';
import { RootStore } from 'src/store/store';

export interface StateType {
  access: string;
  isLoading: boolean;
  error: string | null | unknown;
  loggedIn: boolean;
}

const initialState: StateType = {
  access: '',
  isLoading: false,
  error: null,
  loggedIn: false,
};

export const registerUser = createAsyncThunk(
  'fetch/user', 
  async ({ email, password }: RegisterDataProps) => {
    const response = await registration({ email, password });
    return response;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.access = action.payload;
      state.loggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.access = action.payload.access;
        state.isLoading = true;
        state.error = null;
        state.loggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoggedIn } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const selectUsers = (state: RootStore) => state.user;
