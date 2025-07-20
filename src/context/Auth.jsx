import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';





const Auth = createContext()

const initialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGGED_IN": return { isAuth: true, user: payload.user }
        case "SET_PROFILE": return { ...state, user: payload.user }
        case "SET_LOGGED_OUT": return initialState
        default:
            return state
    }
}

const AuthContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const [isAppLoading, setIsAppLoading] = useState(true)

    const fetchUserData = async(user) => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const user=docSnap.data()
            console.log('user', user)

            dispatch({ type: "SET_LOGGED_IN", payload: { user } })
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

        setIsAppLoading(false)
    }


    const getUser = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('user', user)
                fetchUserData(user)

            } else {
                setIsAppLoading(false)
            }
        });

    }, [])
    useEffect(() => { getUser(); }, [getUser])


    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "SET_LOGGED_OUT" })
                window.toastify("Logout successfully", "success")
            })
            .catch(() => {
                window.toastify("Something went wrong while logging out", "error")
            })
    }


    return (
        <Auth.Provider value={{ ...state, dispatch, isAppLoading, handleLogOut }}>
            { children }
        </Auth.Provider>
    )
}

export const useAuthContext = () => useContext(Auth)

export default AuthContext