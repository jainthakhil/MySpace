import { createContext, useContext, useEffect, useState } from 'react'

const UploadContext = createContext(null);

export const  useUploadContext = () => useContext(UploadContext);

export const UploadContextProvider = (props) => {
    const [uploadComplete, setUploadComplete] = useState(false);
     return <UploadContext.Provider value={{uploadComplete, setUploadComplete}}>
{props.children}
     </UploadContext.Provider>
}