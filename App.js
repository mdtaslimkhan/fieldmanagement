import React, { useEffect } from 'react';
import Review from './screens/review';
import Dashboard from './screens/dashboard';
import Products from './screens/products';
import WorkSheet from './screens/worksheet/worksheet';
import TargetAndAchive from './screens/targetandachive';
import GuestListCreate from './screens/guestlistCreate';
import GuestList from './screens/guesList';
import Notice from './screens/noticeList';
import SeminarList from './screens/seminarList';
import WorkSheetList from './screens/worksheetList';
import TargetAndAchiveList from './screens/targetAndAchiveList';
import HelpAndSupport from './screens/helpSupport';
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
import Privacy from './screens/privacy';
import * as Updates from 'expo-updates';

AppRegistry.registerComponent('main', () => App);

export default function App() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
   // onFetchUpdateAsync();
  },[]);


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
  initialRouteName="Login"> 
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
    <Stack.Screen name="TargetAndAchiveList" component={TargetAndAchiveList} />
    <Stack.Screen name="GuestListCreate" component={GuestListCreate} />
    <Stack.Screen name="GuestList" component={GuestList} />
    <Stack.Screen name="SeminarForm" component={SeminarForm} />
    <Stack.Screen name="SeminarList" component={SeminarList} />
    <Stack.Screen name="WorkSheetList" component={WorkSheetList} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Privacy" component={Privacy} />
    <Stack.Screen name="Review" component={Review} />
    <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
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


