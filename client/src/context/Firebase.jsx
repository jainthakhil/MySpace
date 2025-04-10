import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'
import { getDatabase, ref, set  } from 'firebase/database';
import {getFirestore, collection, addDoc, doc, getDoc, getDocs, query, where} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyABnpU4cEvnqRZea2gqS7dgNvVS8zPmc7k",
    authDomain: "myspace-app-b9054.firebaseapp.com",
    projectId: "myspace-app-b9054",
    storageBucket: "myspace-app-b9054.firebasestorage.app",
    messagingSenderId: "220887697383",
    appId: "1:220887697383:web:3b401122a04931dabe1f42",
    databaseURL: "https://myspace-app-b9054-default-rtdb.firebaseio.com"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);


//google signin feature
const googleProvider = new GoogleAuthProvider()


//for checking the user is logged or not

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, user => {
            localStorage.setItem('myspace-user', JSON.stringify(user)); // Save user
            console.log("loggedIn user",user);   
            if (user) {
                setLoggedInUser(user)
              }
            else setLoggedInUser(null)
        })
    }, [])
    
    const signupUser = async (email, password, username) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      
          // 🧠 Set displayName after user is created
         await updateProfile(userCredential.user, {
            displayName: username
          });
          console.log("User signed up & profile updated:");
          return userCredential.user
        } catch (error) {
          console.error("Signup error:", error.message);
        }
      };

    const signInWithGoogle = () => {
        return signInWithPopup(firebaseAuth, googleProvider);
    }

    const signinUser = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoggedInUser(user);                 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
            });
    }
    // useEffect(() => {
    //     const userLoggedState = onAuthStateChanged(firebaseAuth, (user) => {
    //       if (user) {
    //         setIsUserLoggedIn(user);
    //         console.log("user is logged in");
            
    //         // console.log(user) // User is signed in
    //       } else {
    //         setIsUserLoggedIn(null); // User is signed out
    //         console.log("user is logged out");
    //       }
    //     });
    
    //     return () => userLoggedState(); // Cleanup the listener when the component unmounts
    //   }, []);

    const isLoggedIn = loggedInUser ? true : false;

    // const logOut = () => {
    //     return signOut(firebaseAuth);
    // }
    const logOut = async () => {
        await signOut(firebaseAuth);
        localStorage.removeItem('myspace-user');
      };

    const putData = (key, data) => set(ref(database, key), data);

    // adding data to firestore
    const writeUserData = async(userData) => {
        await addDoc(collection(firestore, "users" ),{
            name: userData.username,
            email: userData.email
        });
        console.log("new user data uploaded");
        
    }
    //dummyuser
    const makeUserSubcollection = async() => {
        await addDoc(collection(firestore, "users/8SBYo1G7wA4qkNmFzWRb/age"),{
            age: 21,

        })
    }

    const getDocument = async () => {
        const ref = collection(firestore,'users');
        const querySnapshot = await getDocs(collection(firestore, "users"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} =>`, doc.data());
        })
        
    }
    // getting the data under a query
    const getDocumentByQuery = async(name) => {
        const collectionRef = collection(firestore, 'users');
        const q = query(collectionRef, where('Name', '==', name))
        const snap = await getDocs(q);
        snap.forEach((data)=> console.log(data.data()));
    }

    return <FirebaseContext.Provider value={{firebaseApp, signupUser,signInWithGoogle, signinUser, putData, isLoggedIn, loggedInUser, logOut, writeUserData, makeUserSubcollection,getDocument, getDocumentByQuery}}>
        {props.children}
    </FirebaseContext.Provider>
}
