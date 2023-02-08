import { configureStore } from "@reduxjs/toolkit";
import footballDataSlice from './football/slice'



export const store = configureStore({
    reducer: {
        footballDataList: footballDataSlice,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
