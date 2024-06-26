import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../Screen/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { useMycontextProvider } from '../Store';
import Admin from '../Screen/Admin';
import Customer from '../Screen/Customer';
import COLORs from '../Component/COLOR';
import AddService from '../Screen/AddService';
import ServiceDetails from '../Screen/ServiceDetails';
import UpdateService from '../Screen/UpdateService';
import Setting from '../Screen/Setting'
import AdminRouter from './AdminRouter';
import Appointment from '../Screen/Appointment';
import CustomerRouter from './CustomerRouter';

const Stack = createStackNavigator();
const MyRouter = () => {

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login}
                options={{
                    headerStyle: { backgroundColor: COLORs.PINK }
                }} />
            <Stack.Screen name="Admin" component={AdminRouter}
                options={{
                    headerStyle: { backgroundColor: COLORs.PINK }
                }}
            />
            <Stack.Screen name="Customer" component={CustomerRouter}

                options={{
                    headerStyle: { backgroundColor: COLORs.PINK }
                }}
            />

            <Stack.Screen name='AddService' component={AddService}
                options={{
                    headerStyle: { backgroundColor: COLORs.PINK }
                }}

            />
            <Stack.Screen name='ServiceDetail' component={ServiceDetails}
                options={{
                    headerStyle: { backgroundColor: COLORs.PINK }
                }}
            />

            <Stack.Screen name='UpdateService' component={UpdateService}
                options={{
                    headerStyle: { backgroundColor: COLORs.PINK }
                }}
            />

            <Stack.Screen name='Appointment' component={Appointment}
                options={{
                    headerStyle: { backgroundColor: COLORs.PINK }
                }}
            />

        </Stack.Navigator>
    )
}

export default MyRouter
