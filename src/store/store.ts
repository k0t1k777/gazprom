import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'src/store/features/slice/userSlice';
import { membersReducer } from './features/slice/membersSlice';

export const store = configureStore({
  reducer: { user: userReducer, members: membersReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
