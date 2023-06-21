/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line prettier/prettier
import axios from 'axios';
// eslint-disable-next-line prettier/prettier
import { NativeModules } from 'react-native';

const { SendSmsModule } = NativeModules;
import { andCall,getSimInfo } from 'rn-direct-phone-call';

/* eslint-disable prettier/prettier */
export const makeCall = async(number:string,index:number):Promise<void>=>{
  console.warn('getSimInfo()', getSimInfo.name);
    andCall(number,index);
};
export const sendSms=async()=>{
  console.warn('Message test ',)
  SendSmsModule.sendSms('9153374335', 'Hello, this is a test message!');
}


