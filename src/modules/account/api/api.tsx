import {BASE_URL} from '@store/config';
import axios from 'axios';

export const loginOrSignup = async (phone: string, address: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/login`, {
      phone,
      address,
    });
    return res.data.user;
  } catch (error) {
    console.log('login or signup error', error);
    return null;
  }
};

export const getOrderByUserId = async (userId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/order/${userId}`);
    console.log('res', res);
    return res.data.order;
  } catch (error) {
    console.log('getOrderByUserId error', error);
    return [];
  }
};
