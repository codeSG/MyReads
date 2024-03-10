import React, { createContext, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import MainPage from './components/MainPage';
import Login from './components/Login';
import WrapPage from './components/WrapPage';
import Header from './components/Header';
import SignUp from './components/SignUp';
import "./style/App.css"
import  Joyride from 'react-joyride';
// Create context
const ContextInfo = createContext();

function App() {
    const [fileList, setFileList] = useState([]);
    const [originalFile, setOriginalFile] = useState([]);
    const [calendarEntry, setCalendarEntry] = useState([]);
    const [hashID, setHashID] = useState('');
    const [metadataPath, setMetadataPath] = useState('');
     const [dataBaseCreated, setDataBaseCreated] = useState(true);
    const [request, setRequest] = useState(null);
    const [ bookRecentlyViewed, setBookRecentlyViewed] = useState([]) ; 
    const [runTour, setRunTour] = useState(true);
    const [ wrapPageRuntour , setWrapPageRunTour] = useState( false ) ; 
    const [enterYourName , setEnterYourName] = useState( localStorage.getItem("userName"))
    const [ userName , setUserName] = useState( localStorage.getItem("userName") ) ; 
    const handleTourEnd = () => {
        // Handle the end of the tour, if needed
        setRunTour(false); // Stop the tour after it ends
    };
    const steps1 = [
        {
          target: '.first-step',
          content: 'This is the first step of the tour.',
          disableBeacon: true
        },
       
        {
            target: '.second-step',
            content: 'This is the second step of the tour.',
            disableBeacon: true
          }
          , 

          {
            target: '.third-step',
            content: 'This is the third step of the tour.',
            disableBeacon: true
          }
          ,
          {
            target: '.fourth-step',
            content: 'This is the fourth step of the tour.',
            disableBeacon: true
          }, 
          {
            target: '.fifth-step',
            content: 'This is the fifth step of the tour.',
            disableBeacon: true
          }, 
          {
            target: '.sixth-step',
            content: 'This is the fifth step of the tour.',
            disableBeacon: true
          }
     
      ];

      const steps2 = [
        {
          target: '.showOptions-firstStep',
          content: 'This is the first step of the tour.',
          disableBeacon: true
        },
       
        {
            target: '.showOptions-secondStep',
            content: 'This is the second step of the tour.',
            disableBeacon: true
          }
          , 

          {
            target: '.showOptions-thirdStep',
            content: 'This is the third step of the tour.',
            disableBeacon: true
          }
          ,
          {
            target: '.showOptions-fourthStep',
            content: 'This is the fourth step of the tour.',
            disableBeacon: true
          }, 
          {
            target: '.showOptions-fifthStep',
            content: 'This is the fifth step of the tour.',
            disableBeacon: true
          }, 
          {
            target: '.showOptions-sixthStep',
            content: 'This is the sixthStep step of the tour.',
            disableBeacon: true
          } , 
          {
            target: '.showOptions-seventhStep',
            content: 'This is the seventhStep step of the tour.',
            disableBeacon: true
          }  , 
          {
            target: '.showOptions-eigthStep',
            content: 'This is the eigthStep step of the tour.',
            disableBeacon: true
          }  , 
          {
            target: '.showOptions-ningthStep',
            content: 'This is the ningthStep step of the tour.',
            disableBeacon: true
          }  , 

     
      ];


    return (
        <ContextInfo.Provider
            value={{
                fileList,
                setFileList,
                originalFile,
                setOriginalFile,
                calendarEntry,
                setCalendarEntry,
                hashID,
                setHashID,
                metadataPath,
                setMetadataPath,
                dataBaseCreated,
                setDataBaseCreated,
                request,
                setRequest, 
                bookRecentlyViewed, 
                setBookRecentlyViewed, 
                wrapPageRuntour,
                setWrapPageRunTour , 
                userName ,  
                setUserName
            }}
        >
            <Router>
                <div id="App">
                    {/* <Header /> */}
                    {/* <Joyride 
                    steps={steps1}                                       
                    /> */}

                    <Joyride 
                      run={wrapPageRuntour}
                            steps={steps1}
                            continuous={true}    
                            showProgress={true}       
                            showSkipButton={true}                      
                    />
                  
                    <Routes> {/* Wrap Routes */}
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/file" element={<MainPage />} />
                        <Route path="/file/showfile" element={<WrapPage />} />
                    </Routes>   
                </div>
            </Router>
        </ContextInfo.Provider>
    );
}

export {ContextInfo }
export default App;
