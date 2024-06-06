import React, { useState, Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import { globalStyle } from '../styles/globalStyle';
import { loginRegisterStyle } from './login/loginStyle'; 
import { Formik, Field, Form } from 'formik';
import { workSheetStyle } from './worksheet/workSheetStyle';
import { ScrollView } from 'react-native-gesture-handler';
import CustomSelect from '../components/customSelect';
import * as yup from 'yup';
import { GetDateCustom } from './../components/common';
import DatePicker from 'react-native-date-picker';

const reviewSchema = yup.object({
  totalmember: yup.number().required().min(1).max(5),
  slnumber: yup.string().required().min(1).max(30),
  presenter: yup.string().required().min(4).max(30),
  seminar: yup.string().max(200),
  seminar1: yup.string().max(200),
  seminar2: yup.string().max(200),
  seminar3: yup.string().max(200),
  seminar4: yup.string().max(200),
  seminar5: yup.string().max(200),
  Personalinvite: yup.string().required().min(4).max(300),
  MemberToMember: yup.string().required().min(4).max(300),
  InviteWithName: yup.string().required().min(4).max(300),
});


export default function TargetAndAchive() {
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
                    initialValues={{totalmember:'', slnumber: '', presenter: '',seminar: '', seminar1: '',
                    seminar2: '', seminar3: '', seminar4: '', seminar5: '',Personalinvite: '',MemberToMember: '', InviteWithName: '' }}
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
                                <GetDateCustom setOpen={setOpen} date={date ? date.getMonth() : 'Month'} type={'Month'} />
                                <GetDateCustom setOpen={setOpen} date={date ? date.getFullYear() : 'Year'} type={'Year'} />
                            </View>

                         
                            <Text style={loginRegisterStyle.text}>Total Member </Text>
                            <TextInput 
                                placeholder='Total Member Number' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('totalmember')}
                                keyboardType='number-pad'
                                value={props.values.totalmember}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.totalmember && props.errors.totalmember}</Text>

                            <Text style={loginRegisterStyle.text}>SL number </Text>
                            <TextInput 
                                placeholder='SL Number' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('slnumber')}
                                keyboardType='number-pad'
                                value={props.values.slnumber}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.slnumber && props.errors.slnumber}</Text>

                            <Text style={loginRegisterStyle.text}>Project Presenter </Text>
                            <TextInput 
                                placeholder='Project Presenter ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('presenter')}
                                value={props.values.presenter}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.presenter && props.errors.presenter}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Seminar </Text>
                            <TextInput 
                                placeholder='Seminar' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('seminar')}
                                value={props.values.seminar}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.seminar && props.errors.seminar}</Text>

                            <Text style={loginRegisterStyle.text}>Seminar 1st </Text>
                            <TextInput 
                                placeholder='Seminar 1st ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('seminar1')}
                                value={props.values.seminar1}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.seminar1 && props.errors.seminar1}</Text>

                            <Text style={loginRegisterStyle.text}>Seminar 2nd </Text>
                            <TextInput 
                                placeholder='Seminar 2nd ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('seminar2')}
                                value={props.values.seminar2}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.seminar2 && props.errors.seminar2}</Text>

                            <Text style={loginRegisterStyle.text}>Seminar 3rd </Text>
                            <TextInput 
                                placeholder='Seminar 3rd' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('seminar3')}
                                value={props.values.seminar3}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.seminar3 && props.errors.seminar3}</Text>

                            <Text style={loginRegisterStyle.text}>Seminar 4th </Text>
                            <TextInput 
                                placeholder='Seminar 4th' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('seminar4')}
                                value={props.values.seminar4}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.seminar4 && props.errors.seminar4}</Text>


                            <Text style={loginRegisterStyle.text}>Seminar 5th </Text>
                            <TextInput 
                                placeholder='Seminar 5th' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('seminar5')}
                                value={props.values.seminar5}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.seminar5 && props.errors.seminar5}</Text>

                            <Text style={loginRegisterStyle.text}>Your Personal Invite </Text>
                            <TextInput 
                                placeholder='Your Personal Invite' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Personalinvite')}
                                value={props.values.Personalinvite}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Personalinvite && props.errors.Personalinvite}</Text>

                            <Text style={loginRegisterStyle.text}>Your Member To Member </Text>
                            <TextInput 
                                placeholder='Your Member To Member' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('MemberToMember')}
                                value={props.values.MemberToMember}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.MemberToMember && props.errors.MemberToMember}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Personal Invite With Name </Text>
                            <TextInput 
                                placeholder='Personal Invite With Name' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('InviteWithName')}
                                value={props.values.InviteWithName}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.InviteWithName && props.errors.InviteWithName}</Text>

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