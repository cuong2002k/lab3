import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Stack = createMaterialBottomTabNavigator();
import Customer from '../Screen/Customer'
import AppointmentManager from '../Screen/AppointmentManager';
import Setting from '../Screen/Setting';
const CustomerRouter = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Customer'
                options={{
                    tabBarIcon: 'home',
                    tabBarLabel: 'Home'
                }}
                component={Customer}
            />
            <Stack.Screen
                name='Appoitment'
                options={{
                    tabBarIcon: 'calendar-month',
                    tabBarLabel: 'Appointment'
                }}
                component={AppointmentManager}
            />

            <Stack.Screen name="CustomerSetting"
                component={Setting}
                options={{
                    tabBarIcon: 'brightness-7',
                    tabBarLabel: 'Setting'
                }}
            />

        </Stack.Navigator>
    )
}

export default CustomerRouter