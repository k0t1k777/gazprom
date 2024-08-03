import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SliceProps {
  currentPage: number;

}

const initialState: SliceProps = {
  currentPage: 1,
};

export const slice = createSlice({
  name: 'picture',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
   
  }
});

export const {
  setCurrentPage,
  
} = slice.actions;

// export default slice.reducer;

export const store = configureStore({
  reducer: slice.reducer,
});
