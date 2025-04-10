import { React, useEffect, useState, useRef } from 'react'
import { useFirebase, storage } from '../context/Firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import googleDocsIcon from '../assets/google-docs.png'
import sheetsIcon from '../assets/sheets.png'
import pdfIcon from '../assets/pdf.png'
import pptIcon from '../assets/ppt.png'
import SidebarComp from './SidebarComp'
import DropzoneUploader from './UploadPage';

const DocumentsPage = () => {
    const [data, setData] = useState(null);
    const [dataList, setDataList] = useState([]);
    const firebase = useFirebase();
    const fileInputRef = useRef(null); //reference to inputField
    const folderPath = 'documents'

    const date = new Date();
    const timestamp = date.getTime();

    const documentListRef = ref(storage, 'documents/')

    const fetchFiles = async () => {
        try {
            const res = await listAll(documentListRef);

            const filesWithMeta = await Promise.all(
                res.items.map(async (item) => {
                    try {
                        const [url, metadata] = await Promise.all([
                            getDownloadURL(item),
                            getMetadata(item),
                        ]);

                        return {
                            url,
                            contentType: metadata.contentType,
                            name: item.name,
                        };
                    } catch (err) {
                        console.error(`Error fetching metadata for ${item.name}:`, err);
                        return null;
                    }
                })
            );

            setDataList(filesWithMeta.filter(Boolean));
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [firebase, dataList]);

    const uploadFile = async () => {
        if (data === null) return;

        const dataRef = ref(storage, `documents/${data.name}`);

        try {
            await uploadBytes(dataRef, data);
            alert('Upload successful ✅');
            fetchFiles(); // Refresh list after upload
            setData(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err) {
            console.error('Upload failed ❌', err);
        }
    };

    const getFileIcon = (contentType, name) => {
        const lowerName = name.toLowerCase();

        if (contentType.includes('pdf') || lowerName.includes('.pdf')) {
            return pdfIcon;
        } else if (
            contentType.includes('presentation') ||
            lowerName.includes('.ppt') ||
            lowerName.includes('.pptx')
        ) {
            return pptIcon;
        } else if (
            contentType.includes('spreadsheet') ||
            contentType.includes('excel') ||
            lowerName.includes('.xls') ||
            lowerName.includes('.xlsx')
        ) {
            return sheetsIcon;
        } else if (
            contentType.includes('word') ||
            contentType.includes('document') ||
            lowerName.includes('.doc') ||
            lowerName.includes('.docx')
        ) {
            return googleDocsIcon;
        } else {
            return pdfIcon; // default fallback icon
        }
    };
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await listAll(documentListRef);

                const filesWithMeta = await Promise.all(
                    res.items.map(async (item) => {
                        try {
                            const [url, metadata] = await Promise.all([
                                getDownloadURL(item),
                                getMetadata(item),
                            ]);

                            return {
                                url,
                                contentType: metadata.contentType,
                                name: item.name,
                            };
                        } catch (err) {
                            console.error(`Error fetching metadata for ${item.name}:`, err);
                            return null; // skip if something went wrong
                        }
                    })
                );

                setDataList(filesWithMeta);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchFiles();
    }, [firebase]);

    return (
        <div className="parent-cont w-full min-h-screen flex bg-gray-800">
            <SidebarComp />

            <div className='min-h-screen flex flex-col items-center justify-evenly text-white'>
                {/* <div className="upload-area w-1/4 flex flex-col">
                    <input type="file" ref={fileInputRef} onChange={(e) => { setData(e.target.files[0]) }} name="" id="" className="w-30 bg-indigo-600 text-white my-10 py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400" />

                    <button
                        className="w-30 bg-indigo-600 text-white my-10 py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        onClick={uploadFile}
                    >
                        Upload file
                    </button>
                </div> */}
                <DropzoneUploader path={folderPath} onUploadComplete={fetchFiles} />

                <div className="w-full flex flex-col items-center justify-center text-center pt-10">
                    <h1 className='text-3xl'>Your Documents here</h1>
                    <div className="w-auto h-auto flex flex-wrap items-center justify-center mt-8">

                        {dataList && dataList.length > 0 ?
                            (dataList.map((file, index) => (
                                <div key={index} className='w-[200px] h-[200px] flex flex-col items-center justify-center text-center gap-4 my-4 bg-gray-700 rounded-xl p-4 m-4 '>
                                    <img src={getFileIcon(file.contentType, file.name)} alt="icon" className='h-30 w-30' />
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-100
                                        hover:text-indigo-200"
                                    >
                                        {(() => {
                                            const originalName = file.name.split(timestamp)[0];
                                            const dotIndex = originalName.lastIndexOf('.');
                                            return dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName;
                                        })()}
                                    </a>
                                </div>
                            ))) : (<h1 className='text-white text-5xl text-center'>Loading....</h1>)
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DocumentsPage