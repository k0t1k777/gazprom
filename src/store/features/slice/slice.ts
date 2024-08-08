import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SliceProps {
  loggedIn: boolean;
}

const initialState: SliceProps = {
  loggedIn: false,
};

export const slice = createSlice({
  name: 'gazprom',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
   
  }
});

export const {
  setLoggedIn,
  
} = slice.actions;

// export default slice.reducer;

export const store = configureStore({
  reducer: slice.reducer,
});
