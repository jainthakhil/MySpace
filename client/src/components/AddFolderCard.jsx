import React from 'react';
import styled from 'styled-components';
import { usePopUpContext } from '../context/PopUpContext';

const AddFolderCard = () => {
    const popupContext = usePopUpContext();

    const handleAddNewFolder = () => {
        popupContext.setShowAddNewFolderCard(true);
    }
    return (
      <StyledWrapper>
        <div className="card h-[120px] md:min-w-[150px] md:h-[180px] rounded-xl ">
          <button className="card2 w-full h-[120px] md:min-w-[150px] md:h-[180px]  flex items-center  justify-center bg-white dark:bg-sidebar cursor-pointer dark:text-myWhite text-gray-700 rounded-xl" onClick={handleAddNewFolder}>
          {/* Create new Folder */}
          {/* <img src={addFolderImg}  className='h-1/2' alt="" />
           */}
      

           <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-600 dark:text-myWhite w-[60px] md:w-[100px]"
          >
            <path
              d="M10 14H12M12 14H14M12 14V16M12 14V12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975M21.9913 16C21.9554 18.4796 21.7715 19.8853 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          </button>
        </div>
      </StyledWrapper>
    );
  }
  
  const StyledWrapper = styled.div`
    .card {
     ${'' /* width: 190px; */}
     ${'' /* height: 254px; */}
     ${'' /* background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%); */}
     background-image: linear-gradient(163deg, #4294FF 0%, #4294FF 100%);
     ${'' /* border-radius: 20px; */}
     transition: all .3s;
    }
  
    .card2 {
     ${'' /* width: 190px; */}
     ${'' /* height: 254px; */}
     ${'' /* background-color: #1a1a1a; */}
     ${'' /* border-radius:20px; */}
     transition: all .2s;
    }
  
    .card2:hover {
     transform: scale(0.98);
     ${'' /* border-radius: 20px; */}
    }
  
    .card:hover {
     ${'' /* box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30); */}
     box-shadow: 0px 0px 20px 1px #4294FF;


    }`;
  
  export default AddFolderCard;
