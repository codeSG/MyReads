import React , {useState} from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import BetterFile from './BetterFile'
import File from './File'
const MainPage = () => {
  const [fileUpload, setFileUpload] = useState(null)  ;
    // const [fileList ,setFileList] = useState( []) ;
    const [ spinner , setSpinner] = useState( true ) ;  
    const [ fileName, setFileName] = useState("") ; 
    
  return (
    <div id='mainPageDiv'  >
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