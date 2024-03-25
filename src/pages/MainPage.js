import React , {useState} from 'react'

import BetterFile from './Home/BetterFile.js'
// import File from './File' ; 
import ".././css/App.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Joyride from 'react-joyride';
const MainPage = () => {
  const [fileUpload, setFileUpload] = useState(null)  ;
    // const [fileList ,setFileList] = useState( []) ;
    const [ spinner , setSpinner] = useState( true ) ;  
    const [ fileName, setFileName] = useState("") ; 
    const [runTour, setRunTour] = useState(true); // State for controlling Joyride
    // second-step
    const steps = [
      {
        target: '.first-step',
        content: 'This is the first step of the tour.',
        disableBeacon: true
      },
      {
        target: '.second-step',
        content: 'This is the second step of the tour.',
        disableBeacon: true
      },
      
     
      // Add more steps as needed
    ];
    const handleTourEnd = () => {
      // Handle the end of the tour, if needed
      setRunTour(false); // Stop the tour after it ends
    };
  return (
    <div id='mainPageDiv'  >
       {/* <Joyride 
           steps={steps}
          continuous={true}    
          showProgress={true}       
          showSkipButton={true}                      
          /> */}
       <ToastContainer /> 
        {/* <Header fileUpload={fileUpload} 
        setFileUpload={setFileUpload} fileList={fileList} setFileList={setFileList}
        setSpinner={setSpinner} hashID={hashID} setHashID={setHashID}/> */}
        {/* <File fileUpload={fileUpload} setFileUpload={setFileUpload} fileList={fileList} 
        setFileList={setFileList} spinner={spinner} fileName={fileName} setFileName={setFileName}
        hashID={hashID} setHashID={setHashID} /> */}
        <BetterFile fileUpload={fileUpload} setFileUpload={setFileUpload} spinner={spinner} fileName={fileName} setFileName={setFileName}
       setSpinner={setSpinner} />

    </div>
    
  )
}

export default MainPage