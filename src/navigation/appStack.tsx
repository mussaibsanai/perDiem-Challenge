import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/app/home';
import ProfileScreen from '../screens/app/profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNaviation() {
    return(
        <Tab.Navigator >
        <Tab.Screen name="Home" component={HomeScreen}  />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    )
}

function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AppTab" component={TabNaviation} options={{headerShown : false}} />
        </Stack.Navigator>
    )    
}    

export default AppStack;