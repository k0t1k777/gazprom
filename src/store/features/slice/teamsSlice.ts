import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { inintialTeam } from 'src/services/const';
import { TeamsProps } from 'src/services/types';
import { getTeams, getTeamsId } from 'src/store/api';
import { RootStore } from 'src/store/store';

export interface StateType {
  teams: TeamsProps[];
  team: TeamsProps;
  isLoading: boolean;
  error: string | null | unknown;
  nameTeam: string;
  addTeam: TeamsProps[];
 }

const initialState: StateType = {
  teams: [],
  team: inintialTeam,
  isLoading: false,
  error: null,
  nameTeam: '',
  addTeam: [],
 };

export const fetchGetTeams = createAsyncThunk(
  'fetch/teams',
  async () => {
    const response = await getTeams();
    return response;
  }
);

export const fetchGetTeamsId = createAsyncThunk(
  'fetch/teams/id',
  async (id: number) => {
    const response = await getTeamsId(id);
    return response;
  }
);

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setNameTeam(state, action) {
      state.nameTeam = action.payload;
    },
    setAddTeam(state, action) {
      state.addTeam = action.payload;
    },
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
      .addCase(fetchGetTeamsId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetTeamsId.fulfilled, (state, action) => {
        state.team = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchGetTeamsId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  },
});

export const { setNameTeam, setAddTeam } = teamsSlice.actions;
export const teamsReducer = teamsSlice.reducer;
export const selectTeams = (state: RootStore) => state.teams;
