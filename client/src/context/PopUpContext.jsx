import { createContext, useContext, useEffect, useState } from 'react'
const PopUpContext = createContext(null);

export const usePopUpContext = ()=> useContext(PopUpContext);

export const PopUpContextProvider = (props)=>{
    const [deleteFile, setDeleteFile] = useState(null);
    const [showDeleteCard, setShowDeleteCard] = useState(false);
    
    const [reloadData, setReloadData] = useState(false);

    const [deleteLoader, setDeleteLoader] = useState(false);

    const [showAddNewFolderCard, setShowAddNewFolderCard] = useState(false);
    const [newFile, setNewFile] = useState(null);

    const [showSuccessCard, setShowSuccessCard] = useState(false);
    const [showErrorCard, setShowErrorCard] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showUploadingCard, setShowUploadingCard] = useState(false);
    const [accountAlreadyExist, setAccountAlreadyExist] = useState(false);
    const [alreadyExist, setAlreadyExist] = useState(false);

    return <PopUpContext.Provider value={{deleteFile, setDeleteFile, showDeleteCard, setShowDeleteCard, deleteLoader, setDeleteLoader, reloadData, setReloadData, showAddNewFolderCard, setShowAddNewFolderCard, newFile, setNewFile, showSuccessCard, setShowSuccessCard, showErrorCard, setShowErrorCard, showUploadingCard, setShowUploadingCard,  showForgotPassword, setShowForgotPassword,accountAlreadyExist,setAccountAlreadyExist, alreadyExist, setAlreadyExist}}>
        {props.children}
    </PopUpContext.Provider>

}