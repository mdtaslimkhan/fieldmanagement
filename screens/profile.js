import React, { useState, Component } from 'react';
import {Image, StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import { globalStyle } from '../styles/globalStyle';
import { loginRegisterStyle } from './login/loginStyle'; 
import { Formik, Field, Form } from 'formik';
import { workSheetStyle } from './worksheet/workSheetStyle';
import { ScrollView } from 'react-native-gesture-handler';
import CustomSelect from '../components/customSelect';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { GetDateCustom } from './../components/common';
import DatePicker from 'react-native-date-picker';




import placeHoder from '../assets/favicon.png';
const formdata = global.FormData;


const reviewSchema = yup.object({
  slnumber: yup.string().required().min(1).max(30),
  Name: yup.string().required().min(4).max(30),
  Designation: yup.string().required().min(1).max(50),
  Phone: yup.string().required().min(1).max(50),
  Email: yup.string().required().min(5).max(50),
  NID: yup.string().required().min(5).max(30),
  Address: yup.string().max(300),
  Gender: yup.string().required(),
  BloodGroup: yup.string().required(),
});


export default function Profile() {

  const [date, setDate] = useState(new Date("2021-12-31"))
  const [open, setOpen] = useState(false)

  const [image, setImage] = useState(null);

  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
   await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      sendTobackend();
    }
  };


  const sendTobackend = async () => {
    try{
      const formdata = new FormData();
      formdata.append('',{
        uri: image,
        type: 'image/png',
        name: 'profile-image'
      });

      const config = {
        headers: {
          "Content-type": 'multipart/form-data'
        },
        transfromRequest: () => {
          return formdata;
        }
      }

      await axios.post('',formdata, config);
      alert('success');

    }catch(e){
      console.log('profile.js: '+ e);
    }
  }

  const [isShow, setIsShow] = useState(false);

  const switchSignInReg = () => {
      setIsShow(true);
      console.log("true : " + isShow);
  }

  const GenderList = [
    {title: 'Male'},
    {title: 'Female'},
    {title: 'Other'},
  ];

  const BloodGroupList = [
    {title: 'A+'},
    {title: 'B+'},
    {title: 'O+'},
    {title: 'AB+'},
    {title: 'B-'},
    {title: 'O-'},
    {title: 'AB-'},
    {title: 'A-'},
  ];

  


return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

    <View style={workSheetStyle.container}>
        <View style={workSheetStyle.content}>

                <Formik 
                    initialValues={{Name: '', slnumber: '',Designation: '', Phone: '',
                    Email: '', NID: '' , Address: '', Gender: '', BloodGroup: ''}}
                    validationSchema={reviewSchema}
                    onSubmit={(val, actions) => {
                        actions.resetForm();
                        // textHandler(val);
                        console.log(val);
                }}>
                    {(props) =>(
                        <View>

                          <View style={globalStyle.profileImageIcoHolder}>
                            <View style={globalStyle.profileImageHolder}>
                            {image && <Image source={{ uri: image }} style={globalStyle.profileImage} />}
                            <AntDesign style={globalStyle.imagePickerIcon} name="camera" 
                            onPress={pickImage} size={34} color="green" />
                            </View>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Name && props.errors.Name}</Text>

                          </View>

                            <Text style={loginRegisterStyle.text}>Your Name </Text>
                            <TextInput 
                                placeholder='Enter Your Name ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Name')}
                                value={props.values.Name}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Name && props.errors.Name}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Member ID </Text>
                            <TextInput 
                                placeholder='Member ID ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('slnumber')}
                                keyboardType='number-pad'
                                value={props.values.slnumber}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.slnumber && props.errors.slnumber}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Your Designation </Text>
                            <TextInput 
                                placeholder='Your Designation ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Designation')}
                                value={props.values.Designation}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Designation && props.errors.Designation}</Text>

                            <Text style={loginRegisterStyle.text}>Your Phone Number </Text>
                            <TextInput 
                                placeholder='Your Phone Number' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Phone')}
                                keyboardType='number-pad'
                                value={props.values.Phone}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Phone && props.errors.Phone}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Email </Text>
                            <TextInput 
                                placeholder='Email' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Email')}
                                value={props.values.Email}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Email && props.errors.Email}</Text>
                            
                            <Text style={loginRegisterStyle.text}>NID/Birth Certificate </Text>
                            <TextInput 
                                placeholder='NID/Birth Certificate' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('NID')}
                                keyboardType='number-pad'
                                value={props.values.NID}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.NID && props.errors.NID}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Your Address </Text>
                            <TextInput 
                                placeholder='Enter Your Address' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Address')}
                                value={props.values.slnumber}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.slnumber && props.errors.slnumber}</Text>
                            
                            <View>
                              <>
                                <DatePicker
                                  modal
                                  mode='date'
                                  open={open}
                                  date={date}
                                  onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                    console.log("date string :" + date.getDay())
                                  }}
                                  onCancel={() => {
                                    setOpen(false)
                                  }}
                                />
                              </>
                            </View>
                            <View style={workSheetStyle.monthDateHolder}>
                                <GetDateCustom setOpen={setOpen} date={date ? date.getDay() : 'Day'} type={'Day'} />
                                <GetDateCustom setOpen={setOpen} date={date ? date.getMonth() : 'Month'} type={'Month'} />
                                <GetDateCustom setOpen={setOpen} date={date ? date.getFullYear() : 'Year'} type={'Year'} />
                            </View>
                            
                            <Text style={loginRegisterStyle.text}>Gender </Text>
                            <CustomSelect label={"Gender"} 
                            planList={GenderList} 
                            selecteds={(val) => props.values.Gender = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Gender && props.errors.Gender}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Blood Group </Text>
                            <CustomSelect label={"Blood Group"} 
                            planList={BloodGroupList} 
                            selecteds={(val) => props.values.BloodGroup = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.BloodGroup && props.errors.BloodGroup}</Text>
                            
                            <TouchableOpacity 
                                onPress={props.handleSubmit}
                                style={loginRegisterStyle.buttonSubmit}>
                                <Text style={loginRegisterStyle.customButtonTopText}>Post Now</Text>
                            </TouchableOpacity>
  
                        </View>
                    )}
                </Formik>        
        </View>
  </View>
  </ScrollView>
);


}


const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: '#000'
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#fff',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });