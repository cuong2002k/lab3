
import { createContext, useContext, useMemo, useReducer, useState } from 'react'
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../Database/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
const MyContext = createContext();
MyContext.displayName = "MyStore";

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userLogin: action.value }
        case "LOGOUT":
            return { ...state, userLogin: null }
        default: {
            throw new Error("Action not valid");
        }
    }
}

const MyContextControllerProvider = ({ children }) => {
    const initializeState = {
        userLogin: null,
        jobs: []
    }

    const [controller, dispatch] = useReducer(reducer, initializeState);
    const value = useMemo(() => [controller, dispatch], [controller, dispatch])
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

const useMycontextProvider = () => {
    const context = useContext(MyContext)
    if (!context) {
        return new Error("useMycontextProvider must put in MyContextControllerProvider")
    }
    return context;
}

const USERS = collection(db, "USERS")


const CreateAccount = ({ email, password, name, role, phone, address }) => {
    var USERDoc = doc(db, "USERS", email);
    onSnapshot(USERDoc, (
        user => {
            if (!user.exists()) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((user) => {
                        alert("Create with user and password success");
                        var USERDoc = doc(db, "USERS", email);
                        setDoc(USERDoc, {
                            email,
                            password,
                            name,
                            role,
                            phone,
                            address
                        }).then(() => console.log("add new document"))
                            .catch((e) => console.log(e))

                    })
                    .catch((e) => console.log(e))
                console.log("Create")
            }
            console.log(!user.exists())
        }
    ))

}

const LoginAccount = (dispatch, email, password, fullname) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(
            () => {
                var USERDoc = doc(db, "USERS", email);
                onSnapshot(USERDoc, (
                    user => {
                        if (user.exists) {
                            console.log("Dang Nhap Thanh Cong");
                            dispatch({ type: "USER_LOGIN", value: user.data() })
                        }
                    }
                ))
            }
        )
        .catch((e) => console.log(e))
}

const Logout = (dispatch) => {
    signOut(auth).then(() => dispatch({ type: "LOGOUT" }))
}


const GetAllAccount = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(USERS,
            (querySnapshot) => {
                var arrAccount = [];
                querySnapshot.forEach((item) => {
                    const { email, password, name, role, phone, address } = item.data();
                    if (role !== 'admin') {
                        arrAccount.push({
                            id: item.id,
                            email: email,
                            password: password,
                            name: name,
                            role: role,
                            phone: phone,
                            address: address
                        });
                    }
                });
                resolve(arrAccount);
            },
            (error) => {
                console.log("Get All Account Error", error);
                reject(error);
            }
        );
        setTimeout(() => unsubscribe(), 1000);
    });

}

export {
    MyContextControllerProvider,
    useMycontextProvider,
    CreateAccount,
    LoginAccount,
    Logout,
    GetAllAccount
}