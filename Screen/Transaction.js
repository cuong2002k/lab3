import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllAppointment } from '../Store/AppointmentStore';
import { FlatList } from 'react-native';

const Transaction = () => {
  const [appointment, setAppointment] = useState([]);
  useEffect(() => {
    getAllAppointment()
      .then((data) => {
        setAppointment(data);
        console.log(data)
      })
      .catch(e => console.log(e));
  }, [])

  const renderItem = ({ item }) => {
    const {
      id,
      name,
      phone,
      serviceName,
      date,
      acp } = item;
    return (
      <View style={{ padding: 10, margin: 5, borderWidth: 0.4, borderRadius: 10 }}>
        <Text>Tên: {name}</Text>
        <Text>Số điện thoại: {phone}</Text>
        <Text>Tên dịch vụ: {serviceName}</Text>
        <Text>Ngày đặt: {date}</Text>
        <Text>Trạng thái: {!acp ? "Chờ xác nhận" : "Đã xác nhận"} </Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Danh sách lịch hẹn</Text>
      <FlatList
        data={appointment}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Transaction