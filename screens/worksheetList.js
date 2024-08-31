import React, {useEffect, useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {Text,Image, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, ToastAndroid } from 'react-native';
import { globalStyle, images } from '../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { tableStyle } from '../styles/tableStyle';
import {StyleSheet, ScrollView } from 'react-native';
import { wrokDataFetch } from '../redux/slices/worksheetSlice';
import { LoaderSpeen } from '../components/loaderSpeen';

export default function WorkSheetList({ navigation }) {
const wData = useSelector(state => state.WorkSheetReducer);
const userProfile = useSelector(state => state.LoginReducer.data);

const dispatch = useDispatch();
console.log("hello workshee data: "+JSON.stringify(wData.data));
// console.log(wData.isLoader);
// console.log(wData.isLoader);
useEffect(() => {
  navigation.setOptions({title: "Work Sheet List"});
  if(userProfile.user != null){
    dispatch(wrokDataFetch(userProfile.user.id));
  }
 // console.warn(gList);
},[])




const tabelHeader = {
  tableHead: ['Date', 'Plan', 'Presenter Name', 'Guest Name', 'Address', 'Mobile','Comment','Comment 2nd','Comment 3rd','Action'],
  widthArr: [100, 120, 160, 120, 220, 120, 120, 120, 160, 60]
}

const element = (data, rowData) => (
  // <TouchableOpacity onPress={() => navTo("WorkSheet", rowData)}>
  //   <View style={tableStyle.btn}>
  //   <AntDesign style={tableStyle.icon} name="edit"  size={25} color="green" />
  //   </View>
  // </TouchableOpacity>
   <TouchableOpacity onPress={() => 
    (rowData.is_approved == 0 || rowData.is_approved == null) ?  
    navigation.navigate("WorkSheet", { is_worksheet: 1, data: rowData})
    : ToastAndroid.show('Already requested for edit approval', ToastAndroid.SHORT) }>
      <View style={tableStyle.btn}>
        {console.log("requst data: " +rowData.is_approved)}
      { (rowData.is_approved == 0 || rowData.is_approved == null) ?
         <AntDesign style={tableStyle.icon} name="edit"  size={25} color="green" />
         :
         <AntDesign style={tableStyle.icon} name="infocirlce"  size={25} color="red" />
      }
      </View>
    </TouchableOpacity>
);


const navTo = (vl, data) => {
  navigation.navigate(vl, { data: data})
}



const RowList = () => {
  const tableData = [];
    if(wData.data){
      wData.data.map((dt) =>{
        const rowData = [dt.Date, dt.Plan, dt.Presenter_Name,dt.Guest_Name, dt.Address, dt.Mobile,
          dt.Comment, dt.Comment_2nd, dt.Comment_3rd, ''];
        tableData.push(rowData);
      });
    }
    return(
      tableData.map((rowData, index) => (
        <Row
          key={index}
          data={rowData.map((cellData, cellIndex) => (
            <Cell key={cellIndex} data={cellIndex > 0 && cellIndex === 9 ? element(cellData, wData.data[index]) : cellData} textStyle={tableStyle.bodytext}/>
          ))}
          widthArr={tabelHeader.widthArr}
          style={[tableStyle.row, index%2 && {backgroundColor: '#F7F6E7'}]}
          borderStyle={tableStyle.tableBorder}
          textStyle={tableStyle.text}
        />
      ))
      
    )
}

return (
<View style={globalStyle.container}>
  <View style={globalStyle.content}>
  { !wData.isLoader ? 
      <View style={{ padding: 8 }}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={tableStyle.tableBorder}>
              <Row data={tabelHeader.tableHead} widthArr={tabelHeader.widthArr} style={tableStyle.header} textStyle={tableStyle.text}/>
            </Table>
            <ScrollView style={tableStyle.dataWrapper}>
              <Table borderStyle={tableStyle.tableBorder}>
                {
                  <RowList />
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView> 
      </View> : <LoaderSpeen />
    }
  </View>
</View>
);

}
