import React, {useEffect, useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { tableStyle } from '../styles/tableStyle';
import {StyleSheet, ScrollView } from 'react-native';
import { getSeminarList } from '../redux/slices/seminarListSlice';
import LoaderSpeen from '../components/loaderSpeen';

export default function SeminarList({ navigation }) {
const sList = useSelector((state) => state.SeminarListReducer);
const dispatch = useDispatch();

console.log(JSON.stringify(sList));
useEffect(() => {
    dispatch(getSeminarList());
},[])


const tabelHeader = {
  tableHead: ['Sl', 'Date','Host', 'Upazila', 'Village', 'Time', 'Presenter Name','Action'],
  widthArr: [80, 120,120, 160, 120, 80, 120, 80]
}


const element = (data, index) => (
  <TouchableOpacity onPress={() => console.log(data)}>
    <View style={tableStyle.btn}>
    <AntDesign style={tableStyle.icon} name="edit"  size={25} color="green" />
    </View>
  </TouchableOpacity>
);

const RowList = () => {
  const tableData = [];
  if(sList.data){
    sList.data.map((dt) =>{
      const rowData = [dt.id, dt.Date, dt.HostName, dt.Upazila,dt.Village,dt.Time, dt.Presenter,''];
      tableData.push(rowData);
    });
  }
    return(
      tableData.map((rowData, index) => (
        <Row
          key={index}
          data={rowData.map((cellData, cellIndex) => (
            <Cell key={cellIndex} data={cellIndex === 7 ? element(cellData, index) : cellData} textStyle={tableStyle.bodytext}/>
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
    { !sList.isLoader ?
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
