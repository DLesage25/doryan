import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MetronomeScreen from '../screens/MetronomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import IntroScreen from '../screens/IntroScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const IntroStack = createStackNavigator(
  {
    Intro: IntroScreen
  },
  config
)

IntroStack.navigationOptions = {
  tabBarLabel: 'Intro',
  tabBarIcon: ({focused}) => {
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  }
}

IntroStack.path = '';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const MetronomeStack = createStackNavigator(
  {
    Metronome: MetronomeScreen,
  },
  config
);

MetronomeStack.navigationOptions = {
  tabBarLabel: 'Metronome',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

MetronomeStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MetronomeStack,
  IntroStack,
  HomeStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
