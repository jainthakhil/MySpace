import React, { useEffect, useState, useRef } from 'react'
import SidebarComp from '../components/SidebarComp';
import Header from '../components/Header';
import { useFirebase } from '../context/Firebase';
import { usePopUpContext } from '../context/PopUpContext';
import Loader from '../components/Loader';
import Truck from '../components/UploadingPopup';
import SubHeader from '../components/SubHeader';
import { useNavigate } from 'react-router-dom';

const MyUploadPage = () => {
    const [myFiles, setMyFiles] = useState(null);
    
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const menuRefs = useRef([]);
    const firebase = useFirebase();
    const navigate = useNavigate()
    const popupContext = usePopUpContext();
    const storedUser = JSON.parse(localStorage.getItem('myspace-user'));
    // const myFolder = storedUser.displayName; 

    // const folderPath = 'myuploads/';

    return (
        <div className="parent-cont w-full min-h-screen flex dark:bg-darkBack bg:white">
            <SidebarComp />
            <div className='w-full min-h-screen flex flex-col items-center text-black dark:text-white'>
                <Header />
                <SubHeader folderName="Account" />


            </div>
        </div>

    )
}

export default MyUploadPage