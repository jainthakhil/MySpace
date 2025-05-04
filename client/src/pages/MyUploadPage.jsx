import React, { useEffect, useState, useRef } from 'react'
import SidebarComp from '../components/SidebarComp';
import Header from '../components/Header';
import DropzoneUploader from '../components/UploadComponent';
import { useFirebase } from '../context/Firebase';
import { usePopUpContext } from '../context/PopUpContext';
import DeleteCard from '../components/DeletePopUpCard';
import DataGrid from '../components/DataGrid';
import SubHeader from '../components/SubHeader';
import { useNavigate } from 'react-router-dom';

const MyUploadPage = () => {
    const [myFiles, setMyFiles] = useState(null);

    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const menuRefs = useRef([]);
    const firebase = useFirebase();
    const navigate = useNavigate()
    const popupContext = usePopUpContext();
    const storedUser = JSON.parse(localStorage.getItem('myspace-user'));
    // const myFolder = storedUser.displayName; 
    const myFolder = storedUser?.email;
    const folderName = storedUser?.displayName || "username";

    // const folderPath = 'myuploads/';
    const loadFiles = async () => {
        const myDataFiles = await firebase.getDocument(myFolder);
        setMyFiles(myDataFiles);
    }

    useEffect(() => {
        loadFiles();
    }, [firebase, navigate])

    useEffect(() => {
        let timer;
        if (firebase.uploadedUrl) {
            timer = setTimeout(() => {
                popupContext.setShowSuccessCard(false);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [firebase.uploadedUrl]);

    useEffect(() => {
        if (popupContext.reloadData) {
            loadFiles();
            popupContext.setReloadData(false);
        }
        // console.log(popupContext)

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
        <div className="parent-cont w-full min-h-screen flex dark:bg-darkBack bg-gray-100">
            <SidebarComp />
            <div className='w-full min-h-screen flex flex-col items-center justify-evenly text-black dark:text-white'>
                <Header />

                <div className="w-full flex flex-col flex-1 items-center text-center bg-gray-100 dark:bg-darkBack">
                    <SubHeader folderName={folderName} />
                    <DataGrid dataList={myFiles} />
                </div>

                <DropzoneUploader path={myFolder} />

                {popupContext.showDeleteCard && popupContext.deleteFile && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
                        <DeleteCard
                            file={popupContext.deleteFile}
                            folderPath={myFolder}
                            localStorageName="documentDataFiles"
                        />
                    </div>
                )}
            </div>
        </div>

    )
}

export default MyUploadPage