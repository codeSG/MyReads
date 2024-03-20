import React, { createContext, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import MainPage from './components/MainPage';
// import Login from './components/Login';
import WrapPage from './components/WrapPage';
import Header from './components/Header';
// import SignUp from './components/SignUp';
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
    const [firebaseFileFetched , setFirebaseFileFetched]  = useState( localStorage.getItem("firebaseFileFetched") ) ; 
    const [ showUploadBook , setShowUploadBook] = useState( false) ; 
    const handleTourEnd = () => {
        // Handle the end of the tour, if needed
        setRunTour(false); // Stop the tour after it ends
    };
    const steps1 = [
        {
          // selector: '.first-step1, .first-step2',
          target: '.first-step',
          content: 'Managing and finding book on laptop is a tedious task, why not add all books, that are easy to place on your digital bookshelf',
          disableBeacon: true
        },
       
        {
            target: '.second-step',
            content: 'Find your current running booking easily and continue focusing on its reading',
            disableBeacon: true
          }
          , 

          {
            target: '.third-step',
            content: ' Reading Habit is sometimes hard, why not make them part of automatic tracking in terms of time and pages read per day',
            disableBeacon: true
          }
          ,
          {
            target: '.fourth-step',
            content: 'Filter book based on categories or serach the right book out of your library',
            disableBeacon: true
          }, 
          {
            target: '.fifth-step',
            content: 'Read book and try different actions to track reading habit, progress, and add notes',
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
                setUserName , firebaseFileFetched  , setFirebaseFileFetched 

            }}
        >
            <Router>
                <div id="App">
                    {/* <Header /> */}
                    {/* <Joyride 
                    steps={steps1}                                       
                    /> */}

                    <Joyride
                    // wrapPageRuntour 
                      run={wrapPageRuntour}
                            steps={steps1}
                            continuous={true}    
                            showProgress={true}       
                            showSkipButton={true}  
                            styles={{
                              options: {
                              
                               
                                primaryColor: 'rgba(145, 83, 206, 0.56)',
                                color: 'black',
                              }
                            }} 
                                           
                    />
                  
                    <Routes> {/* Wrap Routes */}
                        <Route path="/" element={<MainPage />} />
                        {/* <Route path="/login" element={<Login />} /> */}
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
