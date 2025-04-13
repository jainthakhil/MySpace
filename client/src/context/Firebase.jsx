import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'
import { getDatabase, ref, set  } from 'firebase/database';
import {getFirestore, collection, addDoc, doc, getDoc, getDocs, query, where} from 'firebase/firestore'
import { getStorage, getMetadata, getDownloadURL, listAll, ref as storageRef, deleteObject, uploadBytesResumable } from 'firebase/storage'

// importing file Icons 
import googleDocsIcon from '../assets/docx.png'
import sheetsIcon from '../assets/xlsx.png'
import pdfIcon from '../assets/ppdf.png'
import pptIcon from '../assets/pptx.png'

import mp3Icon from '../assets/mp3.png'
import mp4Icon from '../assets/mp4.png'
import zipIcon from '../assets/zip.png'
import pngIcon from '../assets/png.png'
import imageIcon from '../assets/jpg.png'
import htmlIcon from '../assets/html.png'
import cssIcon from '../assets/css.png'
import txtIcon from '../assets/txt.png'
import defaultIcon from '../assets/defaultIcon.png'


const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket:import.meta.env.VITE_STORAGE_BUCKET ,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    databaseURL: import.meta.env.VITE_DATABASE_URL
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
    const [uploadedUrl, setUploadedUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [storedData, setStoredData] = useState(null);
    
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
        sessionStorage.removeItem('documentDataFiles');
        sessionStorage.removeItem('mediaFiles');
      };

    // const putData = (key, data) => set(ref(database, key), data);

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

    const getFileIcon = (contentType, name) => {
        const lowerName = name.toLowerCase();
    
        if (contentType.includes('pdf') || lowerName.includes('.pdf')) {
            return pdfIcon;
        } else if (
            contentType.includes('presentation') ||
            lowerName.includes('.ppt') ||
            lowerName.includes('.pptx')
        ) {
            return pptIcon;
        } else if (
            contentType.includes('spreadsheet') ||
            contentType.includes('excel') ||
            lowerName.includes('.xls') ||
            lowerName.includes('.xlsx')
        ) {
            return sheetsIcon;
        } else if (
            contentType.includes('word') ||
            contentType.includes('document') ||
            lowerName.includes('.doc') ||
            lowerName.includes('.docx')
        ) {
            return googleDocsIcon;
        } else if(
            contentType.includes('text') ||
            lowerName.includes('.txt')
        ) {
            return txtIcon;
        } else if (
            contentType.includes('video') ||
            lowerName.includes('.mp4')
        ) {
            return mp4Icon;
        } else if (
            contentType.includes('audio') ||
            lowerName.includes('.mp3')
        ) {
            return mp3Icon;
        } else if (
            contentType.includes('zip') ||
            lowerName.includes('.zip')
        ) {
            return zipIcon;
        } else if (
            lowerName.includes('.png')
        ) {
            return pngIcon;
        } else if (
            lowerName.includes('.jpeg') ||
            lowerName.includes('.jpg')
        ) {
            return imageIcon; // you can name this jpgIcon if you prefer
        } else if (
            lowerName.includes('.html')
        ) {
            return htmlIcon;
        } else if (
            lowerName.includes('.css')
        ) {
            return cssIcon;
        } else {
            return defaultIcon; // fallback icon
        }
    };

    const fetchFiles = async (folderPath) => {
        const folderRef = storageRef(storage, folderPath || 'documents/')
            try {
                const res = await listAll(folderRef);
                const filesWithMeta = await Promise.all(
                    res.items.map(async (item) => {
                        try {
                            const [url, metadata] = await Promise.all([
                                getDownloadURL(item),
                                getMetadata(item),
                            ]);
                            const icon = getFileIcon(metadata.contentType, item.name);
                            // console.log(metadata)
    
                            return {
                                url,
                                contentType: metadata.contentType,
                                name: item.name,
                                icon,
                                size:(metadata.size / (1024 * 1024)).toFixed(2) + ' MB',
                            };
                        } catch (err) {
                            console.error(`Error fetching metadata for ${item.name}:`, err);
                            return null;
                        }
                    })
                );
                setStoredData(filesWithMeta.filter(Boolean));
                return filesWithMeta.filter(Boolean);
            } catch (error) {
                console.error('Error fetching documents:', error);
                return [];
            }
        };

    const uploadFile = (file, path, onUploadComplete) => {
        const dataRef = storageRef(storage, `${path}/${file.name}`);
        
            const uploadTask = uploadBytesResumable(dataRef, file);
        
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(Math.round(percent));
              },
              (error) => {
                console.error('Upload error:', error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setUploadedUrl(downloadURL);
                  if (onUploadComplete) onUploadComplete();
                });
                fetchFiles(path)
              }
            );
    }

        //extra

        const deleteItem = async (folderPath, itemPath, localStorageName) => {
            try {
              const dataItemRef = storageRef(storage, itemPath);
              await deleteObject(dataItemRef);
            //   setStateToggle(prev => !prev);
              console.log("Item deleted successfully");
              sessionStorage.removeItem(localStorageName);
                fetchFiles(folderPath); // ✅ Trigger UI update
            } catch (error) {
              console.error("Failed to delete item:", error);
            }
          };

    return <FirebaseContext.Provider value={{firebaseApp, firestore, signupUser,signInWithGoogle, signinUser,  isLoggedIn, loggedInUser, logOut, writeUserData, makeUserSubcollection,getDocument, getDocumentByQuery ,uploadFile, fetchFiles, getFileIcon, deleteItem, uploadedUrl, setUploadedUrl, progress, storedData}}>
        {props.children}
    </FirebaseContext.Provider>
}
