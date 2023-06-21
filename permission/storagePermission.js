import { PermissionsAndroid } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';

// Request storage permission
export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }
  } catch (error) {
    console.error('Error requesting storage permission:', error);
  }
};



// Call the permission request function before starting screen recording
// requestStoragePermission();
