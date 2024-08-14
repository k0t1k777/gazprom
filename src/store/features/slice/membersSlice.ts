import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { membersProps } from 'src/services/types';
import { getMembers, getMembersAmount } from 'src/store/api';
import { RootStore } from 'src/store/store';

export interface StateType {
  members: membersProps[];
  isLoading: boolean;
  error: string | null | unknown;
  isFilterOpen: boolean;
  currentPage: number;
  membersAmount: number;
  shortWindow: boolean;
  membersValue: string;
}

const initialState: StateType = {
  members: [],
  isLoading: false,
  error: null,
  isFilterOpen: true,
  currentPage: 1,
  membersAmount: 0,
  shortWindow: false,
  membersValue: '',
};

export const fetchGetMembersAmount = createAsyncThunk(
  'fetch/members/count',
  async () => {
    const response = await getMembersAmount();
    return response;
  }
);

export const fetchGetMembers = createAsyncThunk(
  'fetch/members',
  async (page: number) => {
    const response = await getMembers(page);
    return response;
  }
);

// export const fetchGetMembersValue = createAsyncThunk(
//   'fetch/members/value',
//   async (value: string) => {
//     const response = await getMembersValue(value);
//     return response;
//   }
// );

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setIsFilterOpen(state, action) {
      state.isFilterOpen = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setShortWindow(state, action) {
      state.shortWindow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchGetMembersAmount.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchGetMembersAmount.fulfilled, (state, action) => {
      state.membersAmount = action.payload.count;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(fetchGetMembersAmount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    .addCase(fetchGetMembers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchGetMembers.fulfilled, (state, action) => {
      state.members = action.payload.results;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(fetchGetMembers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setIsFilterOpen, setCurrentPage, setShortWindow } = membersSlice.actions;
export const membersReducer = membersSlice.reducer;
export const selectMembers = (state: RootStore) => state.members;
