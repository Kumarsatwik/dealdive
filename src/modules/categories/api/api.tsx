import {BASE_URL} from '@store/config';
import axios from 'axios';

export const fetchCategoriesData = async () => {
  console.log('fetchapi', BASE_URL);
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    console.log('response', response.data);
    return response.data?.categories;
  } catch (error) {
    console.log('error fetch api', error);
  }
};
