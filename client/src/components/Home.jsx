import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase, storage } from '../context/Firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import folderImg from '../assets/folder.png'
import photoImg from '../assets/photo.png'
import DocViewerPage from './DocViewer'
import { SidebarWithLogo } from './Sidebar'
import SidebarComp from './SidebarComp'

const Home = () => {
  const [data, setData] = useState(null);
  const [dataList, setDataList] = useState([]);
  const firebase = useFirebase();
  const navigate = useNavigate();

  const date = new Date();
  const timestamp = date.getTime();

  const uploadListRef = ref(storage, 'newUploads/')

  const uploadFile = () => {
    if (data === null) return;
    const dataRef = ref(storage, `newUploads/${data.name + timestamp}`)
    uploadBytes(dataRef, data)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setDataList((prev) => [...prev, url])
        })
        alert("upload Successfull");
      })
  };
  const folderData = firebase.fetchFiles('documents');

  const storedUser = JSON.parse(localStorage.getItem('myspace-user'));
  const username = storedUser.displayName;

  useEffect(() => {
    
    if (!storedUser) {
      console.log("user is not logged in", firebase.isLoggedIn)
      navigate('/signin')
      return
    }
    const loadFiles = async () => {
      const data = await firebase.fetchFiles('documents/');
      setDataList(data);
    };

    loadFiles();
    console.log("data list is : ",dataList)

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
    <div className="parent-cont w-full min-h-screen flex bg-gray-700">
    <SidebarComp/>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">

        <button
          className="w-30 bg-indigo-600 text-white py-2 px-4 m-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 self-end"
          onClick={handleLogout}
        >
          Logout
        </button>
        <h1 className='text-5xl m-10'>Hello, {username}</h1>
        <p className='text-2xl m-5'>Welcome to MySpace</p>

        <div className="cont w-full h-auto flex">

          <div className="files-area w-1/2 h-auto flex items-center justify-evenly">

            <button className="flex flex-col items-center justify-center gap-2 p-8 bg-indigo-600  rounded-full   aspect-square w-1/3 hover:bg-indigo-700"
              onClick={() => { navigate('/documents') }}
            >
              <img src={folderImg} alt="icon" className="object-contain " />
            </button>

            <button className="flex flex-col items-center justify-center gap-2 p-8 bg-indigo-600  rounded-full   aspect-square w-1/3 hover:bg-indigo-700"
              onClick={() => { navigate('/media') }}
            >
              <img src={photoImg} alt="icon" className="object-contain " />
            </button>

          </div>
          <div className="upload-area w-1/2 flex flex-col">
            <input type="file" onChange={(e) => { setData(e.target.files[0]) }} name="" id="" className="w-30 bg-indigo-600 text-white my-10 py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400" />

            <button
              className="w-30 bg-indigo-600 text-white my-10 py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={uploadFile}
            >
              Upload file
            </button>
            <button
              className="w-30 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={() => { navigate('/upload') }}
            >
              Go to uploads
            </button>
          </div>
        </div>
        <ul className="space-y-2">
        {dataList.map((file, idx) => (
          <li key={idx} className="border p-2 rounded bg-gray-100">
            <p><strong>Name:</strong> {file.name}</p>
            <p><strong>Type:</strong> {file.contentType}</p>
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View File
            </a>
          </li>
        ))}
      </ul>
        
      </div>
    </div>
  )
}

export default Home