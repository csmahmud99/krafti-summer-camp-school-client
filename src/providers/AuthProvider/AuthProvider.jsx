import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Authentiction Provider for Google Sign In Method
    const googleProvider = new GoogleAuthProvider();

    // Authentication for Sign Up with email & password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Authentication for Sign In with email & password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Authentication provider for Google Sign In Method
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Authentication for Sign Out/Log Out from the system
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Update a user's profile :: getting the user's name and photo-URL
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    // Authentication status change watcher
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("Current User", currentUser);

            // Get & set JWT Tokens :: using 'Axios'
            if (currentUser) {
                axios.post("https://krafti-summer-camp-school-server.vercel.app/jwt", { email: currentUser.email })
                    .then(data => {
                        // console.log(data.data.token);
                        localStorage.setItem("access-token", data.data.token);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            }
            else {
                localStorage.removeItem("access-token");
            }
        });
        return () => {
            return unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;