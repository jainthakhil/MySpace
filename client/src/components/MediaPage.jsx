import { React, useEffect, useState } from 'react'
import { useFirebase, storage } from '../context/Firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import SidebarComp from './SidebarComp';
import DataItemBox from './DataItemBox';
import DropzoneUploader from './UploadComponent';

const MediaPage = () => {
      const [mediaDataList, setMediaDataList] = useState([]);
      const firebase = useFirebase();
        const folderPath = 'media'
        const stateToggle = firebase.stateToggle;

        useEffect(() => {
        const loadFiles = async () => {
            const data = await firebase.fetchFiles('media/');
            setMediaDataList(data);
          };
          loadFiles();
      }, [firebase, stateToggle])
  
      return (
        <div className="parent-cont  w-full min-h-screen flex bg-gray-800">
        <SidebarComp/>
        <div className='w-full min-h-screen flex flex-col items-center justify-center '>
        <DropzoneUploader path={folderPath} />

        <div className="w-full flex flex-col flex-1 items-center text-center bg-gray-800">
                    <h1 className='text-3xl text-white'>Your Media files here</h1>

                    <div className="w-auto h-auto flex items-center justify-center p-10">
                        {mediaDataList && mediaDataList.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                                {mediaDataList.map((file, index) => (
                                    <DataItemBox folderPath='media/' file ={file} getFileIcon={firebase.getFileIcon} />
                                ))}
                            </div>
                        ) : (
                            <h1 className="text-white text-5xl text-center">Loading....</h1>
                        )}
                    </div>
                </div>
          </div>

        </div>
          
      )
}

export default MediaPage