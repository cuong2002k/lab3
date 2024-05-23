import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { GetAllAccount } from '../Store/index';

const CustomerManager = () => {
    const [account, setAccount] = useState([]);
    useEffect(() => {
        GetAllAccount().
            then((data) => {
                setAccount(data);
            })
            .catch((e) => console.log(e));
    }, [])
    const renderItem = ({ item }) => {
        const { email, password, name, role, phone, address } = item;
        return (
            <View style={{ padding: 10, borderWidth: 0.2, margin: 10 }}>
                <Text>{name}</Text>
                <Text>{email}</Text>
            </View>
        );
    }
    return (
        <View>
            <Text>Danh sách khách hàng</Text>
            <FlatList
                data={account}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default CustomerManager

const styles = StyleSheet.create({})