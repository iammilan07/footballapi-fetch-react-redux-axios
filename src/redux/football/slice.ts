import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    footballData: [],
    loading: false,

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
            state.loading = false
        },

        fetchFootballData: (state: any, action: any) => {
            state.footballData = action.payload

        },


    },
});

export const { request, success, fetchFootballData } = footballDataSlice.actions
export default footballDataSlice.reducer

