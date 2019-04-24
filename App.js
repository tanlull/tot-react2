import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './redux/reducers/index'

import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from "react-navigation";
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import MenuScreen from './screens/MenuScreen';
import NewsScreen from './screens/NewsScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  About: AboutScreen,
  Register: RegisterScreen,
  Login: LoginScreen
}, 
{
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#008b54',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
});
HomeStack.navigationOptions = { tabBarLabel: 'หน้าหลัก' }

const NewsStack = createStackNavigator({
  News: NewsScreen
});
NewsStack.navigationOptions = { tabBarLabel: 'ข่าวสาร' }



//Tab Navigator
const tabNavigator = createBottomTabNavigator({
   Home: HomeStack,
   News: NewsStack
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Icon;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : ''}`;
        // Sometimes we want to add badges to some icons. 
        // You can check the implementation below.
        // IconComponent = HomeIconWithBadge; 
      } else if (routeName === 'News') {
        iconName = `ios-information-circle${focused ? '' : ''}`;
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={30} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#008b54',
    inactiveTintColor: 'gray',
  },
});


//เมนูด้านข้าง
const drawerNavigator = createDrawerNavigator({
    //HomeStack,
    tabNavigator,
    Menu: MenuScreen
},{
  drawerPosition: 'left',
  contentComponent: (props) => <MenuScreen {...props} />
});

const AppContainer = createAppContainer(drawerNavigator);

const store = createStore(rootReducer);


export default class App extends React.Component {
  render() {
    return ( 
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

