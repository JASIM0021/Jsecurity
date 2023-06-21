/* eslint-disable prettier/prettier */
import { PermissionsAndroid } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';

// Request storage permission
export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "JScurity need your camera permission",
        message:
          "Jsecurity needs access to your camera " +
          "so you can get the camera.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else {
      console.log('Camera permission denied');
    }
  } catch (error) {
    console.error('Error requesting Camera permission:', error);
  }
};



// Call the permission request function before starting screen recording
// requestStoragePermission();
