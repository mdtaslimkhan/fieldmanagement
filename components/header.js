import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyle } from '../styles/globalStyle';



export default function Header(){
    return (
        <View style={globalStyle.statusbar}>
            <Text style={globalStyle.title}>Quality Group</Text>
        </View>
    );
}
