import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import COLORs from '../Component/COLOR'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../Database/FirebaseConfig'
import { useMycontextProvider } from '../Store'

const AddService = ({ navigation }) => {
    const [name, setName] = useState("CHĂM SÓC DA")
    const [price, setPrice] = useState('250000')
    const [controller, dispatch] = useMycontextProvider();
    const { userLogin } = controller;

    const HandleAddService = () => {
        const SERVICE = collection(db, "SERVICES")
        const currentday = new Date();
        addDoc(SERVICE, {
            creator: userLogin.name,
            name: name,
            price: price,
            time: currentday.toLocaleString(),
            finalTime: currentday.toLocaleString()
        }).then(() => {
            alert("Them dich vu thanh cong");
            setPrice("");
            setName("");
        }).catch((e) => console.log(e))
    }

    return (
        <View style={styles.container}>
            <TextInput
                label={"Service Name"}
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
            />
            <TextInput
                label={"Service Price"}
                value={price}
                onChangeText={(text) => setPrice(text)}
                style={styles.input}
            />

            <Button
                style={styles.button}
                onPress={() => HandleAddService()}
            >
                <Text style={{ color: "white" }}>Add Service</Text>
            </Button>
        </View>
    )
}

export default AddService

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10

    },
    input: {
        marginTop: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: COLORs.PINK,
        borderRadius: 10,
    }
})