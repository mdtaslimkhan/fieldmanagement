import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../components/constants";

export const getNoticeList = createAsyncThunk("fetchNoticeList", async() => {
    const res = await fetch(API_URL + "noticeList");
    const data = await res.json();
    return data;
});


const NoticeListSlice = createSlice({
    name: "noticeList",
    initialState: {
        data: null,
        isLoader: false,
        isError: false
    },
    extraReducers: builder => {
        builder.addCase(getNoticeList.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(getNoticeList.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(getNoticeList.rejected, (state, action) => {
            state.isError = true;
        })
    }
});

export default NoticeListSlice.reducer;