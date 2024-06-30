import React, {useEffect, useState, Component } from 'react';
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
import { LoaderSpeen, LoaderOnly } from '../components/loaderSpeen';
import { guestDataPost } from '../components/api';
import { useSelector } from 'react-redux';

const reviewSchema = yup.object({
  Presenter: yup.string().required().min(4).max(30),
  Seminar: yup.string().max(200),
  Seminar1: yup.string().max(200),
  Seminar2: yup.string().max(200),
  Seminar3: yup.string().max(200),
  Seminar4: yup.string().max(200),
  Seminar5: yup.string().max(200),
  Personalinvite: yup.string().required().min(4).max(300),
  MemberToMember: yup.string().required().min(4).max(300),
  InviteWithName: yup.string().required().min(4).max(300),
});


export default function TargetAndAchive({route, navigation}) {
  const userProfile = useSelector(state => state.LoginReducer.data);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isError, setError] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const { data } = route.params;
 // console.log(JSON.stringify(data));
  let initialvalue = {};
  if(data){
    initialvalue = data;
  }else{
    initialvalue = {UserId: -1, Totalmember:'', Presenter: '',Seminar: '', Seminar1: '',
      Seminar2: '', Seminar3: '', Seminar4: '', Seminar5: '',
      Personalinvite: '',MemberToMember: '', InviteWithName: '' , Date: date};
  }

  useEffect(() => {
    if(data){
      navigation.setOptions({title: "Edit Target and Achive"});
    }else{
      navigation.setOptions({title: "Create a Target and Achive"});
    }
  },[])

  const navTo = (vl) => {
    navigation.navigate(vl)
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
  <View style={workSheetStyle.container}>
  { !isLoader ?
     <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

    <View style={workSheetStyle.container}>
        <View style={workSheetStyle.content}>

                <Formik 
                    initialValues={initialvalue}
                    validationSchema={reviewSchema}
                    onSubmit={ async(val, actions) => {
                       // actions.resetForm();
                        // textHandler(val);
                        if(userProfile.user != null){
                          val.UserId = userProfile.user.id;
                        }
                        console.log(val);
                        let vl = null;
                        setLoader(true);
                        if(data){
                          vl = await guestDataPost("updatetarget", val);
                        }else{
                          vl = await guestDataPost("posttarget", val);
                          console.log(val);
                        }
                       if(!vl.error){
                         setLoader(false);
                         navTo("TargetAndAchiveList");
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
                                <GetDateCustom setOpen={setOpen} date={date ? date.getMonth() : 'Month'} type={'Month'} />
                                <GetDateCustom setOpen={setOpen} date={date ? date.getFullYear() : 'Year'} type={'Year'} />
                            </View>

                         
                            <Text style={loginRegisterStyle.text}>Total Member </Text>
                            <TextInput 
                                placeholder='Total Member Number' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Totalmember')}
                                keyboardType='number-pad'
                                value={props.values.Totalmember}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Totalmember && props.errors.Totalmember}</Text>
                           
                            <Text style={loginRegisterStyle.text}>Project Presenter </Text>
                            <TextInput 
                                placeholder='Project Presenter ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Presenter')}
                                value={props.values.Presenter}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Presenter && props.errors.Presenter}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Seminar </Text>
                            <TextInput 
                                placeholder='Seminar' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Seminar')}
                                value={props.values.Seminar}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Seminar && props.errors.Seminar}</Text>

                            <Text style={loginRegisterStyle.text}>Seminar 1st </Text>
                            <TextInput 
                                placeholder='Seminar 1st ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Seminar1')}
                                value={props.values.Seminar1}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Seminar1 && props.errors.Seminar1}</Text>

                            <Text style={loginRegisterStyle.text}>Seminar 2nd </Text>
                            <TextInput 
                                placeholder='Seminar 2nd ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Seminar2')}
                                value={props.values.Seminar2}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Seminar2 && props.errors.Seminar2}</Text>

                            <Text style={loginRegisterStyle.text}>Seminar 3rd </Text>
                            <TextInput 
                                placeholder='Seminar 3rd' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Seminar3')}
                                value={props.values.Seminar3}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Seminar3 && props.errors.Seminar3}</Text>

                            <Text style={loginRegisterStyle.text}>Seminar 4th </Text>
                            <TextInput 
                                placeholder='Seminar 4th' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Seminar4')}
                                value={props.values.Seminar4}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Seminar4 && props.errors.Seminar4}</Text>


                            <Text style={loginRegisterStyle.text}>Seminar 5th </Text>
                            <TextInput 
                                placeholder='Seminar 5th' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Seminar5')}
                                value={props.values.Seminar5}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Seminar5 && props.errors.Seminar5}</Text>

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
  </ScrollView> : <LoaderSpeen />
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