import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import React, {createContext, useContext, useEffect, useState} from 'react'
import {auth} from '../firebase';

const AuthContext = createContext();


export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);



    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut(){
        return signOut(auth);
    }


    function resetPassword(email){
        return sendPasswordResetEmail(auth, email);
    }

    function UpdateEmail(email){
        return updateEmail(currentUser, email);
    }

    function UpdatePassword(password){  
        return updatePassword(currentUser, password);
    }


    

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setCurrentUser(user);
                setLoading(false);
            }
        });
        
        return () => {unsubscribe()};

    }, []);
    

    const value = {
        currentUser, 
        signUp,
        login,
        logOut,
        resetPassword,
        UpdateEmail, 
        UpdatePassword
    }



    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
