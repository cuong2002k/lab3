import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Button } from 'react-native-paper'
import { Logout } from '../Store';
import { useMycontextProvider } from '../Store'
const Setting = ({ navigation }) => {
    const [controller, dispatch] = useMycontextProvider();
    const { userLogin } = controller;
    const LogOut = () => {
        Logout(dispatch)
    }
    useEffect(() => {
        if (!userLogin) navigation.navigate("Login")
    }, [userLogin])
    return (
        <View>
            <Button
                mode='contained'
                onPress={() => LogOut()}
            >
                Logout
            </Button>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({})