import React, {useEffect, useState, Component } from 'react';
import {Modal, StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { loginRegisterStyle } from './login/loginStyle'; 
import { Formik, Field, Form } from 'formik';
import { workSheetStyle } from './worksheet/workSheetStyle';
import { ScrollView } from 'react-native-gesture-handler';
import * as yup from 'yup';
import { guestDataPost } from '../components/api';
import { LoaderSpeen, LoaderOnly } from '../components/loaderSpeen';
import { useSelector } from 'react-redux';


const reviewSchema = yup.object({
  Note: yup.string().required().min(4).max(200),
});


export default function EditRequest({route, navigation }) {
  const userProfile = useSelector(state => state.LoginReducer.data);

  const [date, setDate] = useState(new Date())
  const [isShow, setIsShow] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isError, setError] = useState(false);
  const { data, is_worksheet } = route.params;
   console.log(JSON.stringify(data));

  const switchSignInReg = () => {
      setIsShow(true);
      console.log("true : " + isShow);
  }
  let initialvalue = {};
  if(data){
    initialvalue = data;
  }else{
    initialvalue = {UserId: -1, Date: date, Note: '' };
  }
  useEffect(() => {
    if(is_worksheet == 1){
      navigation.setOptions({title: "Edit Request for work sheet"});
    }else{
      navigation.setOptions({title: "Edit Request for target and achive"});
    }
  },[])


  const navTo = (vl) => {
    navigation.navigate(vl)
  }


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
                        if(userProfile.user != null){
                          val.UserId = userProfile.user.id;
                        }
                        let vl = null;
                        setLoader(true);
                        console.log("wroksheet page: " + is_worksheet);
                        console.log("wroksheet page: " +JSON.stringify(val));
                        console.log("wroksheet page: " +JSON.stringify(val));
                        if(data){
                          if(is_worksheet == 1){
                          vl = await guestDataPost("WorkSheetEditRequest", val);
                          console.log("request note data: " + JSON.stringify(val));
                        }else if(is_worksheet == 0){
                            vl = await guestDataPost("targetEditRequest", val);
                            console.log("request work data data: " + JSON.stringify(val));
                          }
                        }
                       if(!vl.error){
                         setLoader(false);
                         navTo("Dashboard");
                       }else{
                         setError(true);
                       }
                        
                }}>
                    {(props) =>(
                        <View>
                      
                            <Text style={loginRegisterStyle.text}>Note For edit request </Text>
                            <TextInput 
                                placeholder='Edit request reason' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Note')}
                                value={props.values.Note}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Note && props.errors.Note}</Text>

                            <TouchableOpacity 
                                onPress={props.handleSubmit}
                                style={loginRegisterStyle.buttonSubmit}>
                                <Text style={loginRegisterStyle.customButtonTopText}>Request Now</Text>
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