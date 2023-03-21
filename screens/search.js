import React, {useEffect, useState, useCallback} from "react";
import {FlatList, Button, View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import RestaurantList from '../components/restaurants'
import * as restaurantAction from '../store/actions/restaurant'

const RestaurantOverview = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const restaurant = useSelector(state => state.restaurant.availableProducts)
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(restaurantAction.fetchProducts());
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }, [dispatch, setIsLoading, setError]);
    
      useEffect(() => {
        const willFocusSub = props.navigation.addListener(
          'willFocus',
          loadProducts
        );
    
        return () => {
          willFocusSub.remove();
        };
      }, [loadProducts]);
    
      useEffect(() => {
        loadProducts();
      }, [dispatch, loadProducts]);

    const SelectItemHandler = (id, ownerId, restaurantName, imageUrl, location, description) => {
      props.navigation.navigate('RestaurantScreen', { 
        productId: id,
        productOwnerId: ownerId,
        productTitle: restaurantName,
        productImage: imageUrl,
        productLocation: location,
        productDescription: description 
      });
    }
    
      if (isLoading) {
        return (
          <View style={style.centered}>
            <ActivityIndicator size="large" color='black' />
          </View>
        );
      }

      if (error) {
        return (
          <View style={style.centered}>
            <Text>An error occurred!</Text>
            <Button
              title="Try again"
              onPress={loadProducts}
              color='black'
            />
          </View>
        );
      }
      console.log(error);
    
      if (!isLoading && restaurant.length === 0) {
        return (
          <View style={style.centered}>
            <Text>Sorry</Text>
            <Text>No restaurants found in your area</Text>
          </View>
        );
      }
      
    return (
    <View>
    <View style={{paddingTop: 60}}></View>
    <FlatList 
        data={restaurant} 
        keyExtractor={item => {return item.id}}
        renderItem={(itemData) => 
        <RestaurantList 
            image={itemData.item.imageUrl} 
            title={itemData.item.restaurantName} 
            location={itemData.item.location} 
            description={itemData.item.description}
            onSelect={() => {
            SelectItemHandler(itemData.item.id, itemData.item.ownerId, itemData.item.restaurantName, itemData.item.imageUrl, itemData.item.location, itemData.item.description);
            }}
        >
        </RestaurantList>} 
    />
    </View>
    ); 
};

RestaurantOverview.navigationOptions = navData => {
  return {
      headerTransparent: true,
      headerTitle: ''
  }
  
}

const style = StyleSheet.create({
    alert: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    centered: {
       flex: 1, justifyContent: 'center', alignItems: 'center' 
    }
}) 

export default RestaurantOverview; 