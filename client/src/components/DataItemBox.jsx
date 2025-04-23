import React, { useState, useEffect, useRef, useContext } from 'react';
import { FiMoreVertical, FiDownload, FiTrash2 } from 'react-icons/fi';
import { useFirebase } from '../context/Firebase';
import DeleteCard from './DeletePopUpCard';
import { usePopUpContext } from '../context/PopUpContext';

const DataItemBox = ({file, index, isMenuOpen, onToggleMenu, menuRef, localStorageName,}) => {

  const popupContext = usePopUpContext();
  const [showCard, setShowCard] = useState(false);

  const handleDelete = async () => {
    popupContext.setDeleteFile(file);
    popupContext.setShowDeleteCard(true);

    // setShowCard(true);
    // await firebase.deleteItem( folderPath, `${folderPath}${file.name}`, localStorageName);
    // onToggleMenu();
    // if (onDeleteToast) onDeleteToast(); // 👈 trigger toast
  }


  const handleFileName = () => {
    const fileName = file.name;
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex !== -1) {
      return fileName.slice(0, dotIndex)
    }
    return fileName
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.target = '_blank'
    link.download = file.name;
    link.click();
    // setShowMenu(false);
    onToggleMenu();
  };

  useEffect(() => {
    // console.log(popupContext.showDeleteCard)
  }, [popupContext.showDeleteCard])

  return (
    <div
      key={index}
      className="relative h-[150px] min-w-[150px] flex flex-col items-center justify-center gap-4 dark:bg-gray-700 bg-white rounded-xl p-4 dark:text-indigo-100 text-black pt-10 "
    >
      {/* 3-dot menu button */}
      <div className="absolute top-3 right-3">
        <button ref={menuRef} onClick={onToggleMenu} className='w-4 h-4 cursor-pointer'>
          <FiMoreVertical className="dark:text-white text-gray-800" size={20} />
        </button>

        {isMenuOpen && (
          <div ref={menuRef} className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-10 ">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm text-blue-500 cursor-pointer"
            >
              <FiDownload /> Download
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm text-orange-500 cursor-pointer"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="flex h-full w-full md:items-start items-center md:justify-center justify-start ">

        <a href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-20 "
        >
          <img
            src={file.icon}
            alt="icon"
            className="w-3/4 object-contain"
          />
        </a>


        <div className="data-box w-1/2 h-full flex flex-col justify-between  items-center pt-2 text-pretty">
          {/* <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-200 text-[12px] md:text-sm text-left w-3/4"
          >
            {handleFileName()}
          </a> */}
          <p className="text-[12px] md:text-sm text-left line-clamp-2 w-3/4 ">
          {handleFileName()}
          </p>
        </div>
      </div>
      <div className="w-full">
        <p className='text-xs text-right w-full'>{file.size}</p>
        </div>
    </div>
  );
};

export default DataItemBox
