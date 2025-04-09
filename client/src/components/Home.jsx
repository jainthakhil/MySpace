import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase, storage } from '../context/Firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import folderImg from '../assets/folder.png'
import photoImg from '../assets/photo.png'

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
  
  const storedUser = JSON.parse(localStorage.getItem('myspace-user'));
  const username = storedUser.displayName;
  useEffect(() => {
    if (!storedUser) {
      console.log("user is not logged in", firebase.isLoggedIn)
      navigate('/signin')
      return
    }
    listAll(uploadListRef).then(async (res) => {
      //   console.log(res);
      //   res.items.forEach((item) => {
      //     getDownloadURL(item).then((url) => {
      //       setDataList((prev) => [...prev, url])
      //     });
      //   })
      //   console.log(dataList);
      // })
      const urls = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );
      setDataList(urls); // 🔥 Replace instead of appending
    });


  }, [firebase, navigate])
  console.log(firebase.isLoggedIn)
  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col justify-center items-center text-white">

    <button
            className="w-30 bg-indigo-600 text-white py-2 px-4 m-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 self-end"
            onClick={firebase.logOut}
          >
            Logout
          </button>
      <h1 className='text-5xl m-10'>Hello, {username}</h1>
      <p className='text-2xl m-5'>Welcome to MySpace</p>

      <div className="cont w-full h-auto flex">

        <div className="files-area w-1/2 h-auto flex items-center justify-evenly">

          <button className="flex flex-col items-center justify-center gap-2 p-8 bg-indigo-600  rounded-full   aspect-square w-1/3 hover:bg-indigo-700" 
          onClick={()=>{navigate('/documents')}}
          >
            <img src={folderImg} alt="icon" className="object-contain " />
          </button>
          
          <button className="flex flex-col items-center justify-center gap-2 p-8 bg-indigo-600  rounded-full   aspect-square w-1/3 hover:bg-indigo-700" 
          onClick={()=>{navigate('/media')}}
          >
            <img src={photoImg} alt="icon" className="object-contain " />
          </button>

          {
            dataList.map((url) => {
              {/* return <img src={url} className="size-fit" alt="" />   */ }
              {/* return<iframe
    src={url}
    frameBorder="0"
    scrolling="auto"
    height="100%"
    width="100%"
></iframe> */}

              {/* return <iframe
                src={`https://docs.google.com/gview?url=${url}&embedded=true`}
                className="rounded-lg shadow h-[200px] w-1/4 mx-4 "
              /> */}

            })
          }

        </div>
        <div className="upload-area w-1/2 flex flex-col">
          <input type="file" onChange={(e) => { setData(e.target.files[0]) }} name="" id="" className="w-30 bg-indigo-600 text-white my-10 py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400" />

          <button
            className="w-30 bg-indigo-600 text-white my-10 py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onClick={uploadFile}
          >
            Upload file
          </button>
          {/* <button
            className="w-30 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onClick={firebase.logOut}
          >
            Logout
          </button> */}

          <button
            className="w-30 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onClick={() => { navigate('/upload') }}
          >
            Go to uploads
          </button>

        </div>
      </div>
    </div>
  )
}

export default Home