import {Platform} from 'react-native';

// For emulator and physical device
export const BASE_URL =
  Platform.OS === 'android'
    ? 'https://3fa0-139-5-11-142.ngrok-free.app'
    : 'http://localhost:4000';
