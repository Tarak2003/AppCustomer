import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import CartItem from './CartItem';
import Card from './card';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.header}>
        <Text style={styles.heading}>{props.restaurantName}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>₹{props.amount.toFixed(2)}</Text>
      </View>
      <Button
        color='black'
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              restaurantName={cartItem.restaurantName}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    fontSize: 16
  },
  date: {
    fontSize: 16,
    color: '#888'
  },
  detailItems: {
    width: '100%'
  },
  heading: {
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom: 7,
    fontSize: 22
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }
});

export default OrderItem;
