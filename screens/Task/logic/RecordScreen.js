/* eslint-disable prettier/prettier */
import ScreenRecording from 'react-native-record-screen';

export const startRecording = async () => {
  try {
    const res = await ScreenRecording.startRecording();
    console.log('Recording started');
    // You can store the recording session ID if needed
    const sessionId = res.sessionId;
    console.log('sessionId', sessionId)
  } catch (error) {
    console.error('Failed to start recording:', error);
  }
};

export const stopRecording = async () => {
  try {
    const res = await ScreenRecording.stopRecording();
    const url = res.outputURL;
    console.log('Recorded video URL:', url);
    // Call the function to send the recorded video
    // sendRecordedVideo(url);
  } catch (error) {
    console.error('Failed to stop recording:', error);
  }
};
