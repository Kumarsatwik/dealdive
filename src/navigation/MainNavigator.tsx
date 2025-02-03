import {Platform, Animated, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '@utils/Constants';
import Home from '@modules/home';
import Categories from '@modules/categories';
import Cart from '@modules/cart';
import Account from '@modules/account';
import {AccountIcon, CartIcon, CategoriesIcon, HomeIcon} from './TabIcons';
import {useAppSelector} from '@store/reduxHook';
import {selectTotalItemsInCart} from '@modules/cart/api/slice';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const count = useAppSelector(selectTotalItemsInCart);
  const renderHomeIcon = ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => <HomeIcon focused={focused} color={color} size={size} />;

  const renderCategoryIcon = ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => <CategoriesIcon focused={focused} color={color} size={size} />;

  const renderAccountIcon = ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => <AccountIcon focused={focused} color={color} size={size} />;

  const renderCartIcon = ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => <CartIcon focused={focused} color={color} size={size} />;

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.active,
        tabBarInactiveTintColor: Colors.inactive,
        lazy: true,
        tabBarStyle: {
          paddingTop: Platform.OS === 'android' ? 0 : 10,
          height: 60,
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: '#FFFFFF',
        },
        tabBarButton: props => <AnimatedTabButton {...props} />,
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: renderCategoryIcon,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: renderAccountIcon,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: renderCartIcon,
          tabBarBadge: count > 0 ? count : undefined,
          tabBarBadgeStyle: {
            height: 16,
            width: 16,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AnimatedTabButton: React.FC<any> = props => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (props.accessibilityState?.selected) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 0.92,
          tension: 50,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 1,
            tension: 50,
            friction: 4,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [props.accessibilityState?.selected, scale, opacity]);

  const buttonProps = {
    ...props,
    delayLongPress: props.delayLongPress as number | undefined,
  };

  return (
    <TouchableOpacity {...buttonProps} activeOpacity={1}>
      <Animated.View
        style={{
          transform: [{scale}],
          opacity,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          paddingVertical: 8,
        }}>
        {props.children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default MainNavigator;
