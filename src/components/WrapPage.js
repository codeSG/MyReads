import React, { useState, useEffect , useRef } from 'react';
// import { Document, Page } from 'pdfjs-dist/react-pdf.js';
import "../style/WrapPage.css"
import { useContext } from 'react';
// import ClockMessage from './features/ClockMessage.js';
import { ContextInfo } from '../App.js';
// import WrapHeader from './features/WrapHeader.js';
import "../style/WrapPage.css"
import ClockMessage from './features/ClockMessage.js';
import {readBook} from "../utils/updateBookRecentlyViewed.js"
import { Link, useLocation } from 'react-router-dom';
// import './iframeResizer.min.js';
import {ChevronLeft} from 'lucide-react'
import {ChevronRight} from 'lucide-react'

import {setFrequentBooks} from "../utils/updateBookRecentlyViewed.js"
export default function WrapPage() {
	const canvasRef = useRef(null);
 
  const location = useLocation(); 

  const clockMessageRef= useRef(null);
  const pdfContainer  = useState(null)
  const btnRef=useRef(null) ; 
  const pdfRef = useRef(null);

  const movePrevfRef = useRef( null ) ; 

  const moveNextRef = useRef(null) ; 


  const [objectURL , setObjectURL] = useState("") ;

  let pdfDoc = null ; 
// const [totalPages, setTotalPages] = useState(0) ; 

// const [currentPage , setCurrentPage] = useState(1) ; 

  const {fileList, setFileList, originalFile, setOriginalFile,setCalendarEntry, setMetadataPath, 
    bookRecentlyViewed, setBookRecentlyViewed  } = useContext(ContextInfo) ;





function updateCurrentPageOfBook(){
  const openDBRequest = indexedDB.open("BooksDatabase", 1);

  const pageNo = Number( sessionStorage.getItem("currentPage")) ; 
  const totalPageOfBook = Number( sessionStorage.getItem("totalPage"))

openDBRequest.onsuccess = function(event) {
    const db = event.target.result;

    const transaction = db.transaction("booksinformation", "readwrite");
    const objectStore = transaction.objectStore("booksinformation");

    const key = Number(sessionStorage.getItem("bookKey"));

    const getRequest = objectStore.get(key);

    getRequest.onsuccess = function(event) {
        const record = event.target.result;

        // Modify the total page count
        record.currentPage = pageNo; // Assuming totalPages is the new total page count

        record.totalPage = totalPageOfBook ; 
        // Update the record in the object store
        const updateRequest = objectStore.put(record);

        updateRequest.onsuccess = function(event) {
            console.log("Total pages updated successfully");
        };

        updateRequest.onerror = function(event) {
            console.error("Error updating total pages:", event.target.error);
        };
    };

    getRequest.onerror = function(event) {
        console.error("Error retrieving record:", event.target.error);
    };
};


}



    async function pageMovement( objUrl  ) {
      // if( objectURL === "" ) return ; 
      // We import this here so that it's only loaded during client-side rendering.

      // alert( pageNo)
      

      const pdfURL = objectURL === "" ? objUrl :objectURL ;  
      const pdfJS = await import('pdfjs-dist/build/pdf'); 

      pdfJS.GlobalWorkerOptions.workerSrc =
        window.location.origin + '/pdf.worker.min.mjs';


        pdfJS.getDocument({ url: pdfURL }).promise
        .then((doc) => {
            // Check if pdfDoc exists and destroy it
            if (pdfDoc) {
                pdfDoc.destroy().then(() => {
                    pdfDoc = null; // Set to null after destruction
                    loadNewDocument(doc);
                }).catch((error) => {
                    console.error('Error destroying previous document:', error);
                });
            } else {
                loadNewDocument(doc);
            }
        })
        .catch((error) => {
            console.error('Error loading PDF document:', error);
        });




      // if( recordTotalPage === -1 )  updateTotalPagesOfBook(totalPage) ; 
    }


    async function loadNewDocument(doc) {




         pdfDoc = doc;

         const pageNo = Number( sessionStorage.getItem("currentPage")) ; 


      const totalPage = pdfDoc.numPages;
      sessionStorage.setItem("totalPage" , totalPage ) ; 

      // Log the total number of pages
      console.log('Total number of pages:', totalPage);
      // setTotalPages(totalPage ) 
      const page = await pdfDoc.getPage(pageNo);
      const viewport = page.getViewport({ scale: 1.5 });

      // Prepare canvas using PDF page dimensions.
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext('2d');

      // CLEARING THE CANVAS HERE TO SOLVETHE PROBLEMOF RERENDER 

      // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      // canvasContext.beginPath();

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context.
      const renderContext = { canvasContext, viewport };
      const renderTask =  page.render(renderContext);






      // this.total_pages = pdfDoc.numPages;
  
      // Clear the canvas
      // const canvas = document.getElementById('myCanvas'); // Assuming your canvas has an ID 'myCanvas'
      // const context = canvas.getContext('2d');
      // context.clearRect(0, 0, canvas.width, canvas.height);
  
      // Your code to handle the new document and render it on the canvas
  }
	useEffect(() => {
    let calendarArr = JSON.parse(localStorage.getItem("calendarArray") ); 
    if( calendarArr){
      const date = new Date();
      let day = date.getDate();
      calendarArr[day-1] = true ; 
      localStorage.setItem("calendarArray" , JSON.stringify(calendarArr)) ; 
      setCalendarEntry([...calendarArr])
    }

  

    const searchParams = new URLSearchParams(location.search);

    const param1 = Number(searchParams.get('bookID')) ;
    sessionStorage.setItem("bookKey" , param1) ; 



    const openDBRequest = indexedDB.open("BooksDatabase", 1);

        openDBRequest.onsuccess = function(event) {

        
            const db = event.target.result;

            const transaction = db.transaction("booksinformation", "readonly");
            const objectStore = transaction.objectStore("booksinformation");

            const key = Number(sessionStorage.getItem("bookKey"))  ;

            console.log( " the key is " , key )
            const getRequest = objectStore.get(key);

            getRequest.onsuccess =   async function(event) {
                const record = event.target.result;
                // if (record) {
                //     setRecord(record);
                // } else {
                //     console.log("Record not found");
                // }

                console.log( " the record is " , record ) ; 
                console.log( "the detalis of the recird are ...." , record.currentPage,record.totalPage,  record.data) ; 
           
                const bookID = record.id ; 

                console.log( " the id of the nook is " , bookID )
// SETING HERE THE FACT THAT THE RECEBT BOOK ID IS BEING VISTED 
                setBookRecentlyViewed(readBook(bookID) )
           
              
                const blob = new Blob(  [record.data] , { type: 'application/pdf' });
                const objectUrl = URL.createObjectURL(blob);

                setObjectURL(objectUrl) ; 
                console.log( " the obecjt url is this " , objectUrl ) ;

                sessionStorage.setItem("currentPage" , record.currentPage ) ; 
                sessionStorage.setItem("totalPage" ,  record.totalPage  ) ; 


               await pageMovement(  objectUrl  )  ; 

              

               
               

           
              };

            getRequest.onerror = function(event) {
                console.error("Error retrieving record:", event.target.error);
            };
        };


         

        return ()=>{
          updateCurrentPageOfBook() ; 
        }

		
	}, []);

	// return <canvas ref={canvasRef} style={{ height: '100vh' }} />;

  function moveToNextPage(){

    let num = Number( sessionStorage.getItem("currentPage")) ;

    const totalPages = Number( sessionStorage.getItem("totalPage"))
    num = num === totalPages ? num : num+ 1 ; 
    sessionStorage.setItem("currentPage" , num ) ; 
    // updateCurrentPageOfBook() ; 
    if( num===totalPages) return  ; 
    pageMovement() ; 
  }

  function moveToPreviousPage(){

    let num = Number( sessionStorage.getItem("currentPage")) ; 
  
    num = num === 1 ? num : num-1 ; 
    sessionStorage.setItem("currentPage" , num ) ; 
    // updateCurrentPageOfBook() ; 
    if( num ===1 ) return ; 
    pageMovement() ; 
  }


  return (
    <div style={{"width":"100vw" , height:"100vh" , position:"absolute"}}>
{/* <WrapHeader clockMessageRef={clockMessageRef} pdfRef={pdfRef} btnRef={btnRef}/> */}
<ClockMessage  clockMessageRef={clockMessageRef} pdfContainer={pdfContainer} fileList={[]}/>
<div className='pdfContainer' ref={pdfContainer}>

  <div id="leftSideBar" onMouseEnter={()=>{ movePrevfRef.current.style.display="flex"}} 
     onMouseLeave={()=>{movePrevfRef.current.style.display="none"}} >

    <button ref={movePrevfRef} id="movePrev" onClick={ () =>moveToPreviousPage() }>
      <ChevronLeft />
    </button>

 </div>


<div id="canvasDiv">
<canvas className="fullCanvas" ref={canvasRef}  />
</div>

<div id="rightSideBar" onMouseEnter={()=>{ moveNextRef.current.style.display="flex" }}  
  onMouseLeave={()=>{moveNextRef.current.style.display="none"}}
>

    <button  ref={moveNextRef} id="moveNext" onClick={ () => moveToNextPage()  }>
    <ChevronRight  />
    </button>

  </div>




</div>



</div>


    
  );





}