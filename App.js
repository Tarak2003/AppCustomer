import React from 'react';
import { configureStore } from '@reduxjs/toolkit'
import {Provider} from 'react-redux'

import NavigationContainer from './navigation/navigator';
import restaurantReducer from './store/reducers/restaurant'
import itemsReducer from './store/reducers/items'
import userReducer from './store/reducers/userDetails'
import authReducer from './store/reducers/auth'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/order'

const store = configureStore({
  reducer:{
    restaurant: restaurantReducer,
    items: itemsReducer,
    user: userReducer,
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}