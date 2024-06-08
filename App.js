import React from 'react';
import About from './screens/about';
import Dashboard from './screens/dashboard';
import Products from './screens/products';
import WorkSheet from './screens/worksheet/worksheet';
import TargetAndAchive from './screens/targetandachive';
import GuestListCreate from './screens/guestlistCreate';
import GuestList from './screens/guesList';;
import Notice from './screens/noticeList';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import DrawerContentCustom from './components/drawerContent';
import Login from './screens/login/login';
import SeminarForm from './screens/seminar';
import Profile from './screens/profile';
import { AppRegistry } from 'react-native';

AppRegistry.registerComponent('main', () => App);

export default function App() {
  return (
    <Provider store={store} >
      <AppHolder />
    </Provider>
  );
}

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return(
  <Stack.Navigator screenOptions={{
    statusBarColor: 'green',
    headerStyle: {
      backgroundColor: 'green'
    },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    
  }} 
  // Dashboard will be initial
  initialRouteName="Dashboard">
    {/* // header left we can use direct in stack navigation with screenOptions and also can use only one screen too */}
    <Stack.Screen name="Dashboard" component={Dashboard} options={{
      headerLeft: () => {
        return(
        <AntDesign 
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        name="windowso" 
        size={24} 
        color="white" />
        );
      }
    }} />
    <Stack.Screen name="WorkSheet" component={WorkSheet} />
    <Stack.Screen name="TargetAndAchive" component={TargetAndAchive} />
    <Stack.Screen name="GuestListCreate" component={GuestListCreate} />
    <Stack.Screen name="GuestList" component={GuestList} />
    <Stack.Screen name="SeminarForm" component={SeminarForm} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="About" component={About} />
    <Stack.Screen name="Products" component={Products} />
    <Stack.Screen name="Notice" component={Notice} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
  );
}
const DrawNavigation = () => {
  const Drawer = createDrawerNavigator();
  return(
    <Drawer.Navigator screenOptions={{
      headerShown: false,
    }}
    drawerContent={(props) => <DrawerContentCustom {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={StackNav} />
    </Drawer.Navigator>
  );
}

function AppHolder() {
    return (
      <NavigationContainer>
        <DrawNavigation />
      </NavigationContainer>
    );
}


