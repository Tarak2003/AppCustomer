import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Image
} from 'react-native';

import Card from './card'

const MealItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
    return ( 
      <View style={styles.foodItem} >
          <Image style={styles.image} source={{ uri: props.image }} />
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>₹{props.price}</Text>
          <View style={styles.action}>
              {props.children}
          </View>
      </View>
      );
};

const styles = StyleSheet.create({
  foodItem: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
    borderRadius: 15,
    backgroundColor: '#fffafa',
    height: 315,
    margin: 12,
    overflow: 'hidden',
  },
  image: {
      width: '100%',
      height: '60%',
  },
  title: {
      fontSize: 22,
      marginVertical: 8,
      alignItems: 'center',
      justifyContent:  'center',
      textAlign: 'center'
  },
  price: {
      marginVertical: '-1%',
      fontSize: 14,
      color: '#555',
      textAlign: 'center'
  },
  action: {
      width: '75%',
      justifyContent: 'center',
      alignSelf: 'center',
      marginVertical: 10,
  },
  button: {
      width: '100%',
  }
});

export default MealItem;

/* 
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price}</Text>
            </View>
            <View style={styles.action}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  )
*/
