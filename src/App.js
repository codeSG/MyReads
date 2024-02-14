import React from 'react';
import ReactDOM from 'react-dom/client';


import {RouterProvider, createBrowserRouter} from "react-router-dom"
import ShowFile from "./components/ShowFile";
import { createContext ,  useState} from 'react';
import File from './components/File';
import Login from './components/Login';
 import Header from "./components/Header" ; 
import MainPage from "./components/MainPage";
// import PdfViewer from './components/PdfViewer';
import WrapPage from './components/WrapPage';
import BetterFile from './components/BetterFile';
import SignUp from "./components/SignUp" ;


 const ContextInfo = createContext() ; 
const appRouter = createBrowserRouter([
  {
    path :'/' , 
    element : <SignUp/>
  }, 
  
  {
    path : "/login" , 
    element : <Login/>
  },
  {
    path : "/file" , 
    // element : <BetterFile/>
    element :  <MainPage/> , 
    
  },{
    path:"/file/showfile",
    element : <WrapPage/>
  }
])
function App() {
  
  
  const [fileList ,setFileList] = useState( []) ;
    const [originalFile , setOriginalFile] = useState([] ) ;
    const [calendarEntry, setCalendarEntry] = useState([]) ;
    const [hashID, setHashID ] = useState("") ; 
    const [metadataPath, setMetadataPath ] = useState("") ; 
  
  return (
    // <RouterProvider router={appRouter }  />
     
    
<ContextInfo.Provider value={ {fileList,setFileList,  originalFile,setOriginalFile,calendarEntry, setCalendarEntry , 
hashID, setHashID, metadataPath, setMetadataPath}}>
          <div>
          <RouterProvider router={appRouter} />
          </div>
          
</ContextInfo.Provider>
  );
}
export {ContextInfo} ;
export default App;
