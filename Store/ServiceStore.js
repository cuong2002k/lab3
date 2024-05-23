import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore"
import { db } from "../Database/FirebaseConfig"

const ServiceCol = collection(db, "SERVICES");
const DeleteService = (id) => {
    return new Promise((resolve, reject) => {
        deleteDoc(doc(db, "SERVICES", id))
            .then(() => {
                console.log(`Document with ID ${id} successfully deleted!`);
                resolve();
            })
            .catch((error) => {
                console.error(`Error removing document: ${error}`);
                reject(error);
            })
    })
}

const getAllServices = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(ServiceCol,
            (querySnapshot) => {
                const services = [];
                querySnapshot.forEach((doc) => {
                    const { creator, finalTime, name, price, time } = doc.data();
                    services.push({
                        id: doc.id,
                        creator: creator,
                        finalTime: finalTime,
                        name: name,
                        price: price,
                        time: time
                    });
                })
                resolve(services);
            },
            (error) => {
                console.error("Error getting documents: ", error);
                reject(error);
            }
        );
        
    });
};

export {
    DeleteService,
    getAllServices
}