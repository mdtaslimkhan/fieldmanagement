import React, {useEffect, useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { tableStyle } from '../styles/tableStyle';
import {StyleSheet, ScrollView } from 'react-native';
import { guestDataFetch } from '../redux/slices/guestListSlice';
import { LoaderSpeen } from '../components/loaderSpeen';
import { useNavigation } from '@react-navigation/native';


export default function GuestList({ navigation }) {
const gList = useSelector(state => state.GuestListReducer);
const dispatch = useDispatch();
// console.log("====================================");
// console.log(JSON.stringify(gList.data));
useEffect(() => {
    dispatch(guestDataFetch());
},[])


const tabelHeader = {
  tableHead: ['Sl', 'Name', 'Address', 'Mobile No', 'Relation', 'Category','Action'],
  widthArr: [80, 120, 160, 120, 80, 80, 80]
}

const navTo = (vl, data) => {
  navigation.navigate(vl, { data : data })
}


const element = (data, index, rowData) => (
  <TouchableOpacity onPress={() => navTo("GuestListCreate", rowData)}>
    <View style={tableStyle.btn}>
    <AntDesign style={tableStyle.icon} name="edit"  size={25} color="green" />
    </View>
  </TouchableOpacity>
);

const RowList = () => {
  const tableData = [];
  if(gList.data){
    gList.data.map((dt) =>{
      const rowData = [dt.id, dt.Name, dt.Address, dt.Mobile,dt.Relation, dt.Category, ''];
      tableData.push(rowData);
    });
  }
    return(
      tableData.map((rowData, index) => (
        <Row
          key={index}
          data={rowData.map((cellData, cellIndex) => (
            <Cell key={cellIndex} data={cellIndex === 6 ? element(cellData, index, gList.data[index]) : cellData} textStyle={tableStyle.bodytext}/>
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
    { !gList.isLoader ? 
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
