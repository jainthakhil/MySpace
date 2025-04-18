import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFirebase } from '../context/Firebase.jsx';
import SuccessCard from './SucessMessage.jsx';


const DropzoneUploader = ({ path, onUploadComplete}) => {
  const firebase = useFirebase();
  const firebaseApp = firebase.firebaseApp;
  const uploadedUrl = firebase.uploadedUrl


  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    firebase.uploadFile(file, path, () => {
      if (onUploadComplete) onUploadComplete(); // fire the prop callback
    });
  }, [[firebase, path, onUploadComplete]]);

  useEffect(() => {
    let timer;
    if (uploadedUrl) {
      timer = setTimeout(() => {
        firebase.setUploadedUrl('');
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [uploadedUrl ]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full flex bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col flex-grow items-center justify-center px-10">
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center w-full min-w-50 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center p-6 text-center ">
            <svg
              className="w-10 h-10 mb-3 dark:text-gray-400 text-blue-400"
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
            <SuccessCard/>
            /* <div className="mt-4">
              <p className="text-green-600 dark:text-green-400 text-sm">Uploaded Successfully!</p>
             
            </div> */
          )}
        </div>
      </div>
    </div>
  );
};

export default DropzoneUploader;
