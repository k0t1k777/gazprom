import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { registration } from 'src/store/api'
import { RootStore } from 'src/store/store';

export interface StateType {
  access: string;
  isLoading: boolean
  error: string | null | unknown
}

const initialState: StateType = {
  access: '',
  isLoading: false,
  error: null
}

export const fetchEventsData = createAsyncThunk('fetch/token', registration)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEventsData.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchEventsData.fulfilled, (state, action) => {
        state.access = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchEventsData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const userReducer = userSlice.reducer;
export const selectUsers = (state: RootStore) => state.user
