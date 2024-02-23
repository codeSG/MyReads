import React, { useState, useEffect , useRef } from 'react';
// import { Document, Page } from 'pdfjs-dist/react-pdf.js';
import "../style/WrapPage.css"
import { useContext } from 'react';
// import ClockMessage from './features/ClockMessage.js';
import { ContextInfo } from '../App.js';
import WrapHeader from './features/WrapHeader.js';
import "../style/WrapPage.css"
import ClockMessage from './features/ClockMessage.js';

const PDFViewer = () => {

  const clockMessageRef= useRef(null);
  const btnRef=useRef(null) ; 
  const pdfRef = useRef(null);


  const {fileList, setFileList, originalFile, setOriginalFile,setCalendarEntry, setMetadataPath} = useContext(ContextInfo) ;
  // const pdfRef = useRef(null);
  const pdfArrayBuffer = fileList[Number(sessionStorage.getItem("bookIndex"))].data ; 
  const pageNumber = 2 ;
  useEffect(() => {
    if ( pdfRef.current) {
      const blob = new Blob([fileList[Number(sessionStorage.getItem("bookIndex"))].data], { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(blob);
      pdfRef.current.src = objectUrl;
      const pageNumber = 2 ; 
      const urlWithPageNumber = `${objectUrl}#page=${pageNumber}`;
      
      pdfRef.current.src = urlWithPageNumber;
      return () => URL.revokeObjectURL(objectUrl); // Clean up the URL when the component unmounts
    }
  }, [fileList[Number(sessionStorage.getItem("bookIndex"))].data]);

  return (
    <div>
<WrapHeader clockMessageRef={clockMessageRef} pdfRef={pdfRef} btnRef={btnRef}/>
<div className='pdfContainer'>
<iframe 
className="custom-iframe" 
      title="PDF Viewer"
      ref={pdfRef}
      width="100%"
      height="100%"
      // height="600px"
      frameBorder="0"
      allowfullscreen
      
    />
    <ClockMessage  clockMessageRef={clockMessageRef} fileList={[]}/>
</div>
 
</div>


    
  );
}

export default PDFViewer;
