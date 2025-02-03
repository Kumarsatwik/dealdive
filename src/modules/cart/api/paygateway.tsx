import {navigate} from '@navigation/NavigationUtil';
import {BASE_URL} from '@store/config';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';

export const createTransaction = async (amount: number, userId: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/order/transaction`, {
      userId,
      amount: amount * 100,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const createOrder = async (
  key: string,
  amount: number,
  order_id: string,
  cart: any,
  userId: string,
  address: string,
) => {
  try {
    let options = {
      description: 'Ecommerce Shopping',
      image:
        'https://i.postimg.cc/sxyyRLpC/fe159daf-f336-4e59-84b1-c5912233c10c.png',
      currency: 'INR',
      key: key,
      amount: amount,
      name: 'DealDive',
      order_id: order_id,
      theme: {
        color: '#53a20e',
      },
    };

    RazorpayCheckout.open(options)
      .then(async data => {
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
        const formattedSevenDays = sevenDaysFromNow.toISOString();
        try {
           await axios.post(`${BASE_URL}/order`, {
            razorpay_order_id: order_id,
            razorpay_payment_id: data?.razorpay_payment_id,
            razorpay_signature: data?.razorpay_signature,
            userId: userId,
            cartItems: cart,
            deliveryDate: formattedSevenDays,
            address: address,
          });
          navigate('PaymentSuccess', {
            price: amount / 100,
            address: address,
          });
        } catch (error) {
          console.log('order place error', error);
          navigate('PaymentFailed', {
            message: 'Failed to place order',
          });
        }
      })
      .catch((err: any) => {
        console.log('RazorpayCheckout error', err);
        return {type: 'error', message: err?.description};
      });
  } catch (error) {
    console.log('error creating orders : ', error);
    return {type: 'error', message: 'Error'};
  }
};
