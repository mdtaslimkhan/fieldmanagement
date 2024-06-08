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

export default function TargetAndAchiveList({ navigation }) {
const [guestList, setGuestList] = useState([])
const gList = useSelector((state) => state.reducer);

useEffect(() => {
    if(gList != "undefined"){
        console.log("from guest list adfa: " +gList.Address);
        setGuestList((prev) => [gList, ...prev]);
    } 
},[])


const tabelHeader = {
  tableHead: ['Sl', 'Project Prensenter', 'Seminar 1st', 'Seminar 2nd', 'Seminar 3rd', 'Seminar 4th', 'Seminar 5th', 'Personal invite', 'Member to Member', 'Personal invite with name','Action'],
  widthArr: [80, 160, 120, 120, 120, 120, 120, 180, 180 ,180,60]
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
    for (let i = 0; i < 10; i += 1) {
      const rowData = [];
      for (let j = 0; j < 11; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
    return(
      tableData.map((rowData, index) => (
        <Row
          key={index}
          data={rowData.map((cellData, cellIndex) => (
            <Cell key={cellIndex} data={cellIndex === 10 ? element(cellData, index) : cellData} textStyle={tableStyle.bodytext}/>
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
  
<TouchableWithoutFeedback onPress={() => {
  Keyboard.dismiss()
  console.log("keyboard hide")
  console.log(gList.lenght);
}}>
<View style={globalStyle.container}>
  <View style={globalStyle.content}>
  <View style={{ padding: 8 }}>
    <TouchableOpacity onPress={() => console.log("hello")}>
    <View style={tableStyle.buttonContainer}>
      <Text style={tableStyle.tableTopButton}>May 2024</Text>
    </View>
    </TouchableOpacity>
    <View style={tableStyle.buttonContainerSecond}>
      <Text style={tableStyle.tableTopButton}>Target Member 20</Text>
      <Text style={tableStyle.tableTopButton}>Due Member 15</Text>
    </View>
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
</TouchableWithoutFeedback>
);

}
