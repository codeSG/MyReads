import React, { createContext, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import MainPage from './components/MainPage';
import Login from './components/Login';
import WrapPage from './components/WrapPage';
import Header from './components/Header';
import SignUp from './components/SignUp';
import "./style/App.css"

// Create context
const ContextInfo = createContext();

function App() {
    const [fileList, setFileList] = useState([]);
    const [originalFile, setOriginalFile] = useState([]);
    const [calendarEntry, setCalendarEntry] = useState([]);
    const [hashID, setHashID] = useState('');
    const [metadataPath, setMetadataPath] = useState('');

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
            }}
        >
            <Router>
                <div id="App">
                    {/* <Header /> */}
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
