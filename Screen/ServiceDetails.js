import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { Icon } from 'react-native-paper';
import { DeleteService } from '../Store/ServiceStore';


const ServiceDetails = ({ route, navigation }) => {
    const { id, name, price, creator, time, finalTime } = route.params.item;

    const HanderDeleteService = () => {
        DeleteService(id).then(() => {
            navigation.navigate('Admin')
        }).catch(() => {
            console.log("Error delete")
        })
    }
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Menu>
                    <MenuTrigger>
                        <Icon source="delete" size={20} />
                    </MenuTrigger>
                    <MenuOptions style={styles.menu}>
                        <MenuOption onSelect={() => {
                            HanderDeleteService()
                        }} text='Yes' />
                        <MenuOption onSelect={() => alert('No')} text='No' />
                    </MenuOptions>
                </Menu>
            ),
        })
    }, [])
    return (
        <View>
            <Text>Service name: {name}</Text>
            <Text>Price: {price}</Text>
            <Text>Time: {time}</Text>
            <Text>finalTime: {finalTime}</Text>
            <Text>Creator: {creator}</Text>
        </View>


    )
}

export default ServiceDetails

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        justifyContent: 'center',
        alignContent: "center"
    }
})