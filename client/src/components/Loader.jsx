import React from 'react'

const Loader = () => {
    return (
        // <div>
        //     <div className="loading-wave">
        //         <div className="loading-bar"></div>
        //         <div className="loading-bar"></div>
        //         <div className="loading-bar"></div>
        //         <div className="loading-bar"></div>
        //     </div>

        // </div>
//   <div className="loader">
//   <span className="loader-text">loading</span>
//     <span className="load"></span>
// </div>
<div className="flex w-full h-full items-center justify-center">

<div className="wrapper">
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="shadow"></div>
    <div className="shadow"></div>
    <div className="shadow"></div>
</div>

</div>


    )
}

export default Loader