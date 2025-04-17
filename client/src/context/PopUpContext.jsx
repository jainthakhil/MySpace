import { createContext, useContext, useEffect, useState } from 'react'
const PopUpContext = createContext(null);

export const usePopUpContext = ()=> useContext(PopUpContext);

export const PopUpContextProvider = (props)=>{
    const [deleteFile, setDeleteFile] = useState(null);
    const [showDeleteCard, setShowDeleteCard] = useState(false);
    
    const [reloadData, setReloadData] = useState(false);

    const [deleteLoader, setDeleteLoader] = useState(false);

    return <PopUpContext.Provider value={{deleteFile, setDeleteFile, showDeleteCard, setShowDeleteCard, deleteLoader, setDeleteLoader, reloadData, setReloadData}}>
        {props.children}
    </PopUpContext.Provider>

}