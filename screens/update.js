import React from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import { globalStyle } from '../styles/globalStyle';
import * as Updates from 'expo-updates';

export default function AppUpdate() {

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

    return (
      <View style={{ justifyContent: 'center' , alignItems: 'center', flex: 1}}>
        <Text style={globalStyle.text}>Support page </Text>
        <Text style={globalStyle.text}>Version 1.5.3 </Text>
        <TouchableOpacity style={globalStyle.item} onPress={() => onFetchUpdateAsync()}>
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    );
}


