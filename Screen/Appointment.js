import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { SaveAppointment } from '../Store/AppointmentStore';
import { useMycontextProvider } from '../Store';

const Appointment = ({ route, navigation }) => {
    const { id, name, price, creator, time, finalTime } = route.params.item;
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [controller, dispatch] = useMycontextProvider();
    const { userLogin } = controller;
    const handleDateChange = (newDate) => {
        setDate(newDate);
        setOpen(false);
    };

    const HandlerAppointment = () => {
        SaveAppointment(userLogin.name, userLogin.phone, name, date.toLocaleDateString());
        navigation.navigate('Customer');
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={styles.text}>Tên dịch vụ: {name}</Text>
            <Text style={styles.text}>Giá: {price}</Text>
            <View>
                <Text style={styles.text}>Ngày: {date.toLocaleDateString()}</Text>
                <Button mode='contained' onPress={() => setOpen(true)} style={{ marginBottom: 10, marginTop: 10 }}>
                    Chọn ngày
                </Button>
                <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={open}
                    date={date}
                    onDismiss={() => setOpen(false)}
                    onConfirm={(params) => handleDateChange(params.date)}
                />
            </View>
            <Button mode='contained' onPress={() => HandlerAppointment()} style={{ marginBottom: 10, marginTop: 10 }}>
                Đặt lịch
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10
    }
})
export default Appointment
