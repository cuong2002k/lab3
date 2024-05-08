import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { Icon, IconButton } from 'react-native-paper';

const ServiceDetails = ({ route, navigation }) => {
    const { id, name, price, creator, time, finalTime } = route.params.item;
    const [showMenu, setShowMenu] = useState(true);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (

                <MenuProvider>
                    <Menu onSelect={value => alert(`Selected number: ${value}`)} >
                        <MenuTrigger>
                            <Icon icon="close"
                                size={20} />
                        </MenuTrigger>
                        <MenuOptions >

                            <MenuOption value={true} text='yes' />
                            <MenuOption value={false}>
                                <Text style={{ color: 'no' }}>Two</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </MenuProvider>
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

const styles = StyleSheet.create({})