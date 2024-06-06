import React from 'react';
import {Image, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import { globalStyle, images } from '../styles/globalStyle';

const noticeList = [
  {id: 1, title: "notice titile", date: "notice date", photo: 'url', descrip: "desrription Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet "},
  {id: 2, title: "notice titile", date: "notice date", photo: 'url', descrip: "desrription Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet "},
  {id: 3, title: "notice titile", date: "notice date", photo: 'url', descrip: "desrription Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet "},
  {id: 4, title: "notice titile", date: "notice date", photo: 'url', descrip: "desrription Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet "},
  {id: 5, title: "notice titile", date: "notice date", photo: 'url', descrip: "desrription Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet "},
  {id: 6, title: "notice titile", date: "notice date", photo: 'url', descrip: "desrription Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet "},
  {id: 7, title: "notice titile", date: "notice date", photo: 'url', descrip: "desrription Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet "},
]

export default function Notice() {

  const handlePress = (item) => {
    console.log(item.id)
  }


  const ItemTemplate = ({ item, handlePress }) => {
    return(
    <TouchableOpacity onPress={() => handlePress(item)}> 
      <View style={globalStyle.noticeItemHolder}>
        <View style={globalStyle.noticeHeader}>
          <Image style={globalStyle.noticeItemPhoto} source={images.icons[2]} />
          <View style={globalStyle.noticetitleHolder}>
            <Text style={{ fontSize: 16, fontWeight: 'bold'}}>Title Text</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#777'}} >Date</Text>
          </View>
        </View>
        <View style={globalStyle.noticetextholder}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#777'}}>desrription Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet Lorem ipsam dolor amet </Text>
        </View>
      </View>
    </TouchableOpacity> 
    );
  }

    return (
      <View style={globalStyle.container} >
        <FlatList
        data={noticeList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
              <ItemTemplate handlePress={handlePress} item={item} />
        )}
        />
      </View>
    );
}


