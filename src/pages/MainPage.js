import React , {useState} from 'react'

import BetterFile from './Home/BetterFile.js'

import ".././css/App.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Joyride from 'react-joyride';
const MainPage = () => {
  const [fileUpload, setFileUpload] = useState(null)  ;
   
    const [ spinner , setSpinner] = useState( true ) ;  
    const [ fileName, setFileName] = useState("") ; 
  return (
    <div id='mainPageDiv'  >
       <ToastContainer /> 
        <BetterFile fileUpload={fileUpload} setFileUpload={setFileUpload} spinner={spinner} fileName={fileName} setFileName={setFileName}
       setSpinner={setSpinner} />
    </div>
    
  )
}

export default MainPage