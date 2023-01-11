import React, { createContext, useState } from 'react';
import { setLocalStorage, getLocalStorage } from '../api';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {

    const userKey = "user";

    const [userData, setUserData] = useState(getLocalStorage(userKey));
    const setUData = (data) => {
        setUserData(data);
        setLocalStorage(userKey, data);
        console.log(data);
    }

    return (
        <AuthContext.Provider value={
            {
                userData,
                setUData
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}