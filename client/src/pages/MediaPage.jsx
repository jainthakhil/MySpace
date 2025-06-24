import { React, useEffect, useState, useRef } from 'react'
import { useFirebase } from '../context/Firebase'
import { usePopUpContext } from '../context/PopUpContext';
import SidebarComp from '../components/SidebarComp';
import DropzoneUploader from '../components/UploadComponent';
import DeleteCard from '../components/DeletePopUpCard';
import Header from '../components/Header';
import DataGrid from '../components/DataGrid';

const MediaPage = () => {
    const [mediaDataList, setMediaDataList] = useState([]);
    const [openMenuIndex, setOpenMenuIndex] = useState(null); // <- New
    const firebase = useFirebase();
    const folderPath = 'media'  //alter mediapath
    const menuRefs = useRef([]);
    const popupContext = usePopUpContext();

    const loadFiles = async () => {
        const data = await firebase.getDocument('media');
        setMediaDataList(data);
    };

    useEffect(() => {
        loadFiles()
        console.log("firebase is altered and loadFiles is fired")
    }, [firebase])

    useEffect(() => {
        if (popupContext.reloadData) {
            loadFiles();
            popupContext.setReloadData(false);
        }

    }, [popupContext.reloadData])


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                openMenuIndex !== null &&
                menuRefs.current[openMenuIndex] &&
                !menuRefs.current[openMenuIndex].contains(event.target)
            ) {
                setOpenMenuIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenuIndex]);

    return (
        <div className="parent-cont w-full min-h-screen flex dark:bg-gray-800 bg:white">
            <SidebarComp />

            <div className='w-full min-h-screen flex flex-col items-center justify-evenly text-black dark:text-white  '>
            <Header/>

                <div className="w-full flex flex-col flex-1 items-center text-center bg-gray-100 dark:bg-gray-800">
                    <h1 className='text-3xl dark:text-white text-black'>Media files</h1>

                  
                    <DataGrid dataList = {mediaDataList}
                    folderPath = {folderPath} />
                </div>
                <DropzoneUploader path={folderPath} />

                {popupContext.showDeleteCard && popupContext.deleteFile && (
                     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
                         <DeleteCard
                             file={popupContext.deleteFile}
                             folderPath={folderPath}
                             onDeleteToast={() => {
                                 triggerToast();
                                 
                             }}
                             localStorageName="mediaFiles"
                         />
                     </div>
                 )}

            </div>

        </div>

    )
}

export default MediaPage