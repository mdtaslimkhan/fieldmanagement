import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { globalStyle } from '../styles/globalStyle';


export default function TotoItem({ pHandle, item  }){
    return (
        
            <View style={globalStyle.item}>
                <Text style={globalStyle.text} >{item.slnumber}</Text>
                <Text style={globalStyle.text} >{item.Name}</Text>
                <Text style={globalStyle.text} >{item.Phone}</Text>
                <Text style={globalStyle.text} >{item.Relation}</Text>
                <Text style={globalStyle.text} >{item.Category}</Text>
                <TouchableOpacity onPress={() => pHandle(item.id)}>
                <AntDesign name="edit" size={24} color="green" />
                </TouchableOpacity>
            </View>
        
    );
}

