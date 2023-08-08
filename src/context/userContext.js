import { createContext, useContext, useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    OAuthProvider,
    FacebookAuthProvider
} from "firebase/auth";
import { auth } from "../firebase";

export const UserContext = createContext({});

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (res) => {
            if (res) {
                setUser(res);
            } else {
                setUser(null);
            }
            setError("");
            setLoading(false);
        });
        return unsubscribe;
    }, []);


    
    const registerUser = (email, password, name) => {
        setLoading(true);
        setError("");
        createUserWithEmailAndPassword(auth, email, password)
            .then(() =>
                updateProfile(auth.currentUser, {
                    displayName: name,
                })
            )
            .then((res) => console.log(res))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    const signInUser = (email, password) => {
        setLoading(true);
        setError("");

        signInWithEmailAndPassword(auth, email, password)
            .then((res) => console.log(res))
            .catch((err) => setError(err.code))
            .finally(() => setLoading(false));
    };

    const signInWithGoogle = () => {
        setLoading(true);
        setError("");

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((res) => console.log(res))
            .catch((err) => setError(err.code))
            .finally(() => setLoading(false));
    };
    
    const signInWithMicrosoft = () => {
        setLoading(true);
        const microsoftProvider = new OAuthProvider('microsoft.com'); 
        signInWithPopup(auth, microsoftProvider)
            .catch((err) => setError(err.code))
            .finally(() => setLoading(false));
    };

 const signInWithGithub = () => {
    setLoading(true);
    setError("");
    signInWithPopup(auth, new GithubAuthProvider())
        .then((res) => console.log(res))
        .catch((err) => {
            console.error("GitHub Sign-In Error:", err);
            setError(err.code);
        })
        .finally(() => setLoading(false));
};

    const signInWithFacebook = () => {
        setLoading(true);
        setError("");

        signInWithPopup(auth, new FacebookAuthProvider())
            .then((res) => console.log(res))
            .catch((err) => setError(err.code))
            .finally(() => setLoading(false));
    };

    const logoutUser = () => {
        signOut(auth);
    };

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const contextValue = {
        user,
        loading,
        error,
        signInUser,
        registerUser,
        logoutUser,
        forgotPassword,
        signInWithGithub,
        signInWithGoogle,
        signInWithMicrosoft,
        signInWithFacebook,
    };
    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};