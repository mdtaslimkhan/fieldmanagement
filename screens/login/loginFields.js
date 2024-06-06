import React, {useState} from 'react';
import { Text, View, Button, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { loginRegisterStyle } from './loginStyle';
import { Formik } from 'formik';


export default function LoginFields({ switchscreen }) {


    const [isShow, setIsShow] = useState(false);

    const switchSignInReg = () => {
        setIsShow(true);
        console.log("true : " + isShow);
    }

return (
    <View style={loginRegisterStyle.content}>
            <View style={loginRegisterStyle.inputButtonHolderTop}>
            <TouchableOpacity 
                onPress={() => switchscreen(false)}
                style={loginRegisterStyle.customButtonTop}
                >
                <Text style={loginRegisterStyle.customButtonTopText}>Tap To Register</Text>
            </TouchableOpacity>
                
            </View>
            <Text style={loginRegisterStyle.text}>Your Username & Email </Text>
            
            <Formik 
                initialValues={{username: '',password: '' }}
                onSubmit={(val, actions) => {
                    actions.resetForm();
                    // textHandler(val);
                    console.log(val);
            }}>
                {(props) =>(
                    <View>
                        <TextInput 
                            placeholder='Usernames' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('username')}
                            value={props.values.username}/>
                        <Text style={loginRegisterStyle.text}>Password </Text>
                        <TextInput 
                            placeholder='Password' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}/>
                                <TouchableOpacity onPress={() => console.log("forget")}>
                                <Text style={loginRegisterStyle.forgetText}>Forget password?</Text>
                            </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={props.handleSubmit}
                            style={loginRegisterStyle.buttonSubmit}>
                            <Text style={loginRegisterStyle.customButtonTopText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>        
    </View>
);

}



