import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

const RestaurantHead = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
      <View>
        <Image style={styles.image} source={{ uri: props.imageUrl }} />
        <Text style={styles.description}>{props.restaurantName}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <Text style={styles.description}>{props.location}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 300
    },
    actions: {
      marginVertical: 10,
      alignItems: 'center'
    },
    price: {
      fontSize: 20,
      color: '#888',
      textAlign: 'center',
      marginVertical: 20,
      fontFamily: 'open-sans-bold'
    },
    description: {
      fontSize: 14,
      textAlign: 'center',
      marginHorizontal: 20
    }
  });

export default RestaurantHead;