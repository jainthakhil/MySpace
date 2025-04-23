import React, { useState, useEffect, useRef } from 'react'
import DataItemBox from './DataItemBox';
import Loader from './Loader';
import DropzoneUploader from './UploadComponent';
const DataGrid = (prop) => {
    const dataList = prop.dataList;
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const menuRefs = useRef([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                openMenuIndex !== null &&
                menuRefs.current[openMenuIndex] &&
                !menuRefs.current[openMenuIndex].contains(event.target)
            ) {
                setOpenMenuIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenuIndex]);
    return (
        <div className="w-full h-auto p-4 sm:p-6 md:p-8 lg:p-10 akkuu">
            {/* "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 justify-items-stretch " */}
            {dataList && dataList.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,200px))] gap-6 mt-8">
                    {dataList.map((file, index) => (
                        <DataItemBox
                            key={index}
                            file={file}
                            // folderPath={folderPath}
                            isMenuOpen={openMenuIndex === index}
                            onToggleMenu={() =>
                                setOpenMenuIndex(openMenuIndex === index ? null : index)
                            }
                            menuRef={(el) => (menuRefs.current[index] = el)}
                            localStorageName="documentDataFiles"
                        />
                      
                    ))}
                    {/* <DropzoneUploader path={prop.folderPath} /> */}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default DataGrid