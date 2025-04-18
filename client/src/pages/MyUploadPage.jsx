import React from 'react'
import SidebarComp from '../components/SidebarComp';
import Header from '../components/Header';
import DropzoneUploader from '../components/UploadComponent';

const MyUploadPage = () => {
    const folderPath = 'myuploads/';

    const handleUploadComplete = async () => {
        // sessionStorage.removeItem('documentDataFiles');
        // loadFiles(true);
        // const data = await firebase.getDocument('documents');
        // setDataList(data);
        console.log("onuploadcomplete called")
        
    };

  return (
    <div className="parent-cont w-full min-h-screen flex bg-gray-800 ">
            <SidebarComp />
            <div className='w-full min-h-screen flex flex-col items-center justify-evenly text-black dark:text-white'>
            <Header/>
                <DropzoneUploader path={folderPath} onUploadComplete={handleUploadComplete} />
                <div className="w-full flex flex-col flex-1 items-center text-center bg-gray-100 dark:bg-gray-800">
                    <h1 className='text-3xl'>Files Uploaded by You</h1>

                </div>
            </div>
        </div>
    
  )
}

export default MyUploadPage