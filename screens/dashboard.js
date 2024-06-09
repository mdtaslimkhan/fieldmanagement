import React, {useEffect, useState} from 'react';
import {Modal,Checkbox , Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';


export default function Dashboard({ navigation }) {
const val = [
{ label: 'Work list', id: 1, to: 'WorkSheetList'},
{ label: 'Guest list', id: 2, to: 'GuestList'},
{ label: 'Seminar', id: 3, to: 'SeminarList'},
{ label: 'Notice', id: 4, to: 'Notice'},
{ label: 'Target & Achive', id: 5, to: 'TargetAndAchiveList'},
{ label: 'Help Support', id: 6, to: 'HelpAndSupport'},

];
const text = useSelector((state) => state.reducer);

useEffect(() => {
 
},[text])


const DashItemLayout = ({label, to}) => {
  const navigation = useNavigation();
     return(
      <TouchableOpacity onPress={() => navigation.navigate(to)} style={globalStyle.dashItem}>
          <AntDesign name="Safety" size={30} color="#fff" />
          <Text style={globalStyle.dashItemText}>{label}</Text>
      </TouchableOpacity>
     )
}

const DashItem = () =>{
    return val.map((vl) => {
      return <DashItemLayout
              label={vl.label}
              to={vl.to}
              key={vl.id}
       />

    })
}

const DashTime = () => {
  return (
  <View style={globalStyle.dashTimeHolder} >
    <View style={globalStyle.dashTimeLabel} >
      <Text style={globalStyle.dashTime} >03</Text>
      <Text style={globalStyle.dashTimeLabel} >Days</Text>
    </View>
    <View style={globalStyle.dashTimeLabel} >
      <Text style={globalStyle.dashTime} >06</Text>
      <Text style={globalStyle.dashTimeLabel} >Hours</Text>
    </View>
    <View style={globalStyle.dashTimeLabel} >
      <Text style={globalStyle.dashTime} >20</Text>
      <Text style={globalStyle.dashTimeLabel} >Minutes</Text>
    </View>
    <View style={globalStyle.dashTimeLabel} >
      <Text style={globalStyle.dashTime} >50</Text>
      <Text style={globalStyle.dashTimeLabel} >Seconds</Text>
    </View>
  </View>)
}

const handlePress = () => {
  console.log("hello ");
  Alert.alert('New post create now', 'your post create content', [
    {text: 'Ok', onPress: () => {
      console.log('hello bd');
    }}
  ]);
}

const [modalShow, setModal] = useState(false);

const Modalviewobject = () => {
      return (
      <Modal 
      visible={modalShow}
      transparent={true}
      >
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, .6)'}}>
          <View style={{ backgroundColor: '#fff', width: '80%',paddingBottom: 20, borderRadius: 10}}>
            <AntDesign style={{textAlign: 'right', padding: 16}} name="close" size={26} color="#000" onPress={() => {setModal(false)}} />
            <Text style={{ textAlign: 'center', marginBottom: 10, fontWeight: 'bold', fontSize: 15 }}>New Post Create Now</Text>
            <NavigatePageItem page={'Work Sheet'} handleNavigate={'WorkSheet'} />
            <NavigatePageItem page={'Guest List'} handleNavigate={'GuestListCreate'} />
            <NavigatePageItem page={'Seminar'} handleNavigate={'SeminarForm'} />
            <NavigatePageItem page={'Target & Achive'} handleNavigate={'TargetAndAchive'} />
        </View>
        </View>
      </Modal>
      )
}

const NavigatePageItem = ({ page, handleNavigate }) => {
  return (
    <TouchableOpacity onPress={() => {
      setModal(false)
      navigation.navigate(handleNavigate)
      }}>
      <View style={{ backgroundColor: '#fff', padding: 16, borderWidth: 1, borderColor: '#ebebeb',width: '100%' }}>
      <Text>{page}</Text>
      </View>
    </TouchableOpacity>
  )
}


return (
<TouchableWithoutFeedback onPress={() => {
  Keyboard.dismiss()
  console.log("keyboard hide")
}}>
<View style={globalStyle.container}>
  <Modalviewobject />
  <View style={globalStyle.content}>
        <View style={globalStyle.itemTopHolder}>
        <DashTime />
        <View style={globalStyle.itemThumbHolderTop}>
          <View style={globalStyle.dashItemMember}>
              <Text style={globalStyle.dashItemText} >Total Member </Text>
              <Text style={globalStyle.dashItemText} >10 </Text>
          </View>
          <View style={globalStyle.dashItemMember}>
              <Text style={globalStyle.dashItemText}>Total Due Member </Text>
              <Text style={globalStyle.dashItemText}>30 </Text>
          </View>
        </View>
        </View>
        <View style={globalStyle.itemThumbHolder}>
          <DashItem />
        </View>
        <View style={globalStyle.itemBottomHolder}>
          
          <TouchableOpacity onPress={() => setModal(true)} style={globalStyle.bottomPlus}>
          <AntDesign name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
  </View>
 

</View>
</TouchableWithoutFeedback>
);

}



