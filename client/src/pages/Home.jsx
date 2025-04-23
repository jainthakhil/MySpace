import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase, storage } from '../context/Firebase'
import { usePopUpContext } from '../context/PopUpContext';
import folderImg from '../assets/folder.png'
import photoImg from '../assets/photo.png'
import SidebarComp from '../components/SidebarComp'
import Loader from '../components/Loader'
import Header from '../components/Header'
import DataGrid from '../components/DataGrid'
import FolderItem from '../components/FolderItem'
import AddFolderCard from '../components/AddFolderCard'
import AddNewFolderPopup from '../components/AddNewFolderPopup'
import BackBtn from '../components/BackBtn';
import SubHeader from '../components/SubHeader';
import Truck from '../components/UploadingPopup';

const Home = () => {
  const [folders, setFolders] = useState(null);
  const [dataList, setDataList] = useState(null)

  const firebase = useFirebase();
  const navigate = useNavigate();
  const popupContext = usePopUpContext();

  const storedUser = JSON.parse(localStorage.getItem('myspace-user'));
  const username = storedUser?.displayName || "username";

  const loadFolders = async () => {
    const folderList = await firebase.getAllSharedUploads();
    // setFolders(folderList);
    setDataList(folderList)
  }

  useEffect(() => {
    if (!storedUser) {
      console.log("user is not logged in", firebase.isLoggedIn)
      navigate('/signin')
      return
    }
    loadFolders()
  }, [firebase, navigate])

  useEffect(() => {
    console.log(popupContext.reloadData)
    if (popupContext.reloadData) {
      loadFolders();
      popupContext.setReloadData(false);
    }

  }, [popupContext.reloadData])

  useEffect(() => {
          let timer;
          if (firebase.uploadedUrl) {
            timer = setTimeout(() => {
              popupContext.setShowSuccessCard(false);
            }, 1000);
          }
          return () => clearTimeout(timer);
        }, [firebase.uploadedUrl ]);

  const handleLogout = async () => {
    await firebase.logOut();
    localStorage.clear();
    navigate('/signin')
  }

  return (
    <div className="parent-cont w-full min-h-screen flex ">
      <SidebarComp />

      <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-center flex flex-col">
        <Header />
        {/* <div className='w-full h-20 flex items-center justify-center relative p-4'>
        <BackBtn/>
        <h1 className='md:text-5xl text-lg'> Public Folders</h1>
        </div> */}
        <SubHeader folderName = "Public Folders" />
       
        

        <div className="w-full h-auto p-4 sm:p-6 md:p-8 lg:p-10">

          {dataList && dataList.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,200px))] gap-6 ">
            <AddFolderCard />
              {dataList.map((folder, index) => (
                <FolderItem fileData={folder} key={index} />
              ))}
              {/* <AddFolderCard /> */}
            </div>
          ) : (
            <Loader />
          )}
        </div>

        {popupContext.showAddNewFolderCard && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
            <AddNewFolderPopup/>
            {/* <Form/> */}
          </div>
        )}

        {popupContext.showSuccessCard && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
                         <Truck />
                     </div>
                 )}

       

      </div>
    </div>
  )
}

export default Home