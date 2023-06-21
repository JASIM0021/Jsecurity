/* eslint-disable prettier/prettier */
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import config from "../../../config";

// const config = {
//   skipPermissionRequests: false,
//   authorizationLevel: 'auto',
//   locationProvider: "auto",
// };
// Geolocation.setRNConfiguration(config);

export const getLocation = async () => {
  let positionValue = null;

  Geolocation.getCurrentPosition(
    position => {
      // console.warn('position', position);

      positionValue = position;
      const {latitude, longitude, accuracy} = position.coords;
      // console.log('Latitude: ', latitude);
      // console.log('Longitude: ', longitude);
      // console.log('Accuracy: ', accuracy);
      const update = axios
        .post(`${config.api_url}/api/command`, {
          location: {
            latitude,
            longitude,
            accuracy,
          },
          cmdId: 2,
        })
        .then(res => {
          console.log("res", res?.data);
        });
    },
    error => {
      console.log("Error: ", error);
    },
    {
      timeout: 15000,
      maximumAge: 10000,
      enableHighAccuracy: true,
    },
  );
  // console.log('positionValue', positionValue)
  return positionValue;
};
