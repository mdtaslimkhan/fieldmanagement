import React from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import { loginRegisterStyle } from '../screens/login/loginStyle';

const GetDateCustom = ({date, type, setOpen}) => {
    return(
      
      <View>
          <Text style={loginRegisterStyle.text}>{type} </Text>
            <TouchableOpacity 
              onPress={() => setOpen(true)}>
                <Text style={loginRegisterStyle.dateinput}>{ date } </Text>
          </TouchableOpacity>
      </View>
      
    )
  }

  module.exports = { GetDateCustom }