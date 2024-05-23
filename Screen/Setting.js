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
        <View style={styles.container}>
            {
                userLogin &&
                <View>
                    <Text style={styles.text}>Tên: {userLogin.name}</Text>
                    <Text style={styles.text}>Số Điện Thoại: {userLogin.phone}</Text>
                    <Text style={styles.text}>Email: {userLogin.email}</Text>
                    <Text style={styles.text}>Địa chỉ: {userLogin.address}</Text>
                </View>
            }
            <Button
                mode='contained'
                onPress={() => LogOut()}
                style={{ marginBottom: 10, marginTop: 10 }}
            >
                Logout
            </Button>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    text: {
        pading: 10,
        fontSize: 20,
        fontWeight: "bold"
    }
})