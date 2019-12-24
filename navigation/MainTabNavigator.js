import React from 'react';
import { Platform } from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LooperScreen from '../screens/LooperScreen';
import MetronomeScreen from '../screens/MetronomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import IntroScreen from '../screens/IntroScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f1c40f',
            },
            //headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            tabBarOptions: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            },
        },
    },
});

const IntroStack = createStackNavigator(
    {
        Intro: IntroScreen,
    },
    config
);

IntroStack.navigationOptions = {
    title: 'Intro',
    tabBarLabel: 'Intro',
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

IntroStack.path = '';

const LooperStack = createStackNavigator(
    {
        Looper: LooperScreen,
    },
    config
);

LooperStack.navigationOptions = {
    title: 'Looper',
    tabBarLabel: 'Looper',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-recording` : 'md-recording'}
        />
    ),
};

LooperStack.path = '';

const MetronomeStack = createStackNavigator(
    {
        Metronome: MetronomeScreen,
    },
    config
);

MetronomeStack.navigationOptions = {
    title: 'Metronome',
    tabBarLabel: 'Metronome',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-stopwatch' : 'md-stopwatch'}
            tintColor={focused ? 'red' : 'blue'}
            s
        />
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
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator(
    {
        LooperStack,
        MetronomeStack,
        IntroStack,
        SettingsStack,
    },
    {
        tabBarOptions: {
            activeTintColor: '#2c3e50',
            inactiveTintColor: '#ecf0f1',
            inactiveBackgroundColor: '#485460',
            activeBackgroundColor: '#7f8c8d',
            style: {
                backgroundColor: '#485460',
                borderTopColor: '#605F60',
            },
        },
    }
);

tabNavigator.path = '';

export default tabNavigator;
