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
            <div className="sm:hidden p-4">
                <SidebarCross isChecked={isSidebarOpen} onChange={handleCross} />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-around">
                {/* Sidebar */}
                <div className={`${isSidebarOpen ? 'block' : 'hidden'} sm:block h-screen w-62 lg:w-72 `}>
                    <div className="flex items-center justify-start mx-6 mt-10">
                        <img className="h-10" src={logoImg} alt="Logo" />
                        <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
                            MyXpace
                        </span>
                    </div>

                    <nav className="mt-10 px-6">
                        <NavLink
                            to="/documents"
                            className={({ isActive }) =>
                                `flex items-center p-2 my-6 transition-colors duration-200 rounded-lg ${isActive
                                    ? 'bg-gray-600 text-blue-800 dark:text-white'
                                    : 'text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600'
                                }`
                            }
                        >
                            <img src={documentImg} alt="Documents" className="h-[24px]" />
                            <span className="mx-4 text-lg font-normal">Files</span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>

                        <NavLink
                            to="/media"
                            className={({ isActive }) =>
                                `flex items-center p-2 my-6 transition-colors duration-200 rounded-lg ${isActive
                                    ? 'bg-gray-600 text-blue-800 dark:text-white'
                                    : 'text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600'
                                }`
                            }
                        >
                            <img src={mediaImg} alt="Media" className="h-[24px]" />
                            <span className="mx-4 text-lg font-normal">Media</span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>
                    </nav>

                    <div className="absolute bottom-0 my-10 px-6">
                        <button
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <img src={logoutImg} alt="Logout" className="h-[24px]" />
                            <span className="mx-4 font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarComp;
