import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Logout, useMycontextProvider } from '../Store';
import { Button, IconButton } from 'react-native-paper';
import COLORs from '../Component/COLOR';

import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Database/FirebaseConfig';
import { TouchableOpacity } from 'react-native';

const Admin = ({ navigation }) => {

    const [controller, dispatch] = useMycontextProvider();
    const { userLogin } = controller;
    const [services, setServices] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerRight: () => <IconButton
                icon="brightness-7"
                size={20}
                onPress={() => { navigation.navigate("Setting") }}
            />,
            title: userLogin.name
        })
        const serviceDoc = collection(db, "SERVICES");
        onSnapshot(serviceDoc, (
            (snapShotQuerry) => {
                var serviceData = []
                snapShotQuerry.forEach(
                    (doc) => {
                        const { name, price, time, finalTime, creator } = doc.data();
                        serviceData.push({
                            id: doc.id,
                            name: name,
                            price: price,
                            creator: creator,
                            time: time,
                            finalTime: finalTime
                        })
                    }
                )

                setServices(serviceData)
            }
        ))
    }, [])

    const renderItem = ({ item }) => {
        const { id, name, price, creator, time, finalTime } = item;

        return (
            <TouchableOpacity
                style={[styles.row, { marginTop: 5, marginBottom: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderRadius: 10 }]}
                key={id}
                onPress={() => navigation.navigate("ServiceDetail", { item: item })}
                onLongPress={() => navigation.navigate("UpdateService", { item: item })}
            >
                <View style={styles.rowLeft}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View>
                    <Text>{price}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.rowLeft}>
                    <Text style={styles.text}>DANH SÁCH DỊCH VỤ</Text>
                </View>
                <View>
                    <IconButton
                        icon={"plus-circle"}
                        iconColor={COLORs.PINK}
                        onPress={() => navigation.navigate("AddService")}
                    />
                </View>
            </View>
            <FlatList
                data={services}
                keyExtractor={(item, index) => {
                    return item.id;
                }}
                renderItem={renderItem}
            />
        </View>
    )
}

export default Admin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    row: {
        flexDirection: "row"
    },
    rowLeft: {
        flex: 1,
        justifyContent: "center",

    },
    text: {
        fontWeight: "bold"
    }

})