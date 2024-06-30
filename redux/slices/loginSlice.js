import {ToastAndroid } from 'react-native';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../components/constants";
import axios from "axios";
import { uniDataPost } from '../../components/api';

const initialstate = {
    data: null,
    isLoader: false,
    isError: false
};


export const getUser = createAsyncThunk("logUser", async(val, action) =>{
    const udata = await uniDataPost("loguser", val);
        if(!udata.data.loggedIn){
            ToastAndroid.show('Username or Password wrong', ToastAndroid.SHORT);
        }
        return udata.data;
});

export const registerUser = createAsyncThunk("registerUser", async(val, action) =>{
        const udata = await uniDataPost("postUser", val);
        if(udata.data.loggedIn){
            ToastAndroid.show('User logged in along register.', ToastAndroid.SHORT);
        }
        return udata.data;
});


const LoginSlice = createSlice({
    name: "loginUser",
    initialState: initialstate,
    reducers: {
        logOut(state) {
        // console.log("hello" + JSON.stringify(state));
       //  if(state.loggedIn && state.user){
             state.data.loggedIn = false;
             state.data.user = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state, action) =>{
            state.isLoader = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) =>{
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(registerUser.rejected, (state, action) =>{
            state.isError = true;
        });
        // login user
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

export const { logOut } = LoginSlice.actions;
export default LoginSlice.reducer;