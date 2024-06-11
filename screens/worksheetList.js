import React, {useEffect, useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TodoItem from '../components/todoitem';
import AddTodoInput from '../components/addtodo';
import { globalStyle } from '../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { tableStyle } from '../styles/tableStyle';
import {StyleSheet, ScrollView } from 'react-native';

export default function WorkSheetList({ navigation }) {
const [guestList, setGuestList] = useState([])
const gList = useSelector((state) => state.reducer);

useEffect(() => {
    if(gList != "undefined"){
        console.log("from guest list adfa: " +gList.Address);
        setGuestList((prev) => [gList, ...prev]);
    } 
},[])


const tabelHeader = {
  tableHead: ['Date', 'Plan', 'Presenter Name', 'Guest Name', 'Address', 'Mobile','Comment','Comment 2nd','Comment 3rd','Action'],
  widthArr: [100, 120, 160, 120, 220, 120, 120, 120, 160, 60]
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
    for (let i = 0; i < 30; i += 1) {
      const rowData = ['12/06/2024','Work','Md Jashim ali', 'Md Sakin', 'Chittagong Road ,Siddhirganj, Narayanganj', '01922555246','Initaial work','Visit the office','Followup running',''];
      tableData.push(rowData);
    }
    return(
      tableData.map((rowData, index) => (
        <Row
          key={index}
          data={rowData.map((cellData, cellIndex) => (
            <Cell key={cellIndex} data={cellIndex === 9 ? element(cellData, index) : cellData} textStyle={tableStyle.bodytext}/>
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
        </View>
  </View>
</View>
);

}
