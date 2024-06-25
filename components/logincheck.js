import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "./user";
import { useNavigation } from "@react-navigation/native";


  export const UserObject = () => {
    const [user, setUser] = useState(User);
    const navigation = useNavigation();
    const data = useSelector(state => state.LoginReducer.data);
    useEffect(() => {
        // if(data){
        //     setUser(data.user);
        // }else{
        //     navigation.replace("Login");
        // }
    },[data])
  return user;
}