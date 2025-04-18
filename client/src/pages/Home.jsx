import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase, storage } from '../context/Firebase'
import folderImg from '../assets/folder.png'
import photoImg from '../assets/photo.png'
import SidebarComp from '../components/SidebarComp'
import Loader from '../components/Loader'

const Home = () => {

  const firebase = useFirebase();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('myspace-user'));
  const username = storedUser.displayName;

  const folders = firebase.folders;

  useEffect(() => {

    if (!storedUser) {
      console.log("user is not logged in", firebase.isLoggedIn)
      navigate('/signin')
      return
    }

    if (folders) {
      console.log(folders);
    }


    // listAll(uploadListRef).then(async (res) => {
    //   const urls = await Promise.all(
    //     res.items.map((item) => getDownloadURL(item))
    //   );
    //   setDataList(urls); // 🔥 Replace instead of appending
    // });


  }, [firebase, navigate])

  // if(folderData){
  //   console.log("folder data : ", folderData)

  // }

  const handleLogout = async () => {
    await firebase.logOut();
    localStorage.clear();
    navigate('/signin')
  }
  // console.log(firebase.isLoggedIn)

  return (
    <div className="parent-cont w-full min-h-screen flex ">
      <SidebarComp />
      <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-center">
        <h1 className='md:text-5xl text-lg pt-4'>Hello, {username}</h1>
        <p className='md:text-2xl text-md m-5'>Welcome to MyXpace</p>

        <div className="w-full h-auto p-4 sm:p-6 md:p-8 lg:p-10">

          {/* <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          {folders.map((folder) => (
                <div key={folder} className="h-auto  md:w-full flex flex-col justify-center items-start gap-4 dark:bg-gray-700 bg-gray-200 rounded-xl p-4 shadow-xl/30 dark:text-indigo-100 text-black overflow-hidden ">
                <img src={folderImg} className="h-15 md:h-20 aspect-square object-contain"  alt="" />
                   <p className='text-xs'>{folder}</p>
                </div>
              ))}
          </div> */}

          { folders && folders.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8 ">
                            {folders.map((folder) => (
                <div key={folder} className="h-auto flex flex-col justify-center items-start gap-4 dark:bg-gray-700 bg-gray-200 rounded-xl p-4 shadow-xl/30 dark:text-indigo-100 text-black overflow-hidden ">
                <img src={folderImg} className="h-15 md:h-20 aspect-square object-contain"  alt="" />
                   <p className='text-xs'>{folder}</p>
                </div>
              ))}
                            </div>
                        ) : (
                            <Loader />
                        )}
          
        </div>
      </div>
    </div>
  )
}

export default Home