import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { globalStyle } from '../styles/globalStyle';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from "react-native";
import { gradiantEnd, gradiantStart, navgradiantEnd, navgradiantStart } from '../styles/styleConstants';
import { navStyle } from '../styles/navStyle';
import { useSelector } from 'react-redux';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const nav = [
    {icon: 'windowso', label: 'Dashboard', navigateTo: 'Dashboard'},
    {icon: 'Safety', label: 'Work Sheet', navigateTo: 'WorkSheetList'},
    {icon: 'Safety', label: 'Guest List', navigateTo: 'GuestList'},
    {icon: 'Safety', label: 'Target List', navigateTo: 'TargetAndAchiveList'},
    {icon: 'Safety', label: 'Seminar', navigateTo: 'SeminarList'},
    {icon: 'Safety', label: 'Notice', navigateTo: 'Notice'},
    {icon: 'Safety', label: 'Privacy', navigateTo: 'Privacy'},
    {icon: 'Safety', label: 'Help', navigateTo: 'HelpAndSupport'},
    {icon: 'Safety', label: 'Review', navigateTo: 'Review'},
    {icon: 'Safety', label: 'Profile', navigateTo: 'Profile'},
];



const DrawerLayout = ({icon, label, navigateTo}) => {
    const navigation = useNavigation();
    return(
        <DrawerItem
            icon={({color, size}) => <AntDesign name={icon} size={size} color="green" />}
            label={label}
            onPress={() => navigation.navigate(navigateTo)}
        />
    );
}

const DrawerItems = props => {
    return nav.map((el, i) => {
        return <DrawerLayout
        key={i}
        icon={el.icon}
        label={el.label}
        navigateTo={el.navigateTo}
         />
    })
}

export default function DrawerContentCustom({ props }){
    const [user, setUser] = useState({});
    const navigation = useNavigation();
    const data = useSelector(state => state.LoginReducer.data);
   // console.log(JSON.stringify(user));
    useEffect(() => {
        if(data){
            setUser(data.user);
        }
    },[data])

  



    return (
        <View style={globalStyle.container}>
            <AnimatedLinearGradient
            colors={[navgradiantStart, navgradiantEnd]}
            style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <TouchableOpacity>
                    <View style={navStyle.infoHolder} >
                        <Avatar.Image
                        style={navStyle.userImage}
                        source={{uri:''}}
                        size={50}
                        />
                        <View style={navStyle.infoTextHolder}>
                            <Text style={navStyle.text} >{user.Name}</Text>
                            <Text style={navStyle.subText} >{user.Email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <DrawerItems />
            </DrawerContentScrollView>
            <View style={navStyle.drawBottomSection}>
                <DrawerItem
                    icon={() => <AntDesign name="logout" size={24} color="green" />}
                    label="Log out"
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                />
            </View>
            </AnimatedLinearGradient>
        </View>
    );
}