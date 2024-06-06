import React, {useEffect, useState} from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TodoItem from '../components/todoitem';
import AddTodoInput from '../components/addtodo';
import { globalStyle } from '../styles/globalStyle';
import { useSelector } from 'react-redux';

export default function TargetList({ navigation }) {
const val = [
{ name: 'Chun li', id: 1},

];
const [person, setPerson] = useState(val)
const text = useSelector((state) => state.reducer);

useEffect(() => {
  if(text != 'undefined'){
    if(text.length > 3){
        setPerson((pervPerstons) => 
          [{name: text, id: Math.random().toString()},
            ...pervPerstons])
        }else{
          Alert.alert('Opps!', 'Your text should be more than 3 charecters.',[
        { text: 'Ok', onPress: () => console.log('Click help')}
        ])
    }
  }
},[text])


const pressHandle = (id) => {
console.log(id);
setPerson((personNow) => personNow.filter( v => v.id != id));
}


return (
<TouchableWithoutFeedback onPress={() => {
  Keyboard.dismiss()
  console.log("keyboard hide")
}}>
<View style={globalStyle.container}>
  <View style={globalStyle.content}>
      <View style={globalStyle.inputview}>
        <AddTodoInput />
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



