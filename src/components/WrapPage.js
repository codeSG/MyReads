import React, { useState, useEffect , useRef } from 'react';
// import { Document, Page } from 'pdfjs-dist/react-pdf.js';
import "../style/WrapPage.css"
import { useContext } from 'react';
// import ClockMessage from './features/ClockMessage.js';
import { ContextInfo } from '../App.js';
import WrapHeader from './features/WrapHeader.js';
import "../style/WrapPage.css"
import ClockMessage from './features/ClockMessage.js';
import {readBook} from "../utils/updateBookRecentlyViewed.js"
const PDFViewer = () => {



  const clockMessageRef= useRef(null);
  const btnRef=useRef(null) ; 
  const pdfRef = useRef(null);


  const {fileList, setFileList, originalFile, setOriginalFile,setCalendarEntry, setMetadataPath, 
    bookRecentlyViewed, setBookRecentlyViewed  } = useContext(ContextInfo) ;
  // const pdfRef = useRef(null);
  console.log( "the filelist is ", fileList  )
  // const pdfArrayBuffer = fileList[Number(sessionStorage.getItem("bookIndex"))].data ; 
  // const pageNumber = 2 ;
  useEffect(() => {


    if ( pdfRef.current) {

      // pageSelector
      
      const { PDFViewerApplication } = pdfRef.current;


      const openDBRequest = indexedDB.open("BooksDatabase", 1);

        openDBRequest.onsuccess = function(event) {
            const db = event.target.result;

            const transaction = db.transaction("booksinformation", "readonly");
            const objectStore = transaction.objectStore("booksinformation");

            const key = Number(sessionStorage.getItem("bookKey"))  ;
            const getRequest = objectStore.get(key);

            getRequest.onsuccess = function(event) {
                const record = event.target.result;
                // if (record) {
                //     setRecord(record);
                // } else {
                //     console.log("Record not found");
                // }
                console.log( "the detalis of the recird are ...." , record.currentPage, record.data) ; 
           
                const bookID = record.id ; 

                console.log( " the id of the nook is " , bookID )

                setBookRecentlyViewed(readBook(bookID) )
           
           
                const blob = new Blob(  [record.data] , { type: 'application/pdf' });
                const objectUrl = URL.createObjectURL(blob);
                pdfRef.current.src = objectUrl;
                const pageNumber = record.currentPage === -1 ? 1 : record.currentPage ; 
                const urlWithPageNumber = `${objectUrl}#page=${pageNumber}`;
                
                pdfRef.current.src = urlWithPageNumber;
                console.log("pageeSelecoter " , pdfRef.current )  ; 
                console.log("the ifme is this " , pdfRef.current.contentWindow  ) ; 
           
              };

            getRequest.onerror = function(event) {
                console.error("Error retrieving record:", event.target.error);
            };
        };

        openDBRequest.onerror = function(event) {
            console.error("Error opening database:", event.target.error);
        };
        
       

       

    }
  }, [] );

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
