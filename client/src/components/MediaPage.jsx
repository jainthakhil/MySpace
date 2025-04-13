import { React, useEffect, useState, useRef } from 'react'
import { useFirebase } from '../context/Firebase'
import { usePopUpContext } from '../context/PopUpContext';
import SidebarComp from './SidebarComp';
import DataItemBox from './DataItemBox';
import DropzoneUploader from './UploadComponent';
import ToastMessage from './DeletePopup';
import Loader from './Loader';
import DeleteCard from './DeletePopUpCard';
import DeleteLoader from './DeleteLoader';
import DeleteLoadingCard from './DeleteLoadingCard';

const MediaPage = () => {
    const [mediaDataList, setMediaDataList] = useState([]);
    const [openMenuIndex, setOpenMenuIndex] = useState(null); // <- New
    const firebase = useFirebase();
    const folderPath = 'media/'
    const menuRefs = useRef([]);
    const [showToast, setShowToast] = useState(false);
    const popupContext = usePopUpContext();

    const handleUploadComplete = () => {
        sessionStorage.removeItem('mediaFiles');
        loadFiles(true);
    };

    const loadFiles = async () => {
        const cached = sessionStorage.getItem('mediaFiles');
        if (cached) {
            setMediaDataList(JSON.parse(cached));
        } else {
            const data = await firebase.fetchFiles('media/');
            setMediaDataList(data);
            sessionStorage.setItem('mediaFiles', JSON.stringify(data));
        }
        console.log("media data is ", mediaDataList);
    };
    useEffect(() => {
        loadFiles()
    }, [firebase.fetchFiles])

    //extra
     useEffect(()=>{
            if(popupContext.deleteFile !== null){
                console.log("deleteing file is:",popupContext.deleteFile)
            }
            console.log(popupContext)
    
        }, [popupContext.deleteFile])

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
        <div className="parent-cont w-full min-h-screen flex bg-gray-800">
            <SidebarComp />

            <div className='w-full min-h-screen flex flex-col items-center justify-center  '>
                <DropzoneUploader path={folderPath} onUploadComplete={handleUploadComplete} />

                <div className="w-full flex flex-col flex-1 items-center text-center bg-gray-800">
                    <h1 className='text-3xl text-white'>Media files</h1>

                    <div className="w-full h-auto p-4 sm:p-6 md:p-8 lg:p-10">
                    {/* className="w-full h-auto flex items-center justify-center p-10" */
                    /* "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 justify-items-stretch " */
                    }
                    {/* className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6 mt-8 " */}

                        {showToast ? (
                            <DeleteLoader/>
                        ) : mediaDataList && mediaDataList.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8" >
                                {mediaDataList.map((file, index) => (
                                    <DataItemBox
                                        key={index}
                                        index={index}
                                        file={file}
                                        folderPath={folderPath}
                                        isMenuOpen={openMenuIndex === index}
                                        onToggleMenu={() =>
                                            setOpenMenuIndex(openMenuIndex === index ? null : index)
                                        }
                                        menuRef={(el) => (menuRefs.current[index] = el)}
                                        localStorageName="mediaFiles"
                                    />
                                ))}
                            </div>
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>

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