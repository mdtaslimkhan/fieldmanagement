import React from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import { globalStyle } from '../styles/globalStyle';


export default function Review() {
    return (
      <View style={{ justifyContent: 'center' , alignItems: 'center', flex: 1}}>
      <Text style={globalStyle.text}>Review page </Text>
    </View>
    );
}


