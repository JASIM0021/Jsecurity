/* eslint-disable prettier/prettier */
import React, { useEffect, useLayoutEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import MainScreen from './screens/Task/MainScreen';
import { Provider } from "react-redux";
import store from "./redux/store";

// setup redux

const Stack = createNativeStackNavigator();

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // let token;
  const getToken = async () => {
    // token = await AsyncStorage.getAllKeys() 
    console.log('token', token)
    const authtoken = await AsyncStorage.getItem('auth-token')
    console.log('authtoken', authtoken);
    await AsyncStorage.clear();
  
    // return authtoken;
  };
  const token=getToken();
  console.log('token',token )
  // useEffect(()=>{

  // })

  return (
    <Provider store={store}>

    <NavigationContainer>

      <Stack.Navigator initialRouteName={token ? 'Main' : 'Home'}>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>

    </NavigationContainer>
    </Provider>
  );
};

export default App;
