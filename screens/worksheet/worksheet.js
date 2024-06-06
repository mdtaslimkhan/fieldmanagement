import React, { useState, Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../../components/header';
import { globalStyle } from '../../styles/globalStyle';
import { loginRegisterStyle } from '../login/loginStyle';
import { Formik, Field, Form } from 'formik';
import { workSheetStyle } from './workSheetStyle';
import { ScrollView } from 'react-native-gesture-handler';
import CustomSelect from '../../components/customSelect';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import { GetDateCustom } from '../../components/common';

const reviewSchema = yup.object({
  plan: yup.string().required().notOneOf([yup.ref('Plan')]),
  presenter: yup.string().required().notOneOf([yup.ref('Presenter')]),
  guest: yup.string().required().min(4).max(30),
  address: yup.string().required().min(4).max(300),
  phone: yup.string().required().min(4).max(300),
});


export default function WorkSheet() {

  const [date, setDate] = useState(new Date("2021-12-31"))
  const [open, setOpen] = useState(false)
  

  const [isShow, setIsShow] = useState(false);

  const switchSignInReg = () => {
      setIsShow(true);
      console.log("true : " + isShow);
  }

  const planList = [
    {title: 'Seminar'},
    {title: 'Marketing'},
    {title: 'Follow up'},
  ];

  const presenterList = [
    {title: 'Jashim'},
    {title: 'Md Abu toha'},
    {title: 'Md Aminul'},
  ];



return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

    <View style={workSheetStyle.container}>
        <View style={workSheetStyle.content}>

                <Formik 
                    initialValues={{plan:'', presenter: '', guest: '',address: '', phone: '',
                    comment: '', comment2nd: '', comment3rd: ''  }}
                    validationSchema={reviewSchema}
                    onSubmit={(val, actions) => {
                        actions.resetForm();
                        // textHandler(val);
                        console.log(val);
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

                           <Text style={loginRegisterStyle.text}>Plan </Text>
                            <CustomSelect label={"Plan"} 
                            planList={planList}
                            onChangeText={props.handleChange('plan')}
                            selecteds={(val) => props.values.plan = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.plan && props.errors.plan}</Text>

                            <Text style={loginRegisterStyle.text}>Presenter Name </Text>
                            <CustomSelect label={"Presenter"} 
                            planList={presenterList} 
                            selecteds={(val) => props.values.presenter = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.presenter && props.errors.presenter}</Text>


                            <Text style={loginRegisterStyle.text}>Guest Name </Text>
                            <TextInput 
                                placeholder='Guest' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('guest')}
                                value={props.values.guest}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.guest && props.errors.guest}</Text>

                            <Text style={loginRegisterStyle.text}>Address </Text>
                            <TextInput 
                                placeholder='Address' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('address')}
                                value={props.values.address}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.address && props.errors.address}</Text>

                            <Text style={loginRegisterStyle.text}>Phone number </Text>
                            <TextInput 
                                placeholder='Phone Number' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('phone')}
                                value={props.values.phone}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.phone && props.errors.phone}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Your comment </Text>
                            <TextInput 
                                placeholder='Comment' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('comment')}
                                value={props.values.comment}/>
                            <Text style={loginRegisterStyle.errorText}></Text>

                            <Text style={loginRegisterStyle.text}>Your 2nd comment </Text>
                            <TextInput 
                                placeholder='Second Comment' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('comment2nd')}
                                value={props.values.comment2nd}/>
                            <Text style={loginRegisterStyle.errorText}></Text>

                            <Text style={loginRegisterStyle.text}>Your 3rd comment </Text>
                            <TextInput 
                                placeholder='Third Comment' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('comment3rd')}
                                value={props.values.comment3rd}/>
                            <Text style={loginRegisterStyle.errorText}></Text> 

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