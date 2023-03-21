import React from 'react';
import { Platform } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons'

import AppHome from '../screens/home';
import RestaurantOverview from '../screens/search';
import UserSettings from '../screens/settings';
import RestaurantDetailsScreen from '../screens/restaurantScreen';
import AuthScreen from '../screens/login'
import IntroForm from '../screens/introForm';
import StartupScreen from '../screens/startUp';
import UserDetails from '../screens/userDetails'
import OrderScreen from '../screens/cart';
import Order from '../screens/orderScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: 'grey'
    },
    headerTintColor: 'black'
};

const ProductsNavigator = createStackNavigator({
    RestaurantOverview: RestaurantOverview,
    RestaurantScreen: RestaurantDetailsScreen,
    OrderScreen: OrderScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => ( <
            Ionicons name = { Platform.OS === 'android' ? 'md-cart' : 'ios-cart' }
            size = { 23 }
            color = { drawerConfig.tintColor }
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const UserSetting = createStackNavigator({
    UserScreen: {
        screen: UserSettings
    },
    UserDetails: {
        screen: UserDetails
    },
    Order: {
        screen: Order
    }
})

const MealsNavigator = createBottomTabNavigator({
    Home: {
        screen: AppHome,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <AntDesign name = "home"
                size = { 18 }
                color = { tabInfo.tintColor }
                / >
            }
        }
    },
    Search: {
        screen: ProductsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name = "search"
                size = { 24 }
                color = { tabInfo.tintColor }
                />
            }
        }
    },
    Settings: {
        screen: UserSetting,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <FontAwesome name = "user-circle-o"
                size = { 18 }
                color = { tabInfo.tintColor }
                / >
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'black',
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen,
    Details: IntroForm
});

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Feed: MealsNavigator
})

export default createAppContainer(MainNavigator);