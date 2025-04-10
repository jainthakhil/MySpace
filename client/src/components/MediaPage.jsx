import { React, useEffect, useState } from 'react'
import { useFirebase, storage } from '../context/Firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import SidebarComp from './SidebarComp';

const MediaPage = () => {
  const [data, setData] = useState(null);
      const [dataList, setDataList] = useState([]);
      const firebase = useFirebase();
  
      const date = new Date();
      const timestamp = date.getTime();
  
      const mediaListRef = ref(storage, 'media/')
  
      const uploadFile = () => {
          if (data === null) return;
          const dataRef = ref(storage, `media/${data.name + timestamp}`)
          uploadBytes(dataRef, data)
              .then((snapshot) => {
                  getDownloadURL(snapshot.ref).then((url) => {
                      setDataList((prev) => [...prev, url])
                  })
                  alert("upload Successfull");
              })
      };
      useEffect(() => {
        const imgRef = ref(storage, 'media/akhilghibli.jpg1744224468338')
         getMetadata(imgRef).then((metadata)=>{
                    console.log(metadata)
                })
                .catch((error)=>console.log(error));
          listAll(mediaListRef).then(async (res) => {
              const urls = await Promise.all(
                  res.items.map((item) => getDownloadURL(item))
              );
              setDataList(urls); // 🔥 Replace instead of appending
          });
      }, [firebase])
  
      return (
        <div className="parent-cont  w-full min-h-screen flex bg-gray-800">
        <SidebarComp/>
        <div className='w-full min-h-screen flex items-center justify-center '>
              {
                  dataList.map((url, index) => {
                      return <img src={url} className="w-20" alt="" />
                  })
              }
              <div className="upload-area w-1/2 flex flex-col">
                <input type="file" onChange={(e) => { setData(e.target.files[0]) }} name="" id="" className="w-30 bg-indigo-600 text-white my-10 py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400" />

                <button
                    className="w-30 bg-indigo-600 text-white my-10 py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onClick={uploadFile}
                >
                    Upload file
                </button>
            </div>
          </div>

        </div>
          
      )
}

export default MediaPage