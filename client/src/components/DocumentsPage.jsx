import { React, useEffect, useState, useRef } from 'react'
import { useFirebase } from '../context/Firebase'
import { usePopUpContext } from '../context/PopUpContext';
import SidebarComp from './SidebarComp'
import DropzoneUploader from './UploadComponent';
import DataItemBox from './DataItemBox';

import Loader from './Loader';
import DeleteCard from './DeletePopUpCard';
import DeleteLoader from './DeleteLoader';
import Header from './Header';
import AccountDropdown from './AccountDropdown';

const DocumentsPage = () => {
    const [dataList, setDataList] = useState([]);
    const firebase = useFirebase();
    const popupContext = usePopUpContext();
    const folderPath = 'documents/';
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const menuRefs = useRef([]); // <- To keep track of refs for each box

    const loadFiles = async () => {
        const data = await firebase.getDocument('documents');
        setDataList(data);
        // const cached = sessionStorage.getItem('documentDataFiles');
        // if (cached) {
        //     setDataList(JSON.parse(cached));
        // } else {
        //     const data = await firebase.fetchFiles('documents/');
        //     setDataList(data);
        //     sessionStorage.setItem('documentDataFiles', JSON.stringify(data));
        // }
        // console.log("document data is ", dataList)
    };

    
    const handleUploadComplete = async () => {
        // sessionStorage.removeItem('documentDataFiles');
        // loadFiles(true);
        // const data = await firebase.getDocument('documents');
        // setDataList(data);
        console.log("onuploadcomplete called")
        
    };

 
     useEffect(() => {
         loadFiles()
         console.log(dataList)
     }, [firebase])

    useEffect(()=>{
        if(popupContext.reloadData){
            loadFiles();
            popupContext.setReloadData(false);
        }
        console.log(popupContext)

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
        <div className="parent-cont w-full min-h-screen flex bg-gray-800 ">
            <SidebarComp />
            <div className='w-full min-h-screen  min-w-max flex flex-col items-center justify-evenly text-black dark:text-white'>
            <Header/>
            {/* <AccountDropdown/> */}
                <DropzoneUploader path={folderPath} onUploadComplete={handleUploadComplete} />
                <div className="w-full flex flex-col flex-1 items-center text-center bg-gray-100 dark:bg-gray-800">
                    <h1 className='text-3xl'>Document Files</h1>

                    <div className="w-full h-auto p-4 sm:p-6 md:p-8 lg:p-10">

                        { dataList && dataList.length > 0 ? (
                            <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]  gap-6 mt-8 ">
                                {dataList.map((file, index) => (
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
                                        localStorageName="documentDataFiles"
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
                             localStorageName="documentDataFiles"
                         />
                     </div>
                 )}
            </div>
        </div>
     );
 };

export default DocumentsPage

