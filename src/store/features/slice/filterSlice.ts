// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { FiltersProps } from 'src/services/types';
// import { getFilters } from 'src/store/api';
// import { RootStore } from 'src/store/store';

// export interface StateType {
//   filters: FiltersProps;
//   isLoading: boolean;
//   error: string | null | unknown;
// }

// const initialState: StateType = {
//   filters: { cities: [], departments: [], positions: [] },
//   isLoading: false,
//   error: null,
// };

// export const fetchGetFilters = createAsyncThunk('fetch/filters', async () => {
//   const response = await getFilters();
//   return response;
// });

// const filtersSlice = createSlice({
//   name: 'filters',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchGetFilters.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchGetFilters.fulfilled, (state, action) => {
//         state.filters = action.payload;
//         state.isLoading = false;
//         state.error = null;
//       })
//       .addCase(fetchGetFilters.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const filtersReducer = filtersSlice.reducer;
// export const selectFilters = (state: RootStore) => state.filters;
