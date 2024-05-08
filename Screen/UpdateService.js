import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { doc, updateDoc } from 'firebase/firestore'
import COLORs from '../Component/COLOR'
import { useMycontextProvider } from '../Store'
import { db } from '../Database/FirebaseConfig'

const UpdateService = ({ navigation, route }) => {
    const { id, name, price, creator, time, finalTime } = route.params.item
    const [nametxt, setName] = useState(name)
    const [pricetxt, setPrice] = useState(price)
    const [controller, dispatch] = useMycontextProvider();
    const { userLogin } = controller;

    const HandleAddService = () => {
        const currentday = new Date();
        const serviceDoc = doc(db, "SERVICES", id);
        updateDoc(serviceDoc, {
            name: nametxt,
            price: pricetxt,
            creator: userLogin.name,
            finalTime: currentday.toLocaleString()
        })
            .then(() => {
                navigation.navigate("Admin")
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    return (
        <View style={styles.container}>
            <TextInput
                label={"Service Name"}
                value={nametxt}
                onChangeText={(text) => setName(text)}
                style={styles.input}
            />
            <TextInput
                label={"Service Price"}
                value={pricetxt}
                onChangeText={(text) => setPrice(text)}
                style={styles.input}
            />

            <Button
                style={styles.button}
                onPress={() => HandleAddService()}
            >
                <Text style={{ color: "white" }}>Update Service</Text>
            </Button>
        </View>
    )
}

export default UpdateService

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