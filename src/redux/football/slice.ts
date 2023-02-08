import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    footballData: [],
    isOpen: false,
    loading: false,
    error: null,
    items: null,
};

const footballDataSlice = createSlice({
    name: "footballData",
    initialState,
    reducers: {

        request: (state,) => {
            state.loading = true
        },
        success: (state, action) => {
            state.footballData = action.payload
            console.log('reducer', state.footballData)
            state.loading = false
        },

        fetchFootballData: (state: any, action: any) => {
            state.footballData = action.payload

        },


    },
});

export const { request, success, fetchFootballData } = footballDataSlice.actions
export default footballDataSlice.reducer

