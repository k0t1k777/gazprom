import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TeamsProps } from 'src/services/types';
import { getTeams } from 'src/store/api';
import { RootStore } from 'src/store/store';

export interface StateType {
  teams: TeamsProps[];
  isLoading: boolean;
  error: string | null | unknown;
 }

const initialState: StateType = {
  teams: [],
  isLoading: false,
  error: null,
 };

export const fetchGetTeams = createAsyncThunk(
  'fetch/teams',
  async () => {
    const response = await getTeams();
    return response;
  }
);

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetTeams.fulfilled, (state, action) => {
        state.teams = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchGetTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  },
});

export const teamsReducer = teamsSlice.reducer;
export const selectTeams = (state: RootStore) => state.teams;
