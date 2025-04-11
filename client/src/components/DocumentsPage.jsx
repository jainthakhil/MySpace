import { React, useEffect, useState, useRef } from 'react'
import { useFirebase, storage } from '../context/Firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import SidebarComp from './SidebarComp'
import DropzoneUploader from './UploadComponent';
import googleDocsIcon from '../assets/docx.png'
import sheetsIcon from '../assets/xlsx.png'
import pdfIcon from '../assets/ppdf.png'
import pptIcon from '../assets/pptx.png'
import DataItemBox from './DataItemBox';



const DocumentsPage = () => {
    const [dataList, setDataList] = useState([]);
    const firebase = useFirebase();
    const folderPath = 'documents'

    useEffect(() => {
        const loadFiles = async () => {
            const data = await firebase.fetchFiles('documents/');
            setDataList(data);
          };
          loadFiles();
    }, [firebase]);
    

    return (
        <div className="parent-cont w-full min-h-screen flex bg-gray-800">
            <SidebarComp />
            <div className='w-full min-h-screen flex flex-col items-center justify-evenly text-white'>
                <DropzoneUploader path= "documents"  />
                <div className="w-full flex flex-col flex-1 items-center text-center bg-gray-800">
                    <h1 className='text-3xl'>Your Documents here</h1>

                    <div className="w-auto h-auto flex items-center justify-center p-10">
                        {dataList && dataList.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                                {dataList.map((file, index) => (
                                    <DataItemBox folderPath= 'documents/' file ={file} getFileIcon={firebase.getFileIcon} />
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

export default DocumentsPage