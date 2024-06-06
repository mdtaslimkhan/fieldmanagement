import React from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import { globalStyle } from '../styles/globalStyle';


export default function About() {
    return (
      <View>
        <Text style={globalStyle.text}>About page </Text>
        <Button title='Go to Products' onPress={() => navigation.navigate("Products")} />
      </View>
    );
}


