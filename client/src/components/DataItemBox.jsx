import React, { useState, useEffect, useRef, useContext } from 'react';
import { FiMoreVertical, FiDownload, FiTrash2 } from 'react-icons/fi';
import { useFirebase } from '../context/Firebase';
import DeleteCard from './DeletePopUpCard';
import { usePopUpContext } from '../context/PopUpContext';

const DataItemBox = ({ folderPath, file, index, isMenuOpen, onToggleMenu, menuRef, localStorageName, onDeleteToast }) => {

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
    console.log(popupContext.showDeleteCard)
  }, [popupContext.showDeleteCard])

  return (
    <div
      key={index}
      className="relative min-h-[200px] w-full flex flex-col items-center justify-center gap-4 bg-gray-700 rounded-xl p-4 shadow-xl/30 text-indigo-100 pt-10 "
    >
      {/* 3-dot menu button */}
      <div className="absolute top-3 right-3">
        <button ref={menuRef} onClick={onToggleMenu} className='w-4 h-4 cursor-pointer'>
          <FiMoreVertical className="text-white" size={20} />
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

      <div className="flex flex-col h-full w-full items-start justify-center d">

        <a href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-20 aspect-square"
        >
          <img
            src={file.icon}
            alt="icon"
            className="w-full h-full object-contain"
          />
        </a>


        <div className="data-box w-full h-full flex flex-col justify-between items-start pt-2 text-pretty">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-200 text-sm text-left w-3/4"
          >
            {handleFileName()}
          </a>

          <p className='text-xs text-right w-full'>{file.size}</p>

          

        </div>
      </div>
    </div>
  );
};

export default DataItemBox
