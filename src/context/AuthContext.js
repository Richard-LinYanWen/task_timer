import React, { createContext, useState } from 'react';
import { setLocalStorage, getLocalStorage } from '../api';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {

    const userKey = "user";

    const setUserData = (userData) => {
        setLocalStorage(userKey, userData);
        this.State({userData});
    }

    return (
        <AuthContext.Provider value={
            {
                userData,
                setUserData
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}