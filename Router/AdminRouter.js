
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Admin from '../Screen/Admin';
import Transaction from '../Screen/Transaction';
import CustomerManager from '../Screen/CustomerManager';
import Setting from '../Screen/Setting';
const Stack = createMaterialBottomTabNavigator();
const AdminRouter = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Admin"
                component={Admin}
                options={{
                    tabBarIcon: 'home',
                    tabBarLabel: 'Home'
                }}
            />

            <Stack.Screen name="Transaction"
                component={Transaction}
                options={{
                    tabBarIcon: 'calendar-month',
                    tabBarLabel: 'Transaction'
                }}
            />
            <Stack.Screen name="Customer"
                component={CustomerManager}
                options={{
                    tabBarIcon: 'account',
                    tabBarLabel: 'Customer'
                }}
            />
            <Stack.Screen name="Setting"
                component={Setting}
                options={{
                    tabBarIcon: 'brightness-7',
                    tabBarLabel: 'Setting'
                }}
            />

        </Stack.Navigator>
    )
}
export default AdminRouter