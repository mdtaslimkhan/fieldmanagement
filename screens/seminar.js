import React, { useState, Component } from 'react';
import {Modal, StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { loginRegisterStyle } from './login/loginStyle'; 
import { Formik, Field, Form } from 'formik';
import { workSheetStyle } from './worksheet/workSheetStyle';
import { ScrollView } from 'react-native-gesture-handler';
import CustomSelect from '../components/customSelect';
import * as yup from 'yup';
import { GetDateCustom } from './../components/common';
import DatePicker from 'react-native-date-picker';
import { guestDataPost } from '../components/api';
import { LoaderSpeen, LoaderOnly } from '../components/loaderSpeen';



const reviewSchema = yup.object({
  HostName: yup.string().required().min(4).max(30),
  Upazila: yup.string().required().min(1).max(50),
  Village: yup.string().required().min(1).max(50),
  Presenter: yup.string().required(),
});


export default function SeminarForm({route, navigation }) {
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [openTime, setTimeOpen] = useState(false)
  const [isShow, setIsShow] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isError, setError] = useState(false);
  const { data } = route.params;
  // console.log(JSON.stringify(data));

  const switchSignInReg = () => {
      setIsShow(true);
      console.log("true : " + isShow);
  }

  let initialvalue = {};
  if(data){
    initialvalue = data;
    navigation.setOptions({title: "Edit Seminar"});
  }else{
    navigation.setOptions({title: "Create a Seminar Item"});
    initialvalue = {Date: date, Time: time, HostName: '',Upazila: '', Village: '', Presenter: '' };
  }
  const navTo = (vl) => {
    navigation.navigate(vl)
  }


  const presenterList = [
    {title: 'Jashim'},
    {title: 'Md Abu toha'},
    {title: 'Md Aminul'},
  ];

  const [modalShow, setModal] = useState(false);



return (
  <View style={workSheetStyle.container}>
  { !isLoader ?
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

    <View style={workSheetStyle.container}>
        <View style={workSheetStyle.content}>

                <Formik 
                    initialValues={initialvalue}
                    validationSchema={reviewSchema}
                    onSubmit={ async (val, actions) => {
                       // actions.resetForm();
                        // textHandler(val);
                        console.log(val);
                        let vl = null;
                        setLoader(true);
                        if(data){
                          vl = await guestDataPost("updateseminar", val);
                        }else{
                          vl = await guestDataPost("postseminar", val);
                          console.log(val);
                        }
                       if(!vl.error){
                         setLoader(false);
                         navTo("SeminarList");
                       }else{
                         setError(true);
                       }
                        
                }}>
                    {(props) =>(
                        <View>
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
                                    console.log("date string :" + date.getDay());
                                    props.values.Date = date;
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

                            <Text style={loginRegisterStyle.text}>Host Name </Text>
                            <TextInput 
                                placeholder='Enter Host Name ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('HostName')}
                                value={props.values.HostName}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.HostName && props.errors.HostName}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Upazila </Text>
                            <TextInput 
                                placeholder='Enter Your Address' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Upazila')}
                                value={props.values.Upazila}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Upazila && props.errors.Upazila}</Text>

                            <Text style={loginRegisterStyle.text}>Village</Text>
                            <TextInput 
                                placeholder='Enter Your Phone ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Village')}
                                value={props.values.Village}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Village && props.errors.Village}</Text>

                            <View>
                              <>
                                <DatePicker
                                  modal
                                  mode='time'
                                  open={openTime}
                                  date={time}
                                  showTime={{ use12Hours: true, format: "HH:mm a" }}
                                  onConfirm={(date) => {
                                    setTimeOpen(false)
                                    setTime(date)
                                    console.log("date string :" + date.getMinutes());
                                    props.values.Time = date;
                                  }}
                                  onCancel={() => {
                                    setTimeOpen(false)
                                  }}
                                />
                              </>
                            </View>
                            <View style={workSheetStyle.monthDateHolder}>
                                <GetDateCustom setOpen={setTimeOpen} date={time ? time.getHours() : 'Time'} type={'Time'} />
                                <GetDateCustom setOpen={setTimeOpen} date={time ? time.getMinutes() : 'Offset'} type={'Minutes'} />
                            </View>

                            <Text style={loginRegisterStyle.text}>Presenter Name </Text>
                            <CustomSelect label={"Presenter"} 
                            planList={presenterList} 
                            selecteds={(val) => props.values.Presenter = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Presenter && props.errors.Presenter}</Text>

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
  </ScrollView>: <LoaderSpeen />
}      
</View>
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