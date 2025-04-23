import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'
import { getDatabase } from 'firebase/database';
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, getDocs, updateDoc, arrayUnion, query, where } from 'firebase/firestore'
import { getStorage, getDownloadURL, listAll, ref as storageRef, deleteObject, uploadBytesResumable } from 'firebase/storage'

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
import folderIcon from '../assets/folder.png'
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
    const [folders, setFolders] = useState([]);
    const [sharedUploads, setSharedUploads] = useState(null);

    let loggedInUserMail = JSON.parse(localStorage.getItem('myspace-user'))?.email || " ";
    const isLoggedIn = loggedInUser ? true : false;

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, async (user) => {
            if (user) {
                localStorage.setItem('myspace-user', JSON.stringify(user));
                setLoggedInUser(user)
               await getAllSharedUploads();
            }
            else {
                setLoggedInUser(null)
                localStorage.clear();
            }
            console.log(loggedInUserMail)
        })
        

    }, [])

    const signupUser = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            addUserToStore(username, email);

            // 🧠 Set displayName after user is created
            await updateProfile(userCredential.user, {
                displayName: username
            });
            addUserToStore(username, email);
            console.log("User signed up & profile updated:");
            return userCredential.user
        } catch (error) {
            console.error("Signup error:", error.message);
        }
    };

    const signInWithGoogle = () => {
        return signInWithPopup(firebaseAuth, googleProvider);
    }

    const signinUser = async (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoggedInUser(user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const logOut = async () => {
        await signOut(firebaseAuth);
    };

    const addUserToStore = async (userName, userEmail) => {
        await addDoc(collection(firestore, "users"), {
            name: userName,
            email: userEmail
        });
        console.log("new user data uploaded");
    }

    const getDocument = async (folderPath) => {
        let collectionname;
        // if (folderPath === "media") {
        //     collectionname = "shared_uploads";
        // } else if (folderPath === "documents") {
        //     collectionname = "shared_uploads";
        // } else {
        //     collectionname = "user_only_uploads";
        // }
        if (folderPath === loggedInUserMail) {
            collectionname = "user_only_uploads";
        }
        else {
            collectionname = "shared_uploads";
        }
        try {
            const docRef = doc(firestore, collectionname, folderPath); // folderPath = "media" or "documents"
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
    // folders for the homepage
    const getAllSharedUploads = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "shared_uploads"));
            const folderfiles = querySnapshot.docs.map(doc => ({
                name: doc.id,
                icon: folderIcon,
                id: doc.id,
                ...doc.data()
            }));
            // console.log("Shared Uploads:", folderfiles);
            setSharedUploads(folderfiles);
            return folderfiles;
            // folderfiles.map((item)=>{
            //     console.log(item.files.length)
            // })

        } catch (error) {
            console.error("Error fetching shared uploads:", error);
            return [];
        }
    };

    const saveFileMetadata = async (fileData, folderPath) => {
        console.log(folderPath);
        let collectionname;
        if (folderPath === loggedInUserMail) {
            collectionname = "user_only_uploads";
        }
        else {
            collectionname = "shared_uploads"
        }
            try {
                const docRef = doc(firestore, collectionname, folderPath); // "uploads" is the collection name
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

        // try{
        //     const collRef = collection(firestore, "uploads", "shared", folderPath);
        //     await addDoc(collRef, fileData );

        // }
        // catch (error) {
        //     console.log(`Error uploading to shared/${folderPath}:`, error)

        // }


        // const docRef = doc(firestore, "uploads", "shared", type); // here `type` is a document

        // try {
        //     const docSnap = await getDoc(docRef);

        //     if (docSnap.exists()) {
        //         await updateDoc(docRef, {
        //             files: arrayUnion(fileData),
        //         });
        //     } else {
        //         await setDoc(docRef, {
        //             files: [fileData],
        //         });
        //     }

        //     console.log(`Saved to uploads/shared/${type}`);
        // } catch (error) {
        //     console.error("Error saving file metadata:", error);
        // }

    };

    const deleteFileMetadata = async (folderPath, fileUrl) => {

        let collectionname;
        if (folderPath === loggedInUserMail) {
            collectionname = "user_only_uploads";
        }
        else {
            collectionname = "shared_uploads"
        }

        try {
            const docRef = doc(firestore, collectionname, folderPath); // replace "uploads" with your actual collection name
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const currentFiles = docSnap.data().files || [];

                const updatedFiles = currentFiles.filter((file) => file.url !== fileUrl);

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

    // useEffect(() => {
    //     const fetchFolders = async () => {
    //         const rootRef = storageRef(storage, "shared_uploads"); // root path
    //         const result = await listAll(rootRef)
    //         const folderNames = result.prefixes.map((folderRef) => folderRef.name);
    //         setFolders(folderNames);
    //     };

    //     fetchFolders();
    // }, []);

    // const uploadFile = (file, path, onUploadComplete) => {

    //     let foldername = '';
    //     if(path === loggedInUserMail){
    //          foldername = `user_only_uploads/${loggedInUserMail}`
    //     }
    //     else{
    //         foldername =  `shared_uploads/${path}`
    //     }

    //     const dataRef = storageRef(storage, `${foldername}/${file.name}`);
    //     const uploadTask = uploadBytesResumable(dataRef, file);
    //     console.log(foldername);
    //     let animationFrame;
    //     let displayedProgress = 0;


    //     uploadTask.on(
    //         'state_changed',
    //         (snapshot) => {
    //             const realProgress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100)

    //             const animateProgress = () => {
    //                 if (displayedProgress < realProgress) {
    //                   displayedProgress += 1; // step up by 1%
    //                   setProgress(displayedProgress);
    //                   animationFrame = requestAnimationFrame(animateProgress);
    //                 }
    //               };

    //               cancelAnimationFrame(animationFrame);
    //               animateProgress();

    //             // const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             // if (percent) {
    //             //     setProgress(Math.round(percent));
    //             // }
    //         },
    //         (error) => {
    //             console.error('Upload error:', error);
    //         },
    //         // ✅ This is the "on complete" callback
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 const fileData = {
    //                     name: file.name,
    //                     url: downloadURL,
    //                     contentType: file.type,
    //                     icon: getFileIcon(file.type, file.name),
    //                     size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
    //                     // uploadedAt: new Date().toISOString(),
    //                 };
    //                 if (downloadURL) console.log("uploaded to storage successfully")
    //                 else {
    //                     console.log("error in storing to store")
    //                 }
    //                 setUploadedUrl(downloadURL)

    //                 saveFileMetadata(fileData, path); // ✅ Save to Firestore

    //                 if (onUploadComplete) onUploadComplete();
    //             });
    //         }
    //     );
    // };

    const uploadFile = (file, path, onUploadComplete) => {
        let foldername = path === loggedInUserMail
            ? `user_only_uploads/${loggedInUserMail}`
            : `shared_uploads/${path}`;

        const dataRef = storageRef(storage, `${foldername}/${file.name}`);
        const uploadTask = uploadBytesResumable(dataRef, file);
        console.log(foldername);

        let animationFrame = null;
        let displayedProgress = 0;
        let targetProgress = 0;

        const animateProgress = () => {
            if (displayedProgress < targetProgress) {
                displayedProgress += 1;
                setProgress(displayedProgress);
                animationFrame = requestAnimationFrame(animateProgress);
            }
        };

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const realProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                targetProgress = realProgress;

                // Cancel any previous animation frame and start a new one
                if (animationFrame) cancelAnimationFrame(animationFrame);
                animateProgress();
            },
            (error) => {
                console.error('Upload error:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("url for uploaded file", downloadURL);
                    const fileData = {
                        name: file.name,
                        url: downloadURL,
                        contentType: file.type,
                        icon: getFileIcon(file.type, file.name),
                        // icon:defaultIcon,
                        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                    };

                    if (downloadURL) {
                        console.log("uploaded to storage successfully");
                        setUploadedUrl(downloadURL);
                        saveFileMetadata(fileData, path); // Save to Firestore
                        if (onUploadComplete) onUploadComplete();
                    } else {
                        console.log("error in storing to storage");
                    }
                });
            }
        );
    };


    const deleteItem = async (path, file) => {
        // let foldername = '';
        // if (folderPath === 'documents') {
        //     // setFolderName("shared-uploads/documents");
        //     foldername = 'shared_uploads/documents';
        // } 
        // else if (folderPath === 'media') {
        //         // setFolderName("shared-uploads/media");
        //         foldername = 'shared_uploads/media';
        //     }
        // else if (folderPath === loggedInUserMail) {
        //         foldername = `user_only_uploads/${loggedInUserMail}`
        //     }
        // else{
        //     console.log("path does not exist ", foldername)
        //     alert("path does not exist ", foldername)
        //     return;
        // } 
        let foldername = '';
        if (path === loggedInUserMail) {
            foldername = `user_only_uploads/${loggedInUserMail}`
        }
        else {
            foldername = `shared_uploads/${path}`
        }
        const fileRef = storageRef(storage, `${foldername}/${file.name}`);
        try {
            await deleteObject(fileRef);
            //   setStateToggle(prev => !prev);
            deleteFileMetadata(path, file.url)
            console.log("Item deleted successfully");
            // sessionStorage.removeItem(localStorageName);
            // return getDocument(folderPath)
            //getDocument(folderPath); // ✅ Trigger UI update
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const deleteFile = async (folderPath, fileData) => {
        console.log(fileData)
        await deleteItem(folderPath, fileData);
    };

    return <FirebaseContext.Provider value={{ firebaseApp, firestore, signupUser, signInWithGoogle, signinUser, isLoggedIn, loggedInUser, logOut, addUserToStore, getDocument, getDocumentByQuery, uploadFile, deleteFile, uploadedUrl, setUploadedUrl, progress, folders, sharedUploads, getAllSharedUploads }}>
        {props.children}
    </FirebaseContext.Provider>
}
