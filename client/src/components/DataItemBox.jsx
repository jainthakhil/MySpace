import React, { useState, useEffect } from 'react';
import { FiMoreVertical, FiDownload, FiTrash2 } from 'react-icons/fi';
import { useFirebase } from '../context/Firebase';

// const DataItemBox = ({file, getFileIcon, index}) => {
//     // console.log(file.name)
//     return (
//         <div
//             key={index}
//             className=" max-h-[200px] flex flex-col items-center justify-center text-center gap-4 bg-gray-700 rounded-xl p-10 overflow-hidden "
//         >
//             <img
//                 src={getFileIcon(file.contentType, file.name)}
//                 alt="icon"
//                 className="h-30 w-30"
//             />
//             <a
//                 href={file.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-indigo-100 hover:text-indigo-200 text-[12px]"
//             >
//                 {(() => {
//                     const fileName = file.name
//                     {/* const originalName = file.name.split(timestamp)[0]; */}
//                     const dotIndex = fileName.lastIndexOf(".");
//                     return dotIndex !== -1
//                         ? fileName.slice(0, dotIndex)
//                         : fileName;
//                 })()}
//             </a>
//         </div>
//     )
// }

const DataItemBox = ({ folderPath, file, getFileIcon, index }) => {
    const [showMenu, setShowMenu] = useState(false);
    const firebase = useFirebase();

    const handleDelete = async ()=>{
        await firebase.deleteItem( folderPath, `${folderPath}${file.name}`);
        setShowMenu(false);

    }
    // handleDelete = firebase.deleteItem(`media/${file.name}`)
  
    const toggleMenu = () => setShowMenu(prev => !prev);
  
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      link.click();
      setShowMenu(false);
    };

    // console.log(file)
  
    return (
      <div
        key={index}
        className="relative max-h-[200px] flex flex-col items-center justify-center text-center gap-4 bg-gray-700 rounded-xl p-10 overflow-hidden"
      >
        {/* 3-dot menu button */}
        <div className="absolute top-2 right-2">
          <button onClick={toggleMenu} className='w-4 h-4 cursor-pointer'>
            <FiMoreVertical className="text-white" size={20} />
          </button>
  
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-10 ">
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
  
        <img
          src={getFileIcon(file.contentType, file.name)}
          alt="icon"
          className="h-30 w-30"
        />
  
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-100 hover:text-indigo-200 text-[12px]"
        >
          {(() => {
            const fileName = file.name;
            const dotIndex = fileName.lastIndexOf('.');
            return dotIndex !== -1 ? fileName.slice(0, dotIndex) : fileName;
          })()}
        </a>
      </div>
    );
  };
  
export default DataItemBox