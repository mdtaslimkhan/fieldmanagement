import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const wrokDataFetch = createAsyncThunk("fetchworkSheet", async() => {
    const res = await fetch("http://expro.exotictech.xyz/api/eims/workSheetList");
    const final = await res.json();
    return final;
});

const WorkSheetSlice = createSlice({
    name: "workSheet",
    initialState: {
        data: null,
        isLoader: false,
        isError: false
    },
    extraReducers: builder => {
        builder.addCase(wrokDataFetch.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(wrokDataFetch.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(wrokDataFetch.rejected, (state, action) => {
            state.isError = true;
        });
    }
});

export default WorkSheetSlice.reducer;