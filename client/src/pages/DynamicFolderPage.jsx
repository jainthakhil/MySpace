import { React, useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase'
import { usePopUpContext } from '../context/PopUpContext';
import SidebarComp from '../components/SidebarComp'
import DropzoneUploader from '../components/UploadComponent';
import DataItemBox from '../components/DataItemBox';

import Loader from '../components/Loader';
import DeleteCard from '../components/DeletePopUpCard';
import DeleteLoader from '../components/DeleteLoader';
import Header from '../components/Header';
import AccountDropdown from '../components/AccountDropdown';
import DataGrid from '../components/DataGrid';
import Form from '../TestCom';
import SubHeader from '../components/SubHeader';
import UploadingPopup from '../components/UploadingPopup';

const DynamicFolderPage = () => {
    const [dataList, setDataList] = useState([]);
    const { folderId } = useParams();
    const firebase = useFirebase();
    const popupContext = usePopUpContext();
    const folderPath = folderId;
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const menuRefs = useRef([]); // <- To keep track of refs for each box
    const navigate = useNavigate();

    

    const loadFiles = async () => {
        const data = await firebase.getDocument(folderId);
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

     useEffect(() => {
         loadFiles()
         
     }, [firebase, navigate])

    
      useEffect(() => {
        let timer;
        if (firebase.uploadedUrl) {
          timer = setTimeout(() => {
            popupContext.setShowSuccessCard(false);
          }, 1000);
        }
        return () => clearTimeout(timer);
      }, [firebase.uploadedUrl ]);

    useEffect(()=>{
        if(popupContext.reloadData){
            loadFiles();
            popupContext.setReloadData(false);
            // popupContext.setShowSuccessCard(false);

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
        <div className="parent-cont w-full min-h-screen flex dark:bg-darkBack bg-gray-100 ">
            <SidebarComp />
            <div className='w-full min-h-screen flex flex-col items-center justify-evenly text-black dark:text-white'>
            <Header/>
            {/* <AccountDropdown/> */}
                {/* <DropzoneUploader path={folderPath}  /> */}
                <div className="w-full flex flex-col flex-1 items-center text-center bg-gray-100 dark:bg-darkBack">

                <SubHeader folderName={folderId}/>
                
                    <DataGrid dataList = {dataList}
                    folderPath = {folderId} />
                </div>
                <DropzoneUploader path={folderPath}  />
                {popupContext.showDeleteCard && popupContext.deleteFile && (
                     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
                         <DeleteCard
                             file={popupContext.deleteFile}
                             folderPath={folderPath}
                             localStorageName="documentDataFiles"
                         />
                     </div>
                 )}
                 {popupContext.showSuccessCard && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
                         <UploadingPopup />
                     </div>
                 )}
            </div>
        </div>
     );
 };

export default DynamicFolderPage

