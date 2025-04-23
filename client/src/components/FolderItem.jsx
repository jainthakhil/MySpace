import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import folderImg from '../assets/folder.png'
import HoverFolderCard from './HoverFolderCard';




const FolderItem = (fileData, index) => {
    const firebase = useFirebase();
    const fileName = fileData.fileData.name;
    // console.log(fileName);
    const url = "/folder/"+fileName;
    const totalFiles = fileData.fileData.files.length; 
    const totalSizeMB = fileData.fileData.files.reduce((sum, file) => {
        const sizeString = file.size || "0 MB";
        const [num, unit] = sizeString.split(" "); // e.g., ['0.01', 'MB']
        const number = parseFloat(num);
        // Convert to MB if other units are possible
        let sizeInMB = number;
        if (unit === "KB") sizeInMB = number / 1024;
        if (unit === "GB") sizeInMB = number * 1024;
      
        return sum + sizeInMB;
      }, 0);
    // fileData.fileData.files.map((item)=> size+= item.size);
    
  return (
      <div key={index}>

     
    <NavLink 
          to={url}
          className="relative min-w-[150px] h-[180px] flex flex-col items-center justify-center gap-4 dark:bg-gray-700 bg-white rounded-xl p-4 dark:text-indigo-100 text-gray-600 font-sans hover:scale-102 transition-scale ease-in duration-100  "
        >
          {/* 3-dot menu button */}
    
          <div className="flex flex-col  w-full items-left justify-center text-center ">
    
              <img
                src={fileData.fileData.icon}
                alt="icon"
                className="h-25 w-fit aspect-square object-contain p-2"
              />

              {/* <HoverFolderCard/> */}
    
            <div className="data-box w-full h-full flex flex-col items-center justify-between p-2 text-pretty">

              <h2 className="w-full md:text-lg text-center capitalize text-left">
              {fileData.fileData.name}
              </h2>

              <div className=" w-full flex items-center justify-between  mt-2">
              <p className=' text-[12px]'>
              {totalFiles} {totalFiles === 1 ? "File" : "Files"}
              </p>
              <p className='text-[12px]'>{totalSizeMB.toFixed(2)} MB</p>

              </div>
              
            </div>
          </div>
        </NavLink>
        </div>
      );
}

export default FolderItem