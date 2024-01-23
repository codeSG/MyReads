import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import ShowFile from "./components/ShowFile";
import { createContext ,  useState} from 'react';
import File from './components/File';
import Login from './components/Login';
 import Header from "./components/Header" ; 
import MainPage from "./components/MainPage";
import PdfViewer from './components/PdfViewer';
import WrapPage from './components/WrapPage';
const appRouter = createBrowserRouter([
  {
    path :'/' , 
    element : <App/>
  }, 
  
  {
    path : "/login" , 
    element : <Login/>
  },

   
  {
    path : "/file" , 
    element :  <MainPage/> , 
    children : [
      {
        path : "/file" , 
        element : <File/>
      },{
        path:"/file/showfile",
        element : <WrapPage/>
      }
    ]
  }
  
  

])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    // <App />
  
      <RouterProvider router={appRouter} />
    
    
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
