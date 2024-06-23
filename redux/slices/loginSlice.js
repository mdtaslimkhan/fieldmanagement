import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../components/constants";
import axios from "axios";


export const getUser = createAsyncThunk("logUser", async(val, action) =>{
    try{
        const config = {
            method: 'post',
            url: '',
            headers: {
                'Authorization': '',
                'Content-Type': 'application/json'
            },
            data: val
        };
        const res = await axios.post(API_URL + "loguser",config);
      //  console.log("hello data" + JSON.stringify(res.data));
        return res.data;
        } catch (err) {
            console.log(err);
        }
});


const LoginSlice = createSlice({
    name: "loginUser",
    initialState: {
        data: null,
        isLoader: false,
        isError: false
    },
    extraReducers: builder => {
        builder.addCase(getUser.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.isError = true;
        });
    }
});


export default LoginSlice.reducer;