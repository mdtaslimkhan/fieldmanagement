import React from 'react';
import {StyleSheet,Image, Text, View } from 'react-native';
import {images, globalStyle } from '../styles/globalStyle';



export default function LoaderSpeen(){
    return (
        <View style={globalStyle.loaderHolder}>
            <View style={globalStyle.loaderSubHolder}>
                <Image style={globalStyle.loaderStyle} source={images.icons['loader']} />
            </View>
        </View>
    );
}


