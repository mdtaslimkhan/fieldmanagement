import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import TodoItem from '../components/todoitem';
import AddTodoInput from '../components/addtodo';
import { globalStyle } from '../styles/globalStyle';

export default function Home({ navigation }) {
const val = [
{ name: 'Chun li', id: 1},
{ name: 'Chun li', id: 2},
{ name: 'Chun li', id: 3},
{ name: 'Chun li', id: 4},
{ name: 'Chun li', id: 5},
{ name: 'Chun li', id: 6},
{ name: 'Chun li', id: 7},
{ name: 'Chun li', id: 8},
{ name: 'Chun li', id: 9},
{ name: 'Chun li', id: 10},
{ name: 'Chun li', id: 11},
{ name: 'Chun li', id: 12},

];
const [name, setName] = useState('taslim') 
const [person, setPerson] = useState(val) 

const clickhandler = () => {
setName('Taslim khan salam') 
setPerson(val)
}

const pressHandle = (id) => {
console.log(id);
setPerson((personNow) => personNow.filter( v => v.id != id));
}

const submitTodoText = (text) => {
  if(text.length > 3){
    console.log(text);
      setPerson((pervPerstons) => 
        [{name: text, id: Math.random().toString()},
          ...pervPerstons])
      }else{
      Alert.alert('Opps!', 'Your text should be more than 3 charecters.',[
      { text: 'Ok', onPress: () => console.log('Click help')}
      ])
  }
}


return (
<TouchableWithoutFeedback onPress={() => {
  Keyboard.dismiss()
  console.log("keyboard hide")
}}>
<View style={globalStyle.container}>
  <View style={globalStyle.content}>
      <View style={globalStyle.inputview}>
        <AddTodoInput submitTodoText={submitTodoText} />
      </View>
      <View style={globalStyle.list}>
        <FlatList 
          data={person}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem item={item} pHandle={pressHandle} />
          )}
        />
      </View>
  </View>
  <View>
    <Button title='Go to About' onPress={() => navigation.navigate("About",{
      name: { fname: "Md taslim", lname: "khan"}, data: [1,2,3,45,6,7,8]
    })} />
  </View>

</View>
</TouchableWithoutFeedback>
);

}



