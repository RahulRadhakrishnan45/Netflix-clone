import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDnNNmMRzck0GQXZCh-xxBezWtbHhcEARI",
  authDomain: "netflix-clone-4c521.firebaseapp.com",
  projectId: "netflix-clone-4c521",
  storageBucket: "netflix-clone-4c521.firebasestorage.app",
  messagingSenderId: "168894607407",
  appId: "1:168894607407:web:a4b2cfd59db7958ed816da"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code)
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code)
    }
}

const logout = async () => {
    try {
        signOut(auth)
    } catch (error) {
        console.log(error)
        toast.error(error.code)
    }
}

export {auth, db, login, signUp, logout}