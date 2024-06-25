import axios from "axios";
import { API_URL } from "./constants";

export const guestDataPost = async (url, data) => {
    try{
    const config = {
        method: 'post',
        url: '',
        headers: {
            'Authorization': '',
            'Content-Type': 'application/json'
        },
        data: data
    };
    const res = await axios.post(API_URL + url,config);
   // console.log("hello data" + JSON.stringify(res.data.msg));
    return res;
    } catch (err) {
        console.log(err);
    }
};

export const uniDataPost = async (url, data) => {
    try{
    const config = {
        method: 'post',
        url: '',
        headers: {
            'Authorization': '',
            'Content-Type': 'application/json'
        },
        data: data
    };
    const res = await axios.post(API_URL + url,config);
   // console.log("hello data" + JSON.stringify(res.data.msg));
    return res;
    } catch (err) {
        console.log(err);
    }
};