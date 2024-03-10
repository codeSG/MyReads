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

import {setFrequentBooks} from "../utils/updateBookRecentlyViewed.js"
export default function WrapPage() {
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

  const [_iframeURL , setIframeURL] = useState("") ; 

  const [iframePageNumber , setIframePageNumber] = useState(1 ) ; 

  // const [ readingTimeOut, setReadingTimeOut] = useState( 0 ) ; 

  let pdfDoc1 = useRef(null)  ; 
  let pdfDoc2 = useRef(null)  ; 
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
if( singlePageMode ){

  // alert(singlePageMode)
  const page = await pdfDoc1.current.getPage(pageNo);


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




  
}else{

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


if(!wrapPageRuntour)setWrapPageRunTour( true ) ; 
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
  
          if (pdfDoc1.current) {
              pdfDoc1.current.destroy().then(() => {
                  pdfDoc1.current = doc1;
                  pdfDoc2.current = doc2;
  
                  loadNewDocument(doc1, pageNo); // Load page from first document
              }).catch((error) => {
                  console.error('Error destroying previous document:', error);
              });
          } else {
              pdfDoc1.current = doc1;
              pdfDoc2.current = doc2;
              loadNewDocument(doc1, pageNo); // Load page from first document
          }
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
      // alert( " watching single Pa")
      if( singlePageMode && canvasRef.current )    {
        twoCanvasDiv.current.style.display = "none" ;
        canvasDivRef.current.style.display= "flex" ;  
        pageMovement(Number(sessionStorage.getItem('currentPage'))) ; 
        


      }
      else if( !singlePageMode && leftCanvasRef.current  && rightCanvasRef.current)     {
        twoCanvasDiv.current.style.display = "flex" ;
        canvasDivRef.current.style.display= "none" ; 
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

              setIframeURL(objectUrl) ; 

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



if( !scrollMode && singlePageMode && canvasRef.current )    {
  twoCanvasDiv.current.style.display = "none" ;
  canvasDivRef.current.style.display= "flex" ;  
  pageMovement(Number(sessionStorage.getItem('currentPage'))) ; 
  


}

 if( !scrollMode && !singlePageMode && leftCanvasRef.current  && rightCanvasRef.current)     {
  twoCanvasDiv.current.style.display = "flex" ;
  canvasDivRef.current.style.display= "none" ; 
  pageMovement(Number(sessionStorage.getItem('currentPage'))) ; 

}





   
  } , [scrollMode]) ; 

  useEffect(() => {


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


    if( singlePageMode ){
      let num = Number( sessionStorage.getItem("currentPage")) ;
      const totalPages = Number( sessionStorage.getItem("totalPage"))
      if( num===totalPages) return  ;
     
      num = num+ 1 ; 
      sessionStorage.setItem("currentPage" , num ) ; 
      // updateCurrentPageOfBook() ; 
    
      // alert( num )
      pageMovement( num) ;

    }else{
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


<Joyride className='joyride2'


run={true}
steps={steps2}
continuous={true}    
showProgress={true}       
showSkipButton={true}  
  
styles={{
 
  overlay: {
      width: '100vw',
      height: '100vh',
      zIndex: 100
  }
}}        


/>

{/* <WrapHeader clockMessageRef={clockMessageRef} pdfRef={pdfRef} btnRef={btnRef}/> */}
<ClockMessage  clockMessageRef={clockMessageRef} pdfContainer={pdfContainer} fileList={[]}
               setSinglePageMode={setSinglePageMode} pageMovement={pageMovement} 
               singlePageMode={singlePageMode} scrollMode={scrollMode} setScrollMode={setScrollMode}
               iframeRef={iframeRef} iframeURL={_iframeURL}  
               setIframePageNumber={setIframePageNumber}/>
<div className='pdfContainer' ref={pdfContainer}>

{
  !scrollMode && 

  <div id="leftSideBar" onMouseEnter={()=>{ movePrevfRef.current.style.display="flex" ; 
  completedPageRef.current.style.display="block" ;  }} 
     onMouseLeave={()=>{movePrevfRef.current.style.display="none" ; 
     completedPageRef.current.style.display="none" }} >

    <button ref={movePrevfRef} id="movePrev" onClick={ () =>moveToPreviousPage() }>
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
  <div id="rightSideBar" onMouseEnter={()=>{ moveNextRef.current.style.display="flex" ; completedPageRef.current.style.display="block"  }}  
  onMouseLeave={()=>{moveNextRef.current.style.display="none" ; completedPageRef.current.style.display="none" }}
>

    <button  ref={moveNextRef} id="moveNext" onClick={ () => moveToNextPage()  }>
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