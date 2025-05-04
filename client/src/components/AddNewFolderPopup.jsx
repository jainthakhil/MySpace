import React, { useState, useEffect } from "react";
import { usePopUpContext } from "../context/PopUpContext";
import { ref } from "firebase/storage";
import { useFirebase } from '../context/Firebase'

const AddNewFolderPopup = () => {
  const [folderName, setFolderName] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const firebase = useFirebase();
  const popupContext = usePopUpContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!folderName.trim() || !file) {
      alert("Please provide both, folder name and file :(");
      return
    }
    const cleanFolderName = folderName.trim();

    // setUploading(true);
    // popupContext.setShowAddNewFolderCard(false);

    try {
      await firebase.uploadFile(file, cleanFolderName)
      popupContext.setShowSuccessCard(true);
      // const fileRef = ref(storage, `${fileName}/${file.name}`);
      // await uploadBytes(fileRef, file);
      // alert(`File uploaded to folder "${folderName}"`);
      setFile(null);
      setFolderName("");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file.");
    } finally {
      setUploading(true);
      popupContext.setShowAddNewFolderCard(false)
      console.log("folder created successfully");

      setUploading(false);
    }
  };

  const handleClose = () => {
    popupContext.setShowAddNewFolderCard(false)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg relative">
      <button className="absolute top-4 right-4 cursor-pointer" onClick={handleClose}>

        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6">
          <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
        </svg>

      </button>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Upload File to Folder</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100 cursor-pointer"
        />

        <button
          type="submit"
          disabled={uploading}
          className={`w-full ${uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            } text-white py-2 px-4 rounded-md transition`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default AddNewFolderPopup;
