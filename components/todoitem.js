import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { globalStyle } from '../styles/globalStyle';


export default function TotoItem({ pHandle, item  }){
    return (
        <TouchableOpacity onPress={() => pHandle(item.id)}>
            <View style={globalStyle.item}>
                <Text style={globalStyle.text} >{item.name}</Text>
                <AntDesign name="delete" size={24} color="red" />
            </View>
        </TouchableOpacity>
    );
}

