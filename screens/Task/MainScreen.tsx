/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import Torch from 'react-native-torch';
import axios from 'axios';
import { requestLocationPermission } from '../../permission/locationPermission';
// import {startScreenRecording,stopScreenRecording} from './RecordScreen';
import { requestStoragePermission } from '../../permission/storagePermission';
import { getLocation } from './logic/getLocation';
import { requestCameraPermission } from '../../permission/requestCameraPermission';
import { RequestAllPermission } from '../../permission/RequestAllPermission';
import { startRecording, stopRecording } from './logic/RecordScreen';
import { iosCall, andCall, getSimInfo } from "rn-direct-phone-call";
import { makeCall, sendSms } from './smallTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';
import { useSelector } from 'react-redux';
import LocationEnabler from 'react-native-location-enabler';

const {
  PRIORITIES: { HIGH_ACCURACY },
  useLocationSettings,
} = LocationEnabler;


const getIsActive = async ()=>{
  const result = await AsyncStorage.getItem('isActive');
  console.warn('resultactive', result)
  return result;
 }
 const getUser = async ():Promise<Object>=>{
  const result = await AsyncStorage.getItem('user');
  return JSON.parse(result)
 }
const getCommant =async(_id)=>{


try {
  const command = await axios.get(`${config.api_url}/api/command/${5}`);
  console.log('command', command.data?.command?.location?.status);
  return command;
} catch (error) {
  console.log('error', error)
}

}
const MainScreen = ({navigation}) => {
  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true, // default false
    },
    false /* optional: default undefined */
  );

  const isactive =getIsActive()
  const [isSecurityActive, setIsSecurityActive] = useState(isactive);
  // get userData
  // const {user}=useSelector(state=>state.globalReducer);
  const user = getUser();
  const handleSecurityToggle = () => {
    setIsSecurityActive(!isSecurityActive);
  };
  const update = async() => {
    
    let i = 0;

    setInterval(()=>{
      getLocation();
    },10000);  
    //  Torch.switchState(false);

    //  Torch.switchState(true);

    // while (i <= 100) {
    // Turn ON
    const command = (await getCommant(user?.id)).data;
    console.warn('command?.command?.isDeactive?', command?.command?.isDeactive)
    // console.warn('command?.command?.call?.status', command?.command?.call?.status);

    if(command?.command?.tourch){
     Torch.switchState(true);
     sendSms();

    }else if(!command?.command?.tourch){
     Torch.switchState(false);

    }
     if(command?.command?.call?.status){
    makeCall(command?.command?.call.number,command?.command?.call?.sim);
      
    }
    if(command?.command?.isDeactive){
      stopBg();
      
    }
     if(command?.command?.location?.status === true){
      getLocation();
    }
      
      // console.log(`Running in bg ....${i}`)
      ReactNativeForegroundService.update({
        id: 1244,

        title: "Foreground Service",
        message: "We are live World",
        icon: "ic_launcher",
        button: true,
        button2: true,
        buttonText: "Button",
        button2Text: "Anther Button",
        buttonOnPress: "cray",
        setOnlyAlertOnce: 'false',
        color: "#000000",
        progress: {
          max: 100,
          curr: i,
        },
      })

      i++;
    // }
  }
  
    ReactNativeForegroundService.add_task(() => update(), {
      delay: 5000,
      onLoop: true,
      taskId: "taskid",
      onError: (e) => console.log(`Error logging:`, e),
    });


  const handleLogout = async() => {
    // Perform logout functionality
    await AsyncStorage.clear();
    navigation.navigate('Home');

  };
  async function startForegroundService() {
    ReactNativeForegroundService.start({
      id: 1244,

      title: "Foreground Service",
      message: "We are live World",
      icon: "ic_launcher",
      button: true,
      button2: true,
      buttonText: "Button",
      button2Text: "Anther Button",
      buttonOnPress: "cray",
      setOnlyAlertOnce: 'true',
      color: "#000000",
      progress: {
        max: 100,
        curr: 10,
      },
    });
  }
  async function stopBg (){
    ReactNativeForegroundService.stopAll();
  }
  
  const saveIsActive = async ():Promise<void>=>{
    await AsyncStorage.setItem('isActive',JSON.stringify("true"));


  };
  const removeIsActive = async ():Promise<void>=>{
    await AsyncStorage.removeItem('isActive');
    stopBg();
    setIsSecurityActive(false);
  }
 
  // getIsActive();

  useEffect(()=>{
    console.log('isSecurityActive', isSecurityActive)
    RequestAllPermission();
    if ( isSecurityActive){
      saveIsActive();
      startForegroundService();
    }
    if (!isSecurityActive){
      removeIsActive();
     
    }
    
  },[isSecurityActive])
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Profile</Text>
        <View style={styles.profileCircle}>
          {/* Add profile image or initials */}
          <Text style={styles.profileInitials}>{user?.username?.toString()?.slice(0,2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.securityButton, isSecurityActive ? styles.activeSecurity : styles.inactiveSecurity]}
        onPress={handleSecurityToggle}
      >
        <Text style={styles.securityButtonText}>
          {isSecurityActive ? 'Deactivate Security' : 'Activate Security'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
     

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    marginRight: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  securityButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  activeSecurity: {
    backgroundColor: '#28a745',
  },
  inactiveSecurity: {
    backgroundColor: '#dc3545',
  },
  securityButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainScreen;
