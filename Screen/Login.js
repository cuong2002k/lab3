import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from 'react'
import { Button, HelperText, TextInput, IconButton } from "react-native-paper";
import { CreateAccount, LoginAccount, useMycontextProvider } from "../Store";
import COLORs from "../Component/COLOR";
const Login = ({ navigation }) => {
    const [email, onChangeEmail] = React.useState("admin@gmail.com");
    const [password, onChangePassword] = React.useState("123456789");
    const [showButton, setShowButton] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(true);
    const [controller, dispatch] = useMycontextProvider();
    const { userLogin } = controller;
    const HandleLogin = () => {
        LoginAccount(dispatch, email, password);
    }

    useEffect(() => {
        const Admin = {
            name: "admin",
            email: "admin@gmail.com",
            password: "123456789",
            role: "admin",
            phone: "012341234",
            address: "Binh Duong"
        }
        const CustomerAccount = {
            name: "customer",
            email: "customer@gmail.com",
            password: "123456789",
            role: "customer",
            phone: "012341237",
            address: "Binh Duong"
        }
        CreateAccount(Admin);
        CreateAccount(CustomerAccount);

    }, [])

    useEffect(() => {
        if (userLogin != null) navigation.navigate(userLogin.role == "admin" ? "Admin" : "Customer")
    }, [userLogin])

    useEffect(() => {
        setShowButton(!(email.includes('@') && password.length > 6));
    }, [email, password])




    const hasEmailErrors = () => {
        return !email.includes('@');
    };
    const hasPasswordError = () => {
        return password.length < 6;
    }
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.logo}  >Login</Text>
            </View>
            <View>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => onChangeEmail(text)}
                    style={styles.input}
                />
                <HelperText type="error" visible={hasEmailErrors()}>
                    Email address is invalid!
                </HelperText>
            </View>
            <View>
                <TextInput
                    mode="flat"
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => onChangePassword(text)}
                    style={styles.input}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? "eye" : "eye-off"}
                            onPress={() => setShowPassword(!showPassword)}
                        />}
                    secureTextEntry={showPassword}
                />
                <HelperText type="error" visible={hasPasswordError()}>
                    Password must have at least 6 characters
                </HelperText>
            </View>
            <Button style={styles.button}
                mode="contained"
                onPress={() => HandleLogin()}
                disabled={showButton}
            >Login</Button>

        </View>
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ccc",
        justifyContent: "center",
        padding: 20
    },
    logo: {
        margin: 20,
        color: COLORs.PINK,
        fontSize: 30,
        fontWeight: "bold"
    },
    input: {
        backgroundColor: "white",
        marginTop: 10,
        marginBottom: 10
    },
    button: {
        borderRadius: 10,
        backgroundColor: COLORs.PINK,
        marginTop: 10,
        padding: 10,
    }

});