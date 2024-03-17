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
import  Joyride from 'react-joyride';


import {setFrequentBooks} from "../utils/updateBookRecentlyViewed.js";
let pdfviewer;
export default function WrapPage() {


  function highlightMode() {
    var viewer = document.getElementById('container').ej2_instances[0];
    viewer.annotation.setAnnotationMode('Highlight');
  }


  const containerRef = useRef(null); 
  // const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

  const steps2 = [
    {
      target: '.showOptions-firstStep',
      content: 'Track your reading time, by starting stop-watch or Pre-fixed your reading time using Pomodoro timer',
      disableBeacon: true
    },
   
    {
        target: '.showOptions-secondStep',
        content: 'Reading mode bring the actual experience allowing to read books by scrolling or page by page mode allowing jumping to any page directly and view as one page or two page format.',
        disableBeacon: true
      }
      , 

      {
        target: '.showOptions-thirdStep',
        content: 'Record all your notes/comments that will enrich your learning to 10x times',
        disableBeacon: true
      }
      ,

 
  ];
	const canvasRef = useRef(null);
 
  const location = useLocation(); 

  const clockMessageRef= useRef(null);
  const pdfContainer  = useState(null)
  const btnRef=useRef(null) ; 
  const pdfRef = useRef(null);

  const leftCanvasRef = useRef(null) ; 
  const rightCanvasRef = useRef(null) ; 

  const movePrevfRef = useRef( null ) ; 

  const moveNextRef = useRef(null) ; 
  const canvasDivRef = useRef(null) ; 
  const twoCanvasDiv = useRef(null) ; 

  const completedPageLabelRef = useRef(null ) ; 
  // const totalLabelRef = useRef(null) ; 

  const completedPageRef = useRef(null)
  const iframeRef  =useRef(null)


  const [objectURL , setObjectURL] = useState("") ;

  const [singlePageMode , setSinglePageMode] = useState( true   ) ;

  const [scrollMode , setScrollMode] = useState( false ) ; 

  const [ _iframeURL , setIframeURL] = useState("") ; 

  const [iframePageNumber , setIframePageNumber] = useState(1 ) ; 

  // const [ readingTimeOut, setReadingTimeOut] = useState( 0 ) ; 

  let pdfDoc1 = useRef(null)  ; 
  let pdfDoc2 = useRef(null)  ; 
  let pdfDoc3 = useRef(null) ; 
// const [totalPages, setTotalPages] = useState(0) ; 

// const [currentPage , setCurrentPage] = useState(1) ; 

  const {fileList, setFileList, originalFile, setOriginalFile,setCalendarEntry, setMetadataPath, 
    bookRecentlyViewed, setBookRecentlyViewed, setWrapPageRunTour , wrapPageRuntour } = useContext(ContextInfo) ;





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
async function loadNewDocument(doc, pageNo ) {



// alert( pageNo )
  // pdfDoc1.current = doc;
  // pdfDoc2.current = doc ; 
// pdfDoc1 = doc ;
  // const pageNo = Number( sessionStorage.getItem("currentPage") ) ; 


const totalPage = pdfDoc1.current.numPages;
sessionStorage.setItem("totalPage" , totalPage ) ; 

// Log the total number of pages
console.log('Total number of pages:', totalPage);
// setTotalPages(totalPage ) 
console.log( " is it null " , pdfDoc1.current ) ;




// Prepare canvas using PDF page dimensions.

const readingTimeOut = JSON.parse( localStorage.getItem("readingTimeOut"))
if( readingTimeOut ){
  clearTimeout( readingTimeOut ) ; 
  console.log(" the time inteval isbing cleard here ", readingTimeOut)
}
console.log(" the time inteval isbing    NOT cleard here " ,readingTimeOut )

const readTimeOut = setTimeout( ()=>{
  let calendarArr = JSON.parse(localStorage.getItem("calendarArray") ); 
  if( calendarArr){
    const date = new Date();
    let day = date.getDate();
    const key = Number(sessionStorage.getItem("bookKey"));
    const pageString = `${key}-${pageNo}` ; 
    calendarArr[day-1].pagesRead[pageString] = true ;
    calendarArr[day-1].readToday = true ; 
    // calendarArr[day-1].timeSpent =   ( calendarArr[day-1].timeSpent + 1 ) % 1000  ; 
    localStorage.setItem("calendarArray" , JSON.stringify(calendarArr)) ; 
    setCalendarEntry([...calendarArr])
  }

} , 1000*60 ) ; 

console.log(  "the readTimeOut" , readTimeOut ) ; 
// setReadingTimeOut( readTimeOut ) ; 
localStorage.setItem("readingTimeOut" , JSON.stringify( readTimeOut ))
// alert( readingTimeOut )
if( singlePageMode && canvasRef.current && pdfDoc3.current ){

  // alert(singlePageMode)
  const page = await pdfDoc3.current.getPage(pageNo);


const viewport = page.getViewport({ scale: 1.5 });
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

    const temp = pageNo + " / " + totalPage ; 
    completedPageLabelRef.current.innerText = temp ; 




  
}

if( !singlePageMode && leftCanvasRef.current && rightCanvasRef.current && pdfDoc1.current && pdfDoc2.current){

  // alert(singlePageMode) ; 
  // THE CODR FOR SSHOWING THE LEFT  HALF PAGE 

  const page1 = await pdfDoc1.current.getPage(pageNo);
  
const viewport = page1.getViewport({ scale: 1.5 });
const canvas = leftCanvasRef.current;
const canvasContext = canvas.getContext('2d');

// CLEARING THE CANVAS HERE TO SOLVETHE PROBLEMOF RERENDER 

// canvasContext.clearRect(0, 0, canvas.width, canvas.height);
canvasContext.clearRect(0, 0, canvas.width, canvas.height);
// canvasContext.beginPath();

canvas.height = viewport.height;
canvas.width = viewport.width;

// Render PDF page into canvas context.
// alert( pageNo + 1 )
const renderContext = { canvasContext, viewport };
const renderTask =  page1.render(renderContext);

const temp = pageNo + " / " + totalPage ; 
completedPageLabelRef.current.innerText = temp ; 


//   THE CODE FOR SHOWING THE RIGHT HALF PAGE 

console.log(  pageNo +1 !==  totalPage ) ; 


 if( pageNo +1  <=  totalPage  ){
  rightCanvasRef.current.style.display = "block" ; 
        const page2 = await pdfDoc2.current.getPage(pageNo+1);
          
        const viewport = page2.getViewport({ scale: 1.5 });
        const canvas = rightCanvasRef.current;
        const canvasContext = canvas.getContext('2d');

        // CLEARING THE CANVAS HERE TO SOLVETHE PROBLEMOF RERENDER 

        // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        // canvasContext.beginPath();

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context.
        const renderContext = { canvasContext, viewport };
        const renderTask =  page2.render(renderContext);

 }
 else{
  rightCanvasRef.current.style.display = "none" ; 
 }


}


// if(!wrapPageRuntour)setWrapPageRunTour( true ) ; 
}


    async function pageMovement(    pageNo  ) {
      // if( objectURL === "" ) return ; 
      // We import this here so that it's only loaded during client-side rendering.

      // alert( pageNo)
      
      setIframePageNumber( pageNo ) ; 
      const objUrl =  sessionStorage.getItem( "objectUrl"  ) ; 
      if( !objUrl) return ;
      const pdfURL = objUrl ;  
      const pdfJS = await import('pdfjs-dist/build/pdf'); 

      pdfJS.GlobalWorkerOptions.workerSrc =
        window.location.origin + '/pdf.worker.min.mjs';


        try {
          const doc1 = await pdfJS.getDocument({ url: pdfURL }).promise;
          const doc2 = await pdfJS.getDocument({ url: pdfURL }).promise;
          const doc3 = await pdfJS.getDocument({ url: pdfURL }).promise;
  

         if (pdfDoc1.current) {
            await pdfDoc1.current.destroy();
            await pdfDoc2.current.destroy();
            await pdfDoc3.current.destroy();
            pdfDoc1.current = doc1;
            pdfDoc2.current = doc2;
            pdfDoc3.current = doc3 ; 
        } else {
            pdfDoc1.current = doc1;
            pdfDoc2.current = doc2;
            pdfDoc3.current = doc3 ; 
        }
    
        loadNewDocument(doc1, pageNo); // Load page from first document




      } catch (error) {
          console.error('Error loading PDF document:', error);
      }




      // if( recordTotalPage === -1 )  updateTotalPagesOfBook(totalPage) ; 
    }


    
  
    // if( singlePageMode ){
    //   if( canvasDivRef.current && canvasRef.current ){
    //     pageMovement(Number(sessionStorage.getItem('currentPage')))
    //   }
    

    // }else{
    //   if( twoCanvasDiv.current && leftCanvasRef.current && rightCanvasRef.current){
    //     pageMovement(Number(sessionStorage.getItem('currentPage')))
    //   }
    // }
    

 


    useEffect(()=>{
      // alert( `useEffect ${singlePageMode} is this 1111111 `)
      if( singlePageMode && canvasRef.current )    {
        twoCanvasDiv.current.style.display = "none" ;
        canvasDivRef.current.style.display= "flex" ;  
        pageMovement(Number(sessionStorage.getItem('currentPage'))) ; 
        


      }
       if( !singlePageMode && leftCanvasRef.current  && rightCanvasRef.current)     {
        twoCanvasDiv.current.style.display = "flex" ;
        canvasDivRef.current.style.display= "none" ; 
        // alert(" 2222222222 here ")
        pageMovement(Number(sessionStorage.getItem('currentPage'))) ; 

      }
   
      
    } , [singlePageMode] )
	








useEffect( ()=>{


  if( iframeRef.current && scrollMode ){


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
                sessionStorage.setItem('OBJECTURL' , objectUrl ) ; 
  
                setIframeURL(objectUrl) ; 
  
                // setObjectURL(objectUrl) ; 
                console.log( " the obecjt url is this " , objectUrl ) ;
  
                // sessionStorage.setItem("currentPage" , record.currentPage ) ; 
                sessionStorage.setItem("totalPage" ,  record.totalPage  ) ; 
                sessionStorage.setItem("objectUrl" ,  objectUrl  ) ; 
  
                const iframe = iframeRef.current;
  
                iframe.src = objectUrl + `#page=${iframePageNumber}`;
              };
  
            getRequest.onerror = function(event) {
                console.error("Error retrieving record:", event.target.error);
            };
        };
  
  
        function handleScroll(){
          alert( " getting scrolled !! ")
        }
  
        iframeRef.current.addEventListener('scroll', handleScroll);
  
  
  
  
  
  
  }




} , [iframePageNumber])



  useEffect(()=>{ 

// alert(  `the scrollMode is ${scrollMode}` )
if( iframeRef.current && scrollMode  ){


  const handleMessageFromIframe = (event) => {
    const { type, data } = event.data;
    if (type === 'annotationAdded' || type === 'annotationModified') {
      // Update annotations data structure with received annotation
      
      // annotationsData.push(data);
      console.log("handleMessageFromIframe", data)
      // Save annotations to local storage
      // saveAnnotationsToLocalStorage(annotationsData);
    }
  };
  console.log( "iframeRef.current" , iframeRef.current)

  iframeRef.current.addEventListener('message', handleMessageFromIframe);


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

              setIframeURL(objectUrl) ; 
// alert(objectUrl)
              // setObjectURL(objectUrl) ; 
              console.log( " the obecjt url is this " , objectUrl ) ;

              sessionStorage.setItem("currentPage" , record.currentPage ) ; 
              sessionStorage.setItem("totalPage" ,  record.totalPage  ) ; 
              sessionStorage.setItem("objectUrl" ,  objectUrl  ) ; 

              const iframe = iframeRef.current;

              iframe.src = objectUrl + `#page=${iframePageNumber}`;
            };

          getRequest.onerror = function(event) {
              console.error("Error retrieving record:", event.target.error);
          };
      };


      function handleScroll(){
        alert( " getting scrolled !! ")
      }

      iframeRef.current.addEventListener('scroll', handleScroll);






}



