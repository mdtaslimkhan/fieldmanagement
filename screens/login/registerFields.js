import React, {useState} from 'react';
import { Text, View, Button, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { loginRegisterStyle } from './loginStyle';
import { Formik } from 'formik';


export default function RegisterFields({ switchscreen }) {


    const [isShow, setIsShow] = useState(false);

    const switchSignInReg = () => {
        setIsShow(true);
        console.log("true : " + isShow);
    }

return (
    <View style={loginRegisterStyle.content}>
            <View style={loginRegisterStyle.inputButtonHolderTopRegister}>
            <TouchableOpacity 
                onPress={() => switchscreen(true)}
                style={loginRegisterStyle.customButtonTop}>
                <Text style={loginRegisterStyle.customButtonTopText}>Tap To Login</Text>
            </TouchableOpacity>
                
            </View>
            
            
            <Formik 
                initialValues={{name: '', username: '', desig: '', phone: '' , email: '',password: ''}}
                onSubmit={(val, actions) => {
                    actions.resetForm();
                    // textHandler(val);
                    console.log(val);
            }}>
                {(props) =>(
                    <View>
                        <Text style={loginRegisterStyle.text}>Your Name </Text>
                        <TextInput 
                            placeholder='Name' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('name')}
                            value={props.values.name}/>
                        <Text style={loginRegisterStyle.text}>Your username </Text>
                        <TextInput 
                            placeholder='Usernames' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('username')}
                            value={props.values.username}/>
                        <Text style={loginRegisterStyle.text}>Your Designation </Text>
                        <TextInput 
                            placeholder='Designation' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('desig')}
                            value={props.values.desig}/>
                        <Text style={loginRegisterStyle.text}>Your Phone Number </Text>
                        <TextInput 
                            placeholder='Phone number' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('phone')}
                            value={props.values.phone}/>
                        <Text style={loginRegisterStyle.text}>Your Email </Text>
                        <TextInput 
                            placeholder='Email' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}/>
                        <Text style={loginRegisterStyle.text}>Password </Text>
                        <TextInput 
                            placeholder='Password' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}/>
                        <TouchableOpacity 
                            onPress={props.handleSubmit}
                            style={loginRegisterStyle.buttonSubmitRegister}>
                            <Text style={loginRegisterStyle.customButtonTopText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>        
    </View>
);

}



