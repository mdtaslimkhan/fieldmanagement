import React, {useEffect, useState} from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TodoItem from '../components/todoitem';
import AddTodoInput from '../components/addtodo';
import { globalStyle } from '../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';

export default function GuestList({ navigation }) {

const [guestList, setGuestList] = useState([])
const gList = useSelector((state) => state.reducer);

useEffect(() => {
    
    if(gList != "undefined"){
        console.log("from guest list adfa: " +gList.Address);
        setGuestList((prev) => [gList, ...prev]);
    }
    
},[gList])


const pressHandle = (id) => {
    console.log(id);
  //  setPerson((personNow) => personNow.filter( v => v.id != id));
}


return (
<TouchableWithoutFeedback onPress={() => {
  Keyboard.dismiss()
  console.log("keyboard hide")
  console.log(gList.lenght);
}}>
<View style={globalStyle.container}>
  <View style={globalStyle.content}>
    
      <View style={globalStyle.list}>
        <FlatList 
          data={guestList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TodoItem item={item} pHandle={pressHandle} />
          )}
        />
      </View>
  </View>
 

</View>
</TouchableWithoutFeedback>
);

}



