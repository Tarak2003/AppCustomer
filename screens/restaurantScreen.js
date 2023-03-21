import React, {useState, useCallback, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {Item, HeaderButtons} from 'react-navigation-header-buttons'

import * as itemAction from '../store/actions/item'
import MealItem from '../components/MealItem';
import * as cartActions from '../store/actions/cart'
import HeaderButton from '../components/HeaderButton';

const RestaurantDetailsScreen = props => {
  const productOwnerId = props.navigation.getParam('productOwnerId') 
  const restaurantName = props.navigation.getParam('productTitle')
  const items = useSelector(state => state.items.availableProducts.filter(meal => meal.ownerId.indexOf(productOwnerId) >= 0))
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loadRestaurants = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(itemAction.fetchProducts())
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect( async () => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadRestaurants
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadRestaurants]);

  useEffect( async () => {
    loadRestaurants();
  }, [dispatch, loadRestaurants]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadRestaurants}
          color='black'
        />
      </View>
    );
  }

  console.log(error); 

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color='black' />
      </View>
    );
  }

  if (!isLoading && items.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Sorry</Text>
        <Text>No items available</Text>
      </View>
    );
  }

  const CartHandler = (item, productOwnerId) => {
    loadRestaurants()
    dispatch(cartActions.addToCart(item))
    props.navigation.navigate('OrderScreen', {
      productOwnerId: productOwnerId,
      restaurantName: restaurantName
    })
  }

  return (
    <View>
      <View style={{paddingTop: 80}}></View>
       <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <MealItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
            >
            <View style={styles.alert}>
                <Button title="Order" onPress={() => CartHandler(itemData.item, itemData.item.ownerId)} />
            </View>
            </MealItem>
          )}
        />
    </View>
  );
};

RestaurantDetailsScreen.navigationOptions = navData => {
  return {
    headerShown: true,
    headerTransparent: true,
    headerTitle: navData.navigation.getParam('productTitle')
  };
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
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  alert: {
    alignItems: 'center',
    margin: 10
  },
});

export default RestaurantDetailsScreen;