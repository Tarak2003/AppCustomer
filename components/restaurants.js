import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'

import Card from "./card";

const RestaurantList = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
    return ( 
        <View style={styles.touchable}>
          <TouchableCmp onPress={props.onSelect} useForeground>
          <View style={styles.mainCardView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.subCardView}>
              <Image
                source={{ uri: props.image }}
                resizeMode="contain"
                style={{
                  borderRadius: 25,
                  height: 50,
                  width: '20%',
                }}
              />
            </View>
            <View style={{width: '80%', alignItems:'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}>
                {props.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  margin: '0.8%',
                  fontSize: 12,
                  color:'grey'
                }}>
                {props.description}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'grey'
                }}>
                {props.location}
              </Text>
              </View>
            </View>
          </View>
          </TouchableCmp>
        </View>
    );
}

/*
<Card style={styles.product}>
<View style={styles.content}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.details}>
                  <Text style={styles.title}>{props.title}</Text>
                  <Text style={styles.location}>{props.location}</Text>
                </View>
              </View>
            </View>
      </Card>
*/

const styles = StyleSheet.create({
  product: {
    height: 200,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    marginLeft: '10%',
    width: '70%',
  },
  title: {
    fontSize: 18,
    marginVertical: 2
  },
  location: {
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  container: {
    flex: 1,
  },
  mainCardView: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RestaurantList;