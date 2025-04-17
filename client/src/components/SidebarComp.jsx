// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import logoImg from '../assets/logo.png';
// import mediaImg from '../assets/mediaImg.png';
// import logoutImg from '../assets/logoutImg.png';
// import documentImg from '../assets/documentImg.png';
// import { useFirebase } from '../context/Firebase';

// const SidebarComp = () => {
//     const firebase = useFirebase();
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         await firebase.logOut();
//         localStorage.clear();
//         navigate('/signin');
//     };
//     return (
//         <div className="relative bg-white dark:bg-gray-900">
//             <div className="flex flex-col sm:flex-row sm:justify-around">
//                 <div className="h-screen w-62 lg:w-72">
//                     <div className="flex items-center justify-start mx-6 mt-10">
//                         <img className="h-10" src={logoImg} />
//                         <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
//                             MyXpace
//                         </span>
//                     </div>

//                     <nav className="mt-10 px-6">
//                         <NavLink
//                             to="/documents"
//                             className={({ isActive }) =>
//                                 `flex items-center p-2 my-6 transition-colors duration-200 rounded-lg ${isActive
//                                     ? 'bg-gray-600 text-blue-800 bg-gray-600 dark:text-white'
//                                     : 'text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600'
//                                 }`
//                             }
//                         >
//                             <img src={documentImg} alt="Documents" className="h-[24px]" />
//                             <span className="mx-4 text-lg font-normal">Files</span>
//                             <span className="flex-grow text-right"></span>
//                         </NavLink>

//                         <NavLink
//                             to="/media"
//                             className={({ isActive }) =>
//                                 `flex items-center p-2 my-6 transition-colors duration-200 rounded-lg ${isActive
//                                     ? 'bg-gray-600 text-blue-800 bg-gray-600 dark:text-white'
//                                     : 'text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600'
//                                 }`
//                             }
//                         >
//                             <img src={mediaImg} alt="Media" className="h-[24px]" />
//                             <span className="mx-4 text-lg font-normal">Media</span>
//                             <span className="flex-grow text-right"></span>
//                         </NavLink>
//                     </nav>

//                     <div className="absolute bottom-0 my-10">
//                         <button
//                             className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8 cursor-pointer"
//                             onClick={handleLogout}
//                         >
//                             <img src={logoutImg} alt="Logout" className="h-[24px]" />
//                             <span className="mx-4 font-medium">Logout</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SidebarComp;
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import mediaImg from '../assets/mediaImg.png';
import logoutImg from '../assets/logoutImg.png';
import documentImg from '../assets/documentImg.png';
import { useFirebase } from '../context/Firebase';
import SidebarCross from '../components/SidebarCross';

const SidebarComp = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = async () => {
        await firebase.logOut();
        localStorage.clear();
        navigate('/signin');
    };

    const handleCross = () => {
        setIsSidebarOpen(prev => !prev);
    };

    useEffect(() => {
        console.log("Sidebar state changed:", isSidebarOpen);
    }, [isSidebarOpen]);

    return (
        <div className="relative bg-white dark:bg-gray-900 ">
            {/* Hamburger Button */}
            <div className="sm:hidden p-4 ">
                <SidebarCross isChecked={isSidebarOpen} onChange={handleCross} />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-around">
                {/* Sidebar */}
                <div className={`${isSidebarOpen ? 'block' : 'hidden'} sm:block h-screen w-42 md:w-48 lg:w-52 `}>
                    <div className="w-full flex justify-flex-start p-4 ">
                        <img className="h-8" src={logoImg} alt="Logo" />
                        <span className="text-gray-600 dark:text-gray-300 ml-2 text-xl font-bold">
                            MyXpace
                        </span>
                    </div>

                    <nav className="mt-10">
                        <div>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center justify-start w-full px-4 py-2 my-2 font-thin uppercase transition-colors duration-200 ${isActive
                                        ? 'text-blue-500 border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800'
                                        : 'text-gray-500 dark:text-gray-200 hover:text-blue-500 duration-200 text-gray-800 dark:text-gray-100'
                                    }`
                                }
                            >
                                <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="transition-colors duration-300"
  >
    <path d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" />
  </svg>
                                <span className="mx-4 text-md font-normal">Home</span>
                                <span className="flex-grow text-right"></span>
                            </NavLink>


                            <NavLink
                                to="/documents"
                                className={({ isActive }) =>
                                    `flex items-center justify-start w-full px-4 py-2 my-2 font-thin uppercase transition-colors duration-200 ${isActive
                                        ? 'text-blue-500 border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800'
                                        : 'text-gray-500 dark:text-gray-200 hover:text-blue-500 duration-200 text-gray-800 dark:text-gray-100'
                                    }`
                                }
                            >
                                <svg  xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="transition-colors duration-300">  <path d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z" /></svg>
                                <span className="mx-4 text-md font-normal">Files</span>
                                <span className="flex-grow text-right"></span>
                            </NavLink>

                            <NavLink
                                to="/media"
                                className={({ isActive }) =>
                                    `flex items-center justify-start w-full px-4 py-2 my-2 font-thin uppercase transition-colors duration-200 ${isActive
                                        ? 'text-blue-500 border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800'
                                        : 'text-gray-500 dark:text-gray-200 hover:text-blue-500 duration-200 text-gray-800 dark:text-gray-100'
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="transition-colors duration-300"><path  fillRule="evenodd"
      clipRule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" /></svg>

                                <span className="mx-4 text-md font-normal">Media</span>
                                <span className="flex-grow text-right"></span>
                            </NavLink>
                        </div>
                    </nav>

                    <div className="absolute bottom-0 my-10 px-6">
                        <button
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center p-2 cursor-pointer
                            "
                            onClick={handleLogout}
                        >
                            {/* <img src={logoutImg} alt="Logout" className="h-[24px]" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 576 512" fill='currentColor'><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                            <span className="mx-4 font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarComp;
