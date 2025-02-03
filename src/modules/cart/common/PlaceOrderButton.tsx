import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppSelector} from '@store/reduxHook';
import {selectCartItems, selectTotalCartPrice} from '../api/slice';
import LoginModal from '@modules/account/ui/LoginModal';
import {createOrder, createTransaction} from '../api/paygateway';

const PlaceOrderButton = () => {
  const price = useAppSelector(selectTotalCartPrice);
  const user = useAppSelector(state => state.account.user) as any;
  const carts = useAppSelector(selectCartItems);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    const data = await createTransaction(price, user?._id);
    if (data) {
      const order = await createOrder(
        data?.key,
        data?.amount,
        data?.order_id,
        carts,
        user?._id,
        user?.address,
      );
      setLoading(false);
      if (order?.type === 'error') {
        Alert.alert('Payment Failed');
      }
    } else {
      setLoading(false);
      Alert.alert('There was an error');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.strikePrice}>₹{price + 1200}</Text>₹
          <Text style={styles.price}>₹{price}</Text>
        </View>
        <TouchableOpacity
          disabled={loading}
          style={styles.button}
          onPress={() => {
            if (user) {
              handlePlaceOrder();
            } else {
              setIsVisible(true);
            }
          }}>
          {loading ? (
            <ActivityIndicator color="black" size="small" />
          ) : (
            <Text style={styles.btnText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>
      {isVisible && (
        <LoginModal visible={isVisible} onClose={() => setIsVisible(false)} />
      )}
    </>
  );
};

export default PlaceOrderButton;

const styles = StyleSheet.create({
  strikePrice: {
    fontSize: RFValue(11),
    color: '#888',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: RFValue(16),
    color: '#000',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#FFC201',
    padding: 10,
    borderRadius: 6,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btnText: {
    color: '#222',
    fontWeight: '600',
    fontSize: RFValue(13),
  },
  container: {
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 2,
    borderColor: '#f0f2f5',
    width: '100%',
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
});
