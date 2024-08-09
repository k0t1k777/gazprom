import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { membersProps } from 'src/services/types';
import { getMembers } from 'src/store/api';
import { RootStore } from 'src/store/store';

export interface StateType {
  members: membersProps[];
  isLoading: boolean;
  error: string | null | unknown;
}

const initialState: StateType = {
  members: [],
  isLoading: false,
  error: null,
};

export const fetchGetMembers = createAsyncThunk('fetch/members', async () => {
  const response = await getMembers();
  return response;
});

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetMembers.fulfilled, (state, action) => {
        state.members = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchGetMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const membersReducer = membersSlice.reducer;
export const selectMembers = (state: RootStore) => state.members;
