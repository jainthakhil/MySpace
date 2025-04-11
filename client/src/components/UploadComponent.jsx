import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useFirebase } from '../context/Firebase.jsx';
import SidebarComp from './SidebarComp.jsx';

const DropzoneUploader = ({ path, onUploadComplete}) => {
  const [progress, setProgress] = useState(0);
  // const [uploadedUrl, setUploadedUrl] = useState(null);
  const firebase = useFirebase();
  const firebaseApp = firebase.firebaseApp;
  const uploadedUrl = firebase.uploadedUrl
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    firebase.uploadFile(file, path);

    

    // const storage = getStorage(firebaseApp);
    // const dataRef = ref(storage, `${path}/${file.name}`);

    // const uploadTask = uploadBytesResumable(dataRef, file);

    // uploadTask.on(
    //   'state_changed',
    //   (snapshot) => {
    //     const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     setProgress(Math.round(percent));
    //   },
    //   (error) => {
    //     console.error('Upload error:', error);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       setUploadedUrl(downloadURL);
    //       if (onUploadComplete) onUploadComplete();
    //     });
    //   }
    // );

  }, []);

  useEffect(() => {
    let timer;
    if (uploadedUrl) {
      timer = setTimeout(() => {
        firebase.setUploadedUrl('');
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [uploadedUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full flex bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-col flex-grow items-center justify-center p-10">
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center w-full min-w-100 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Supported: PDF, DOCX, PPTX, XLSX
            </p>
          </div>
        </div>

        {/* Progress and Result */}
        <div className="mt-6 text-center">
          {firebase.progress > 0 && firebase.progress < 100 && (
            <div className="text-sm text-gray-700 dark:text-green-300">
              Uploading complete {firebase.progress}%
            </div>
          )}

          {uploadedUrl && (
            <div className="mt-4">
              <p className="text-green-600 dark:text-green-400 text-sm">Uploaded Successfully!</p>
              {/* <a
                href={uploadedUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                View File
              </a> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropzoneUploader;
