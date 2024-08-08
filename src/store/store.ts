import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from 'src/store/features/slice/userSlice'


export const store = configureStore({
  reducer: { user: userReducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch