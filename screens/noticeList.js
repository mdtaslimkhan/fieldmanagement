import React, { useEffect, useState } from 'react';
import {Image, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import { globalStyle, images } from '../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getNoticeList } from '../redux/slices/noticeListSlice';
import { LoaderSpeen } from '../components/loaderSpeen';

export default function Notice() {
  const nList = useSelector(state => state.NoticeListReducer);
  const dispatch = useDispatch();

  // console.log(JSON.stringify(nList.data));
  const handlePress = (item) => {
    console.log(item.id)
  }

  useEffect(() => {
    dispatch(getNoticeList());
  },[]);


  const ItemTemplate = ({ item, handlePress }) => {
    return(
    <TouchableOpacity onPress={() => handlePress(item)}> 
      <View style={globalStyle.noticeItemHolder}>
        <View style={globalStyle.noticeHeader}>
          <Image style={globalStyle.noticeItemPhoto} source={images.icons[2]} />
          <View style={globalStyle.noticetitleHolder}>
            <Text style={{ fontSize: 16, fontWeight: 'bold'}}>{item.Title}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#777'}} >{item.Date}</Text>
          </View>
        </View>
        <View style={globalStyle.noticetextholder}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#777'}}>{item.Descrip}</Text>
        </View>
      </View>
    </TouchableOpacity> 
    );
  }

    return (
      <View style={globalStyle.container} >
        { !nList.isLoader ?
        <FlatList
        data={nList.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
              <ItemTemplate handlePress={handlePress} item={item} />
        )}
        /> : <LoaderSpeen />
      }    
      </View>
    );
}


