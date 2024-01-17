import React , {useState} from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
const MainPage = () => {
  const [fileUpload, setFileUpload] = useState(null)  ;
    const [fileList ,setFileList] = useState( [] ) ;
    const [ spinner , setSpinner] = useState( false ) ;  
    const [ fileName, setFileName] = useState("") ; 
    const [hashID, setHashID ] = useState("") ; 
  return (
    <div >
        <Header fileUpload={fileUpload} 
        setFileUpload={setFileUpload} fileList={fileList} setFileList={setFileList}
        setSpinner={setSpinner} hashID={hashID} setHashID={setHashID}/>
        <Outlet context={[fileUpload, setFileUpload, fileList,setFileList,spinner, fileName, setFileName,
        hashID, setHashID]}/>
    </div>
    
  )
}

export default MainPage