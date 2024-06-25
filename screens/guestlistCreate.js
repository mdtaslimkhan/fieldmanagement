import React, {useEffect, useState, Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { loginRegisterStyle } from './login/loginStyle'; 
import { Formik, Field, Form } from 'formik';
import { workSheetStyle } from './worksheet/workSheetStyle';
import { ScrollView } from 'react-native-gesture-handler';
import CustomSelect from '../components/customSelect';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { guestDataPost } from '../components/api';
import { LoaderSpeen, LoaderOnly } from '../components/loaderSpeen';

const reviewSchema = yup.object({
  Name: yup.string().required().min(4).max(30),
  Address: yup.string().max(200),
  Mobile: yup.string().max(200),
  Relation: yup.string().required(),
  Category: yup.string().required(),
});


export default function GuestListCreate({ route, navigation }) {
  const dispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const [isError, setError] = useState(false);
  const { data } = route.params; 
  // console.log(JSON.stringify(data));

  let initialvalue = {};

  useEffect(() => {
    if(data){
      initialvalue = data;
      navigation.setOptions({title: "Edit Guest"});
    }else{
      navigation.setOptions({title: "Create a Guest"});
      initialvalue = { Name: '',Address: '', Mobile: '', Relation: '', Category: ''};
    }
  },[])
  const navTo = (vl) => {
    navigation.navigate(vl)
  }

  const switchSignInReg = () => {
      setIsShow(true);
      console.log("true : " + isShow);
  }

  const RelationList = [
    {title: 'Father'},
    {title: 'Mother'},
    {title: 'Brother'},
    {title: 'Sister'},
    {title: 'Daughter'},
    {title: 'Son'},
    {title: 'Uncle'},
    {title: 'Aunty'},
    {title: 'Other'},
  ];

  const CategoryList = [
    {title: 'Red'},
    {title: 'Green'},
    {title: 'Yellow'},
    {title: 'Grey'},
    
  ];



return (
  <View style={workSheetStyle.container}>
  { !isLoader ?
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

    <View style={workSheetStyle.container}>
        <View style={workSheetStyle.content}>
                {
                  isError ? <Text style={{color: "red"}}>Server error</Text> : <></>
                }
            
                <Formik 
                    initialValues={initialvalue}
                    validationSchema={reviewSchema}
                    onSubmit={async(val, actions) => {
                       // actions.resetForm();
                       let vl = null;
                       setLoader(true);
                       if(data){
                         vl = await guestDataPost("updateguest", val);
                       }else{
                           vl = await guestDataPost("postguest", val);
                       }
                      if(!vl.error){
                        setLoader(false);
                        navTo("GuestList");
                      }else{
                        setError(true);
                      }
                      console.log(vl.data);
                }}>
                    {(props) =>(
                        <View>
                            <Text style={loginRegisterStyle.text}>Guest Name </Text>
                            <TextInput 
                                placeholder='Enter Guest Name ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Name')}
                                value={props.values.Name}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Name && props.errors.Name}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Your Address </Text>
                            <TextInput 
                                placeholder='Enter Your Address' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Address')}
                                value={props.values.Address}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Address && props.errors.Address}</Text>

                            <Text style={loginRegisterStyle.text}>Your Phone Number</Text>
                            <TextInput 
                                placeholder='Seminar 1st ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Mobile')}
                                keyboardType='number-pad'
                                value={props.values.Mobile}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Mobile && props.errors.Mobile}</Text>

                            <Text style={loginRegisterStyle.text}>Relation </Text>
                            <CustomSelect label={"Relation"} 
                            planList={RelationList}
                          
                            onChangeText={props.handleChange('Relation')}
                            selecteds={(val) => props.values.Relation = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Relation && props.errors.Relation}</Text>

                            <Text style={loginRegisterStyle.text}>Category </Text>
                            <CustomSelect label={"Category"} 
                            planList={CategoryList} 
                            selecteds={(val) => props.values.Category = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Category && props.errors.Category}</Text>

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