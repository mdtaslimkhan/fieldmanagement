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
  Totalmember_Target: yup.string().required().min(1).max(30),
  Totalmember_Achive: yup.string().max(200),
  Seminar_Target: yup.string().max(200),
  Seminar_Achive: yup.string().max(200),
  Personalinvite_Target: yup.string().max(200),
  Personalinvite_Achive: yup.string().max(200),
  MemberToMember_Target: yup.string().max(200),
  MemberToMember_Achive: yup.string().min(1).max(300),
  Presenter_Target: yup.string().required().min(1).max(300),
  Presenter_Achive: yup.string().min(1).max(300),
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
    initialvalue = {UserId: -1, Totalmember_Target:'', Totalmember_Achive: '',Seminar_Target: '', Seminar_Achive: '',
      Personalinvite_Target: '', Personalinvite_Achive: '', MemberToMember_Target: '', MemberToMember_Achive: '',
      Presenter_Target: '',Presenter_Achive: '' , Date: date};
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
 

                         
                            <Text style={loginRegisterStyle.text}>Totalmember_Target </Text>
                            <TextInput 
                                placeholder='Totalmember Target' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Totalmember_Target')}
                                keyboardType='number-pad'
                                value={props.values.Totalmember_Target}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Totalmember_Target && props.errors.Totalmember_Target}</Text>
                           
                            <Text style={loginRegisterStyle.text}>Totalmember_Achive </Text>
                            <TextInput 
                                placeholder='Totalmember Achive' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Totalmember_Achive')}
                                value={props.values.Totalmember_Achive}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Totalmember_Achive && props.errors.Totalmember_Achive}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Seminar_Target </Text>
                            <TextInput 
                                placeholder='Seminar_Target' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Seminar_Target')}
                                value={props.values.Seminar_Target}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Seminar_Target && props.errors.Seminar_Target}</Text>

                            <Text style={loginRegisterStyle.text}>Seminar_Achive </Text>
                            <TextInput 
                                placeholder='Seminar_Achive' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Seminar_Achive')}
                                value={props.values.Seminar_Achive}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Seminar_Achive && props.errors.Seminar_Achive}</Text>

                            <Text style={loginRegisterStyle.text}>Personalinvite_Target</Text>
                            <TextInput 
                                placeholder='Personalinvite_Target' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Personalinvite_Target')}
                                value={props.values.Personalinvite_Target}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Personalinvite_Target && props.errors.Personalinvite_Target}</Text>

                            <Text style={loginRegisterStyle.text}>Personalinvite_Achive </Text>
                            <TextInput 
                                placeholder='Personalinvite_Achive' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Personalinvite_Achive')}
                                value={props.values.Personalinvite_Achive}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Personalinvite_Achive && props.errors.Personalinvite_Achive}</Text>

                            <Text style={loginRegisterStyle.text}>MemberToMember_Target </Text>
                            <TextInput 
                                placeholder='MemberToMember_Target' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('MemberToMember_Target')}
                                value={props.values.MemberToMember_Target}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.MemberToMember_Target && props.errors.MemberToMember_Target}</Text>


                            <Text style={loginRegisterStyle.text}>MemberToMember_Achive </Text>
                            <TextInput 
                                placeholder='MemberToMember_Achive' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('MemberToMember_Achive')}
                                value={props.values.MemberToMember_Achive}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.MemberToMember_Achive && props.errors.MemberToMember_Achive}</Text>

                            <Text style={loginRegisterStyle.text}>Presenter_Target </Text>
                            <TextInput 
                                placeholder='Presenter_Target' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Presenter_Target')}
                                value={props.values.Presenter_Target}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Presenter_Target && props.errors.Presenter_Target}</Text>

                            <Text style={loginRegisterStyle.text}>Presenter_Achive</Text>
                            <TextInput 
                                placeholder='Presenter_Achive' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Presenter_Achive')}
                                value={props.values.Presenter_Achive}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Presenter_Achive && props.errors.Presenter_Achive}</Text>
                            
              
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