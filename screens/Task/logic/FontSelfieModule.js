/* eslint-disable prettier/prettier */
import { NativeModules } from 'react-native';

const { FontSelfieModule } = NativeModules;

export const takeFontSelfie = () => {
  FontSelfieModule.takeFontSelfies()
  .then((bitmap) => {
    // Handle the captured bitmap (image) here
    console.log('bitmap', bitmap)
    // You can store it in your database or perform any desired operations
  })
  .catch((error) => {
    // Handle the error
    console.log('error', error)
  });
};


