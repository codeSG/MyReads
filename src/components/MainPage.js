import React , {useState} from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
const MainPage = () => {
  const [fileUpload, setFileUpload] = useState(null)  ;
    const [fileList ,setFileList] = useState( [] ) ; 
  return (
    <div >
        <Header fileUpload={fileUpload} 
        setFileUpload={setFileUpload} fileList={fileList} setFileList={setFileList} />
        <Outlet context={[fileUpload, setFileUpload, fileList,setFileList]}/>
    </div>
    
  )
}

export default MainPage