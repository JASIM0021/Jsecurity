/* eslint-disable prettier/prettier */
import { requestLocationPermission } from "./locationPermission"
import { requestCameraPermission } from "./requestCameraPermission"
import { requestStoragePermission } from "./storagePermission"

export const RequestAllPermission = async ()=>{

    requestLocationPermission().then(()=>{
        requestCameraPermission().then(()=>{
            requestStoragePermission().then(()=>{
                console.log("All permissions Complete!");
            })
        })
    })
}