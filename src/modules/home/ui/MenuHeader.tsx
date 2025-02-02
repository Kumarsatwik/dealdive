import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import React, {FC, useState} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withTiming, 
} from 'react-native-reanimated';
import {menuData} from '@utils/db';
import MenuItem from '../common/MenuItem';
import Icon from '@components/common/Icon';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '@utils/Constants';

const MenuHeader: FC<{scrollY: any}> = ({scrollY}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 80], [1, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 80], [0, -100], Extrapolate.CLAMP);
    const height = interpolate(scrollY.value, [0, 80], [100, 0], Extrapolate.CLAMP); // Adjust 100 to the initial height of your header

    return {
      opacity: withTiming(opacity, {duration: 100}), // Smooth opacity transition
      height: withTiming(height, {duration: 100}), // Smooth height transition
      transform: [{translateY: withTiming(translateY, {duration: 100})}], // Smooth translateY transition
      pointerEvents: scrollY.value > 80 ? 'none' : 'auto', // Disable interaction when collapsed
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <SafeAreaView />
      <View style={styles.flexRow}>
        {menuData.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            isFocused={focusedIndex === index}
            onSelect={() => setFocusedIndex(index)}
          />
        ))}
      </View>
      <View style={styles.addressContainer}>
        <Icon size={16} name="home" iconFamily="Ionicons" />
        <Text style={styles.homeText}>HOME</Text>
        <Text numberOfLines={1} style={styles.addressText}>
          43 High stack, Delhi, India
        </Text>
        <Icon size={16} name="chevron-forward-sharp" iconFamily="Ionicons" />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    overflow: 'hidden', // Ensure the content is clipped when height is reduced
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  homeText: {
    marginHorizontal: 5,
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: RFValue(10),
  },
  addressText: {
    flex: 1,
    color: Colors.text,
    fontSize: RFValue(9),
  },
});

export default MenuHeader;