if( !scrollMode && singlePageMode && canvasRef.current && pdfDoc3.current )    {
  twoCanvasDiv.current.style.display = "none" ;
  canvasDivRef.current.style.display= "flex" ;  
  pageMovement(Number(sessionStorage.getItem('currentPage'))) ; 
  


}

 if( !scrollMode && !singlePageMode && leftCanvasRef.current 
   && rightCanvasRef.current && pdfDoc1.current && pdfDoc2.current)     {
  twoCanvasDiv.current.style.display = "flex" ;
  canvasDivRef.current.style.display= "none" ; 
  pageMovement(Number(sessionStorage.getItem('currentPage'))) ; 

}





   
  } , [scrollMode]) ; 

  
  useEffect(() => {


    

    // function handleMessageFromIframe(){
      

    //   alert("hi11111111")
    // }


    // iframeRef.current.addEventListener('message', handleMessageFromIframe);


  // localStorage.setItem("firstTimeView" , true ) ; 
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        // Right arrow key was pressed
        // Add your logic here
        // console.log("Right arrow key pressed");
        moveToNextPage() ; 
      }

      if (event.key === "ArrowLeft") {
        // Left arrow key was pressed
        // Add your logic here
        moveToPreviousPage() ; 
        // console.log("Left arrow key pressed");
      }
    };

    const handleScroll = (event) => {
      // Check the deltaY property of the event to determine scroll direction
      if (event.deltaY > 0) {
        // Scrolling down
        console.log("Mouse scrolled down");
        moveToNextPage() ; 
      } else if (event.deltaY < 0) {
        // Scrolling up
        console.log("Mouse scrolled up");
        moveToPreviousPage() ; 
      }
    };


    // let calendarArr = JSON.parse(localStorage.getItem("calendarArray") ); 
    // if( calendarArr){
    //   const date = new Date();
    //   let day = date.getDate();
    //   calendarArr[day-1].readToday = true ; 
    //   localStorage.setItem("calendarArray" , JSON.stringify(calendarArr)) ; 
    //   setCalendarEntry([...calendarArr])
    // }

  

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

                // setObjectURL(objectUrl) ; 
                console.log( " the obecjt url is this " , objectUrl ) ;

                sessionStorage.setItem("currentPage" , record.currentPage ) ; 
                sessionStorage.setItem("totalPage" ,  record.totalPage  ) ; 
                sessionStorage.setItem("objectUrl" ,  objectUrl  ) ; 
                sessionStorage.setItem("OBJECTURL" ,  objectUrl  ) ; 

              console.log( "the object url can fit in sesion storgae " , objectUrl  ) ; 
              
              // if( singlePageMode )
              pageMovement(Number(sessionStorage.getItem('currentPage')))
              // if( singlePageMode ){
              //   if( canvasDivRef.current && canvasRef.current ){
              //     pageMovement(Number(sessionStorage.getItem('currentPage')))
              //   }
              
          
              // }else{
              //   if( twoCanvasDiv.current && leftCanvasRef.current && rightCanvasRef.current){
              //     pageMovement(Number(sessionStorage.getItem('currentPage')))
              //   }
              // }
              //  await pageMovement(   record.currentPage   )  ; 

           
              };

            getRequest.onerror = function(event) {
                console.error("Error retrieving record:", event.target.error);
            };
        };



        document.addEventListener("keydown", handleKeyDown);

        // window.addEventListener("wheel", handleScroll);

        const readingInterval = setInterval(() => {
          
          let calendarArr = JSON.parse(localStorage.getItem("calendarArray") ); 
          if( calendarArr){
            const date = new Date();
            let day = date.getDate();
            calendarArr[day-1].timeSpent =   ( calendarArr[day-1].timeSpent + 1 ) % 1000  ; 
            localStorage.setItem("calendarArray" , JSON.stringify(calendarArr)) ; 
            setCalendarEntry([...calendarArr])
          }



        }, 1000*60 );
        return ()=>{

          updateCurrentPageOfBook() ; 
          document.removeEventListener("keydown", handleKeyDown);
          clearInterval( readingInterval );
          const readingTimeOut = JSON.parse( localStorage.getItem("readingTimeOut"))
          clearTimeout( readingTimeOut ) 
          // window.removeEventListener("wheel", handleScroll);



        }

		
	}, []);
	// return <canvas ref={canvasRef} style={{ height: '100vh' }} />;

  function moveToNextPage(){

// alert("hi11111111111")
// alert(singlePageMode)
    if( singlePageMode ){
      let num = Number( sessionStorage.getItem("currentPage")) ;
      const totalPages = Number( sessionStorage.getItem("totalPage"))
      if( num===totalPages) return  ;
     
      num = num+ 1 ; 
      sessionStorage.setItem("currentPage" , num ) ; 
      // updateCurrentPageOfBook() ; 
    
      // alert( num )
      pageMovement( num) ;

    }
    
    if( !singlePageMode) {
      // alert("hi")
      let num = Number( sessionStorage.getItem("currentPage")) ;
      const totalPages = Number( sessionStorage.getItem("totalPage")) ;
      if( num >= totalPages-1  ) return  ;
    
      num =  num+ 2 ; 
      sessionStorage.setItem("currentPage" , num ) ; 
      // updateCurrentPageOfBook() ; 
      
      // alert( num )
      pageMovement( num) ; 
    }
    
  
  }

  function moveToPreviousPage(){

    if( singlePageMode ){
      let num = Number( sessionStorage.getItem("currentPage")) ; 
  
      num = num === 1 ? num : num-1 ; 
      sessionStorage.setItem("currentPage" , num ) ; 
      // updateCurrentPageOfBook() ; 
      if( num ===1 ) return ; 
      pageMovement(  num) ; 

    }else{
      let num = Number( sessionStorage.getItem("currentPage")) ; 
  
      num = num === 1 ? num : num-2 ; 
      sessionStorage.setItem("currentPage" , num ) ; 
      // updateCurrentPageOfBook() ; 
      if( num ===1 ) return ; 
      pageMovement(  num) ; 
    }
   
  }
 


  return (
  
    <div style={{"width":"100vw" , height:"100vh" , position:"absolute"}} className="wrpaPageDiv">
    
{

  
   !localStorage.getItem("firstTimeView") && 
<Joyride className='joyride2'


run={ true   }
steps={steps2}
continuous={true}    
showProgress={true}       
showSkipButton={true}  
callback={({ status }) => {
  if (status === 'finished' || status === 'skipped') {
    // setIsTourOpen(false);
    localStorage.setItem("firstTimeView" , true )
  }
}}
styles={{
 
  overlay: {
      width: '100vw',
      height: '100vh',
      zIndex: 100
  }
}}        


/>
}


{/* <WrapHeader clockMessageRef={clockMessageRef} pdfRef={pdfRef} btnRef={btnRef}/> */}
<ClockMessage  clockMessageRef={clockMessageRef} pdfContainer={pdfContainer} fileList={[]}
               setSinglePageMode={setSinglePageMode} pageMovement={pageMovement} 
               singlePageMode={singlePageMode} scrollMode={scrollMode} setScrollMode={setScrollMode}
               iframeRef={iframeRef} iframeURL={_iframeURL}  
               setIframePageNumber={setIframePageNumber}/>
<div className='pdfContainer' ref={pdfContainer}>

{
  !scrollMode && 

  <div id="leftSideBar" onClick={ () =>moveToPreviousPage() } onMouseEnter={()=>{ movePrevfRef.current.style.display="flex" ; 
  completedPageRef.current.style.display="block" ;  }} 
     onMouseLeave={()=>{movePrevfRef.current.style.display="none" ; 
     completedPageRef.current.style.display="none" }} >

    <button ref={movePrevfRef} id="movePrev" >
      <ChevronLeft />
    </button>

 </div>
}
 



  
 


{/* <div id="iframeCanvasDiv"> */}

{
  scrollMode && 
  
   <iframe
  ref={iframeRef}
 
  width="100%"
  height="100%"
  frameBorder="0"


/>


 
}








{/* </div> */}



{ !scrollMode  &&  <div id="canvasDiv" ref={canvasDivRef} >
  <canvas className="fullCanvas" ref={canvasRef}  />
  {/* <canvas className="fullCanvas" ref={canvasRef}  /> */}
  </div>  
}
{ 
  !scrollMode    && 
  <div id="twoCanvasDiv" ref={twoCanvasDiv} >
  <canvas className="halfCanvas" ref={leftCanvasRef}  />
  <canvas className="halfCanvas" ref={rightCanvasRef}  />
  </div>

}


{
  !scrollMode && 
  <div id="rightSideBar"  onClick={ () => moveToNextPage()  } onMouseEnter={()=>{ moveNextRef.current.style.display="flex" ; completedPageRef.current.style.display="block"  }}  
  onMouseLeave={()=>{moveNextRef.current.style.display="none" ; completedPageRef.current.style.display="none" }}
>

    <button  ref={moveNextRef} id="moveNext">
    <ChevronRight  />
    </button>

  </div>
}




<div id="completedPage"  ref={completedPageRef}>

  <label ref={completedPageLabelRef}>{"1 / 1"}</label>
 


</div>


</div>



</div>


    
  );







}