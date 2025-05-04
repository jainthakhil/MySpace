import React, { useState, useEffect, useRef } from 'react'
import DataItemBox from './DataItemBox';
import Loader from './Loader';

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

    const [showNoFilesMessage, setShowNoFilesMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (dataList && dataList.length === 0) {
                setShowNoFilesMessage(true);
            }
        }, 5000); // 10 seconds

        return () => clearTimeout(timer);
    }, [dataList]);

    return (
        <div className="w-full h-auto  p-4 sm:p-6 md:p-8 lg:p-10">
            {/* "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 justify-items-stretch " */}
            {dataList && dataList.length > 0 ? (
                <div className="w-full grid justify-center md:grid-cols-[repeat(auto-fit,_minmax(120px,150px))] gap-4 md:gap-6  grid-cols-[repeat(auto-fit,_minmax(100px,120px))]">
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
            ) : showNoFilesMessage ? (
                <p className="text-center text-gray-500 mt-6">No files found.</p>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default DataGrid