import React, {useEffect, useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TodoItem from '../components/todoitem';
import AddTodoInput from '../components/addtodo';
import { globalStyle } from '../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableWrapper, Row, Cell, Col } from 'react-native-table-component';
import { tableStyle } from '../styles/tableStyle';
import {StyleSheet, ScrollView } from 'react-native';
import { targetAndAchiveFetch } from '../redux/slices/targetAndAchiveSlice';
import { LoaderSpeen } from '../components/loaderSpeen';

export default function TargetAndAchiveList({ navigation }) {
const aList = useSelector(state => state.TargetAndAchiveReducer);
const userProfile = useSelector(state => state.LoginReducer.data);

const dispatch = useDispatch();
 console.log(JSON.stringify(aList.data));
useEffect(() => {
  navigation.setOptions({title: "Target and Achive"});
  if(userProfile.user != null){
    dispatch(targetAndAchiveFetch(userProfile.user.id));
  }
},[])


const tabelHeader = {
  tableHead: ['Sl', 'Total member Target', 'Total member Achive', 'Seminar Target', 'Seminar Achive', 
    'Personal invite Target', 'Personal invite Achive', 'Member To Member Target', 'Member To Member Achive', 'Presenter Target','Presenter Achive', 'Action'],
  widthArr: [80, 160, 160, 160, 160, 160, 160, 180, 180 ,180,180, 60],

}

const element = (data, rowData) => (
  <TouchableOpacity onPress={() => (rowData.is_approved == 0 || rowData.is_approved == null) ? navigation.navigate("EditRequest", { is_worksheet: 0, data: rowData}) 
  : navTo("TargetAndAchive", rowData)}>
    <View style={tableStyle.btn}>
      {console.log("requst data: " +rowData.is_request)}
    { (rowData.is_approved == 0 || rowData.is_approved == null) ?
       <AntDesign style={tableStyle.icon} name="mail"  size={25} color="green" />
       : (rowData.is_approved == 1 ) ?
       <AntDesign style={tableStyle.icon} name="edit"  size={25} color="green" />
       :
       <AntDesign style={tableStyle.icon} name="info"  size={25} color="green" />
    }
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
      const rowData = [dt.id, dt.Totalmember_Target, dt.Totalmember_Achive,dt.Seminar_Target, dt.Seminar_Achive, dt.Personalinvite_Target,
        dt.Personalinvite_Achive, dt.MemberToMember_Target, dt.MemberToMember_Achive,dt.Presenter_Target,dt.Presenter_Achive, ''];
      tableData.push(rowData);
    });
  }
    return(
      tableData.map((rowData, index) => (
        <Row
          key={index}
          data={rowData.map((cellData, cellIndex) => (
            <Cell key={cellIndex} data={cellIndex === 11 ? element(cellData, aList.data[index]) : cellData} textStyle={tableStyle.bodytext}/>
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
              {/* <TableWrapper style={{flexDirection: 'row'}}>
                <Col data={['H1', 'H2']} style={{width: 200}} heightArr={[60, 60]} />
                <Col data={['d','p','p','p','p']} style={{backgroundColor: '#F7F6E7'}} heightArr={[30, 30, 30, 30]} ></Col>
              </TableWrapper>
              */}
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
