import { configureStore } from "@reduxjs/toolkit";
import footballDataSlice from './football/slice'
import modalSlice from "./modal/modalSlice";


export const store = configureStore({
    reducer: {
        footballDataList: footballDataSlice,
        modal: modalSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
