import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllServices } from '../Store/ServiceStore';
import { TextInput } from 'react-native-paper';

const Customer = ({ navigation }) => {
    const [customer, setCustomer] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        getAllServices().then((data) => {
            setCustomer(data);
            setFilteredData(data);
        }).catch((e) => console.log(e));
    }, [])
    const handleSearch = (text) => {
        if (text == '') setFilteredData(customer);
        else {
            const filtered = customer.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };
    useEffect(() => {
        handleSearch(searchQuery)
    }, [searchQuery])

    const renderItem = ({ item }) => {
        const { id, name, price, creator, time, finalTime } = item;
        return (
            <TouchableOpacity
                style={[styles.row, { marginTop: 5, marginBottom: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderRadius: 10 }]}
                onPress={() => navigation.navigate("Appointment", { item: item })}

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
            <TextInput
                placeholder="Search..."
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
            />
            <Text>Danh sách dịch vụ</Text>
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}
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
export default Customer