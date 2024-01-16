import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import ShowFile from "./components/ShowFile";
import { createContext ,  useState} from 'react';
import File from './components/File';
import Login from './components/Login';
 import Header from "./components/Header" ; 
import MainPage from "./components/MainPage"
const appRouter = createBrowserRouter([
  {
    path :'/' , 
    element : <App/>
  }, 
  {
    path: '/file' , 
    element : <File />
  },
  {
    path : "/login" , 
    element : <Login/>
  },
  {
    path : '/showfile' , 
    element : <ShowFile />
  }, 
  {
    path : "/head" , 
    element : <Header/>
  } , 
  {
    path : "/aaa" , 
    element :  <MainPage/> , 
    children : [
      {
        path : "/aaa" , 
        element : <File/>
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
