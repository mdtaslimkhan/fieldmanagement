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
import { targetAndAchiveFetch } from '../redux/slices/targetAndAchiveSlice';
import { LoaderSpeen } from '../components/loaderSpeen';

export default function TargetAndAchiveList({ navigation }) {
const aList = useSelector(state => state.TargetAndAchiveReducer);
const dispatch = useDispatch();
// console.log(JSON.stringify(aList.data));
useEffect(() => {
  dispatch(targetAndAchiveFetch());
},[])


navigation.setOptions({title: "Target and Achive"});

const tabelHeader = {
  tableHead: ['Sl', 'Project Prensenter', 'Seminar 1st', 'Seminar 2nd', 'Seminar 3rd', 'Seminar 4th', 'Seminar 5th', 'Personal invite', 'Member to Member', 'Personal invite with name','Action'],
  widthArr: [80, 160, 120, 120, 120, 120, 120, 180, 180 ,180,60]
}

const element = (data, rowData) => (
  <TouchableOpacity onPress={() => navTo("TargetAndAchive", rowData)}>
    <View style={tableStyle.btn}>
    <AntDesign style={tableStyle.icon} name="edit"  size={25} color="green" />
    </View>
  </TouchableOpacity>
);

const navTo = (vl, data) => {
  navigation.navigate(vl, {data: data})
}

const RowList = () => {
  const tableData = [];
  if(aList.data){
    aList.data.map((dt) =>{
      const rowData = [dt.id, dt.Totalmember, dt.Presenter,dt.Seminar, dt.Seminar1, dt.Seminar2,
        dt.Seminar3, dt.Seminar4, dt.Seminar5,dt.Personalinvite,dt.MemberToMember,dt.InviteWithName, ''];
      tableData.push(rowData);
    });
  }
    return(
      tableData.map((rowData, index) => (
        <Row
          key={index}
          data={rowData.map((cellData, cellIndex) => (
            <Cell key={cellIndex} data={cellIndex === 10 ? element(cellData, aList.data[index]) : cellData} textStyle={tableStyle.bodytext}/>
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
    { !aList.isLoader ?
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
        </View> : <LoaderSpeen />
}
  </View>
</View>
);

}
