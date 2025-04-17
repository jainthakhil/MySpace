import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database';
import { getFirestore, collection, addDoc, setDoc, doc, deleteDoc, getDoc, getDocs, updateDoc, arrayUnion,arrayRemove, query, where } from 'firebase/firestore'
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
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
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

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [storedData, setStoredData] = useState(null);
    const [folders, setFolders] = useState([]);


    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            localStorage.setItem('myspace-user', JSON.stringify(user)); // Save user
            console.log("loggedIn user", user);
            if (user) {
                setLoggedInUser(user)
                //navigate option
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

    const isLoggedIn = loggedInUser ? true : false;

   
    const logOut = async () => {
        await signOut(firebaseAuth);
        localStorage.removeItem('myspace-user');
        sessionStorage.removeItem('documentDataFiles');
        sessionStorage.removeItem('mediaFiles');
    };

    // adding data to firestore
    const writeUserData = async (userData) => {
        await addDoc(collection(firestore, "users"), {
            name: userData.username,
            email: userData.email
        });
        console.log("new user data uploaded");

    }
    //dummyuser
    const makeUserSubcollection = async () => {
        await addDoc(collection(firestore, "users/8SBYo1G7wA4qkNmFzWRb/age"), {
            age: 21,

        })
    }
// data that used in data rendering from firestore 
    const getDocument = async (folderPath) => {
        try {
          const docRef = doc(firestore, "uploads", folderPath); // folderPath = "media" or "documents"
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            return docSnap.data().files || []; // return just the files array
          } else {
            console.log("No such document!");
            return [];
          }
        } catch (error) {
          console.error("Error fetching document:", error);
          return [];
        }
      };

    const saveFileMetadata = async (folderPath, fileData) => {
        try {
            const docRef = doc(firestore, "uploads", folderPath); // "uploads" is the collection name
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                await updateDoc(docRef, {
                    files: arrayUnion(fileData),
                });
            } else {
                await setDoc(docRef, {
                    files: [fileData],
                });
            }
        } catch (error) {
            console.error("Error saving file metadata:", error);
        }
    };
    
    const deleteFileMetadata = async (folderPath, fileUrl) => {
        try {
          const docRef = doc(firestore, "uploads", folderPath); // replace "uploads" with your actual collection name
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            const currentFiles = docSnap.data().files || [];
      
            const updatedFiles = currentFiles.filter((file) => file.url !== fileUrl);
      
            console.log("Original files:", currentFiles);
            console.log("Filtered files:", updatedFiles);
      
            await updateDoc(docRef, {
              files: updatedFiles,
            });
      
            console.log("File metadata deleted successfully.");
          } else {
            console.log("Document does not exist.");
          }
        } catch (error) {
          console.error("Error deleting file metadata:", error);
        }
      };

    // getting the data under a query
    const getDocumentByQuery = async (name) => {
        const collectionRef = collection(firestore, 'users');
        const q = query(collectionRef, where('Name', '==', name))
        const snap = await getDocs(q);
        snap.forEach((data) => console.log(data.data()));
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
        } else if (
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

    // const fetchFiles = async (folderPath) => {
    //     const folderRef = storageRef(storage, folderPath || 'documents/')
    //     try {
    //         const res = await listAll(folderRef);
    //         const filesWithMeta = await Promise.all(
    //             res.items.map(async (item) => {
    //                 try {
    //                     const [url, metadata] = await Promise.all([
    //                         getDownloadURL(item),
    //                         getMetadata(item),
    //                     ]);
    //                     const icon = getFileIcon(metadata.contentType, item.name);
    //                     // console.log(metadata)

    //                     return {
    //                         url,
    //                         contentType: metadata.contentType,
    //                         name: item.name,
    //                         icon,
    //                         size: (metadata.size / (1024 * 1024)).toFixed(2) + ' MB',
    //                     };
    //                 } catch (err) {
    //                     console.error(`Error fetching metadata for ${item.name}:`, err);
    //                     return null;
    //                 }
    //             })
    //         );
    //         setStoredData(filesWithMeta.filter(Boolean));
    //         return filesWithMeta.filter(Boolean);
    //     } catch (error) {
    //         console.error('Error fetching documents:', error);
    //         return [];
    //     }
    // };

     useEffect(() => {
    const fetchFolders = async () => {
      const rootRef = storageRef(storage); // root path
      const result = await listAll(rootRef);

      const folderNames = result.prefixes.map((folderRef) => folderRef.name);
      setFolders(folderNames);
      console.log("fetch folders trigger")
    };

    fetchFolders();
  }, []);

    const uploadFile = (file, path, onUploadComplete) => {
        const dataRef = storageRef(storage, `${path}/${file.name}`);
        const uploadTask = uploadBytesResumable(dataRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if(percent){
                setProgress(Math.round(percent));
            }
            },
            (error) => {
                console.error('Upload error:', error);
            },
            // ✅ This is the "on complete" callback
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const fileData = {
                        name: file.name,
                        url: downloadURL,
                        contentType: file.type,
                        icon: getFileIcon(file.type, file.name),
                        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                        // uploadedAt: new Date().toISOString(),
                    };
                    setUploadedUrl(downloadURL)

                    saveFileMetadata(path, fileData); // ✅ Save to Firestore

                    if (onUploadComplete) onUploadComplete();
                });
            }
        );
    };

    const deleteFile = async (folderPath, fileData, localStorageName) => {
        console.log(fileData)
        await deleteFileMetadata(folderPath, fileData.url);
        await deleteItem(folderPath, fileData,localStorageName );
      };

    //extra

    const deleteItem = async (folderPath, file, localStorageName) => {
        const fileRef = storageRef(storage, `${folderPath}/${file.name}`);
        try {
            await deleteObject(fileRef);
            //   setStateToggle(prev => !prev);
            console.log("Item deleted successfully");
            sessionStorage.removeItem(localStorageName);
            return getDocument(folderPath)
           //getDocument(folderPath); // ✅ Trigger UI update
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    return <FirebaseContext.Provider value={{ firebaseApp, firestore, signupUser, signInWithGoogle, signinUser, isLoggedIn, loggedInUser, logOut, writeUserData, makeUserSubcollection, getDocument, getDocumentByQuery, uploadFile,  getFileIcon, deleteFile, uploadedUrl, setUploadedUrl, progress, storedData, folders}}>
        {props.children}
    </FirebaseContext.Provider>
}
