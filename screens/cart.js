import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../components/CartItem';
import Card from '../components/card';
import * as cartActions from '../store/actions/cart';
import * as ordersAction from '../store/actions/order';

const OrderScreen = (props, getState) => {
  const [isLoading, setIsLoading] = useState(false);
  const productOwnerIds = props.navigation.getParam('productOwnerId') 
  const restaurantName = props.navigation.getParam('restaurantName')
  const user = useSelector(state => state.auth.userId)
  const cartTotalAmount = useSelector(state => state.cart.totalAmount)
  const ownersId = useSelector(state => state.cart.ownerId)

  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        quantity: state.cart.items[key].quantity,
        productPrice: state.cart.items[key].productPrice,
        productTitle: state.cart.items[key].productTitle,
        productOwnerId: state.cart.items[key].productOwnerId,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1).filter(meal => meal.productOwnerId.indexOf(productOwnerIds) >= 0)
  });
  const dispatch = useDispatch();

  const sum = cartItems.reduce((accumulator, object) => {
    const price = object.sum + accumulator
    return price
  }, 0) 

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersAction.addOrder(cartItems, sum, ownersId, restaurantName, user));
    props.navigation.navigate('Order');
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
          ₹{sum}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <Button
            color="black"
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

OrderScreen.navigationOptions = navData => {
  return {
    headerShown: true,
    headerTransparent: true,
    headerTitle: navData.navigation.getParam('restaurantName'),
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    paddingTop: 80
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontSize: 18
  },
  amount: {
    color: 'black'
  }
});

export default OrderScreen;