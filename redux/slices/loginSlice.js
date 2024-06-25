import {ToastAndroid } from 'react-native';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../components/constants";
import axios from "axios";

const initialstate = {
    data: null,
    isLoader: false,
    isError: false
};


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
           // console.log("hello data" + JSON.stringify(res.data));
            console.log("loggedIn : " + JSON.stringify(res.data.loggedIn));
            if(!res.data.loggedIn){
                ToastAndroid.show('Username or Password wrong', ToastAndroid.SHORT);
            }
            return res.data;

        } catch (err) {
            console.log(err);
        }
});

export const registerUser = createAsyncThunk("registerUser", async(val, action) =>{
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
            const res = await axios.post(API_URL + "postUser",config);
           // console.log("hello data" + JSON.stringify(res.data));
            console.log("loggedIn : " + JSON.stringify(res.data));
            if(res.data.loggedIn){
                ToastAndroid.show('User logged in along register.', ToastAndroid.SHORT);
            }
            return res.data;
        } catch (err) {
            console.log(err);
        }
});


const LoginSlice = createSlice({
    name: "loginUser",
    initialState: initialstate,
    reducers: {
        logOut(state) {
         // state = initialstate;
         console.log("hello" + JSON.stringify(state));
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