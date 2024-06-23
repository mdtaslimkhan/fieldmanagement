import React, {useEffect, useState} from 'react';
import {ToastAndroid, Text, View, Button, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { loginRegisterStyle } from './loginStyle';
import { Formik } from 'formik';
import * as yup from 'yup';
import { LoaderSpeen, LoaderOnly } from '../../components/loaderSpeen';
import { workSheetStyle } from '.././worksheet/workSheetStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/loginSlice';

const reviewSchema = yup.object({
    email: yup.string().required().email().matches(/@[^.]*\./),
    Password: yup.string().required().min(6).max(20),
  });

export default function LoginFields({ switchscreen, navigation }) {
    const userProfile = useSelector(state => state.LoginReducer);
    const [isShow, setIsShow] = useState(false);
    const [isLoader, setLoader] = useState(false);
    const [isError, setError] = useState(false);
    const [msg, setMessage] = useState("");
    const dispatch = useDispatch();

   useEffect(() => {
    if(userProfile.data != null){
        if(userProfile.data.user){
            navTo("Dashboard");
        }else{
            setLoader(false);
            ToastAndroid.show('Username or Password wrong', ToastAndroid.SHORT);
        }
    }
  
   },[userProfile]);

    navigation.setOptions({title: "Login"});
    const initialvalue = {email: '', Password: '' };
    
    const navTo = (vl) => {
        navigation.replace(vl);
    }
    

return (
    <View style={workSheetStyle.container}>
    { !isLoader ?
       <View style={loginRegisterStyle.content}>
            <View style={loginRegisterStyle.inputButtonHolderTop}>
            <TouchableOpacity 
                onPress={() => switchscreen(false)}
                style={loginRegisterStyle.customButtonTop}
                >
                <Text style={loginRegisterStyle.customButtonTopText}>Tap To Register</Text>
            </TouchableOpacity>
                
            </View>            
            <Formik 
                initialValues={initialvalue}
                validationSchema={reviewSchema}
                onSubmit={(val, actions) => {
                    // actions.resetForm();
                    // textHandler(val);
                   // console.log(val);
                    let vl = null;
                    setLoader(true);
                    dispatch(getUser(val));
                //    if(!vl.error){
                //      setLoader(false);
                //      // get user data from bckend
                //      navTo("Dashboard", vl.user);
                //    }else{
                //      setError(true);
                //    }
               //    console.log(val);
            }}>
                {(props) =>(
                    <View>
                        <Text style={loginRegisterStyle.text}>Your Username & Email </Text>
                        <TextInput 
                            placeholder='Email' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.email && props.errors.email}</Text>
                        <Text style={loginRegisterStyle.text}>Password </Text>
                        <TextInput 
                            placeholder='Password' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('Password')}
                            value={props.values.Password}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.Password && props.errors.Password}</Text>

                                <TouchableOpacity onPress={() => navTo("Dashboard")}>
                                <Text style={loginRegisterStyle.forgetText}>Forget password?</Text>
                            </TouchableOpacity>
                            <Text>{msg}</Text>
                        <TouchableOpacity 
                            onPress={props.handleSubmit}
                            style={loginRegisterStyle.buttonSubmit}>
                            <Text style={loginRegisterStyle.customButtonTopText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>        
    </View>  : <LoaderSpeen />
}      
</View>
);

}



