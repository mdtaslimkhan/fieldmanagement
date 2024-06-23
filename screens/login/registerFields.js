import React, {useState} from 'react';
import { Text, View, Button, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { loginRegisterStyle } from './loginStyle';
import { Formik } from 'formik';
import * as yup from 'yup';
import { guestDataPost } from '../../components/api';
import { LoaderSpeen, LoaderOnly } from '../../components/loaderSpeen';
import { workSheetStyle } from '.././worksheet/workSheetStyle';




const reviewSchema = yup.object({
    Name: yup.string().required().min(4).max(30),
    Username: yup.string().required().min(4).max(30),
    Desig: yup.string().required().min(4).max(30),
    Email: yup.string().required().email().matches(/@[^.]*\./),
    Phone: yup.string().required().min(4).max(30),
    Password: yup.string().required().min(4).max(30),
});
  


export default function RegisterFields({ switchscreen, navigation }) {
    const [isShow, setIsShow] = useState(false);
    const [isLoader, setLoader] = useState(false);
    const [isError, setError] = useState(false);

    let initialvalue = {Name: '', Username: '', Desig: '', Phone: '' , Email: '',Password: ''};
    navigation.setOptions({title: "Register"});
   
    const navTo = (vl) => {
        navigation.replace(vl);
      }
return (
    <View style={workSheetStyle.container}>
    { !isLoader ?
       <View style={loginRegisterStyle.content}>
            <View style={loginRegisterStyle.inputButtonHolderTopRegister}>
            <TouchableOpacity 
                onPress={() => switchscreen(true)}
                style={loginRegisterStyle.customButtonTop}>
                <Text style={loginRegisterStyle.customButtonTopText}>Tap To Login</Text>
            </TouchableOpacity>  
            </View>
            <Formik 
                initialValues={initialvalue}
                validationSchema={reviewSchema}
                onSubmit={async(val, actions) => {
                  //  actions.resetForm();
                    // textHandler(val);
                    console.log(val);
                    let vl = null;
                    setLoader(true);
                    vl = await guestDataPost("postUser", val);
                   if(!vl.error){
                     setLoader(false);
                     navTo("Dashboard");
                   }else{
                     setError(true);
                   }
                   console.log(vl.data);
                    
                    
            }}>
                {(props) =>(
                    <View>
                        <Text style={loginRegisterStyle.text}>Your Name </Text>
                        <TextInput 
                            placeholder='Name' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('Name')}
                            value={props.values.Name}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.Name && props.errors.Name}</Text>

                        <Text style={loginRegisterStyle.text}>Your username </Text>
                        <TextInput 
                            placeholder='Usernames' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('Username')}
                            value={props.values.Username}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.Username && props.errors.Username}</Text>
                        <Text style={loginRegisterStyle.text}>Your Designation </Text>
                        <TextInput 
                            placeholder='Designation' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('Desig')}
                            value={props.values.Desig}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.Desig && props.errors.Desig}</Text>
                        <Text style={loginRegisterStyle.text}>Your Phone Number </Text>
                        <TextInput 
                            placeholder='Phone number' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('Phone')}
                            keyboardType='number-pad'
                            value={props.values.Phone}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.Phone && props.errors.Phone}</Text>
                        <Text style={loginRegisterStyle.text}>Your Email </Text>
                        <TextInput 
                            placeholder='Email' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('Email')}
                            value={props.values.Email}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.Email && props.errors.Email}</Text>
                        <Text style={loginRegisterStyle.text}>Password </Text>
                        <TextInput 
                            placeholder='Password' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('Password')}
                            value={props.values.Password}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.Password && props.errors.Password}</Text>

                        <TouchableOpacity 
                            onPress={props.handleSubmit}
                            style={loginRegisterStyle.buttonSubmitRegister}>
                            <Text style={loginRegisterStyle.customButtonTopText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>        
    </View>  : <LoaderSpeen />
}      
</View>
);

}



