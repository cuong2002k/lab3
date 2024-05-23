import { QuerySnapshot, addDoc, collection, onSnapshot } from "firebase/firestore"
import { db } from "../Database/FirebaseConfig"

const SaveAppointment = (name, phone, serviceName, date) => {
    addDoc(collection(db, "APPOINTMENT"), (
        {
            name: name,
            phone: phone,
            serviceName: serviceName,
            date: date,
            acp: false
        }
    )).then(() => console.log("Them lich thanh cong"))
        .catch((e) => console.log(e))
}

const getAllAppointment = () => {
    const appointmentRef = collection(db, "APPOINTMENT");
    return new Promise((resolve, reject) => {
        onSnapshot(appointmentRef,
            (querySnapshot) => {
                var arr = [];
                querySnapshot.forEach((item) => {
                    const { name,
                        phone,
                        serviceName,
                        date,
                        acp } = item.data();
                    arr.push({
                        id: item.id,
                        name: name,
                        phone: phone,
                        serviceName: serviceName,
                        date: date,
                        acp: acp
                    })
                })
                resolve(arr);
            }
        ), (err) => { reject(err) }
    })
}

export { SaveAppointment, getAllAppointment }