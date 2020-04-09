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
                backgroundColor: '#2d3436',
                shadowColor: 'transparent',
                borderBottomColor: '#2d3436',
            },
            // borderBottomColor: 'red',
            headerTintColor: '#fcfcfc',
            tabBarOptions: {},
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
            activeTintColor: '#ff7675',
            inactiveTintColor: '#fcfcfc',
            inactiveBackgroundColor: '#2d3436',
            activeBackgroundColor: '#3a4345',
            style: {
                backgroundColor: '#2d3436',
                borderTopColor: '#2d3436',
            },
            labelStyle: {
                paddingBottom: 5,
            },
        },
    }
);

tabNavigator.path = '';

export default tabNavigator;
