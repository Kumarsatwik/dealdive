import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, { FC } from 'react';
import CustomSafeAreaView from '@components/common/CustomSafeAreaView';
import {useAppSelector} from '@store/reduxHook';
import {selectCartItems} from './api/slice';
import {navigate} from '@navigation/NavigationUtil';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '@utils/Constants';
import OrderItems from './common/OrderItems';
import PlaceOrderButton from './common/PlaceOrderButton';

const Cart:FC = () => {
  const carts = useAppSelector(selectCartItems);
  const user = useAppSelector(state => state.account.user) as any;

  const renderItem = ({item}: any) => <OrderItems item={item} />;

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Text style={styles.heading}>My Cart</Text>
        <Text style={styles.number}>
          Deliver to : {user?.phone ? user?.phone : ''}
        </Text>

        <Text style={styles.address}>
          Deliver to:{' '}
          {user?.address ? user?.address : 'Login first to place your orders'}
        </Text>
      </View>
      {carts.length > 0 ? (
        <FlatList
          data={carts}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopNowButton}
            onPress={() => navigate('Categories')}>
            <Text style={styles.shopNowText}>Show now</Text>
          </TouchableOpacity>
        </View>
      )}
      {carts.length > 0 && <PlaceOrderButton />}
    </CustomSafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  number: {
    fontWeight: '500',
  },
  address: {
    color: '#666',
    marginTop: 3,
  },
  container: {
    padding: 16,
    borderBottomWidth: 5,
    borderColor: '#F0F2F5',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: RFValue(14),
    color: '#666',
    marginBottom: 16,
  },
  shopNowButton: {
    backgroundColor: Colors.active,
    padding: 10,
  },
  shopNowText: {
    fontSize: RFValue(12),
    color: '#fff',
    fontWeight: '500',
  },
  listContainer: {
    paddingTop: 8,
    paddingBottom: 100,
  },
});
