import React, { useState, useEffect , useRef } from 'react';
import "../../css/WrapPage.css"
import { useContext } from 'react';
import { ContextInfo } from '../../App.js';
import "../../css/WrapPage.css"
import ClockMessage from './ClockMessage.js';
import {readBook} from "../../utils/updateBookRecentlyViewed.js"
import { Link, useLocation } from 'react-router-dom';
import {ChevronLeft} from 'lucide-react'
import {ChevronRight} from 'lucide-react'
import  Joyride from 'react-joyride';
import moveToNextPage from '../../utils/moveToNextPage.js';
import moveToPreviousPage from '../../utils/moveToPreviousPage.js';
import updateCurrentPageOfBook from '../../utils/updateCurrentPageOfBook.js';
export default function WrapPage() {

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
  const leftCanvasRef = useRef(null) ; 
  const rightCanvasRef = useRef(null) ; 
  const movePrevfRef = useRef( null ) ; 
  const moveNextRef = useRef(null) ; 
  const canvasDivRef = useRef(null) ; 
  const twoCanvasDiv = useRef(null) ; 
  const completedPageLabelRef = useRef(null ) ; 
  const completedPageRef = useRef(null)
  const iframeRef  =useRef(null) ;
  const [singlePageMode , setSinglePageMode] = useState( true   ) ;
  const [scrollMode , setScrollMode] = useState( false ) ;
  const [ _iframeURL , setIframeURL] = useState("") ; 
  const [iframePageNumber , setIframePageNumber] = useState(1 ) ; 

  let pdfDoc1 = useRef(null)  ; 
  let pdfDoc2 = useRef(null)  ; 
  let pdfDoc3 = useRef(null) ; 

  const {setCalendarEntry, setBookRecentlyViewed,  } = useContext(ContextInfo) ;

  async function loadNewDocument(doc, pageNo ) {


  const totalPage = pdfDoc1.current.numPages;
  sessionStorage.setItem("totalPage" , totalPage ) ; 

  // Log the total number of pages
  // console.log('Total number of pages:', totalPage);
  // setTotalPages(totalPage ) 
  // console.log( " is it null " , pdfDoc1.current ) ;




  // Prepare canvas using PDF page dimensions.

  const readingTimeOut = JSON.parse( localStorage.getItem("readingTimeOut"))
  if( readingTimeOut ){
    clearTimeout( readingTimeOut ) ; 
    
  }
  

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

  
  
  localStorage.setItem("readingTimeOut" , JSON.stringify( readTimeOut ))
  
  if( singlePageMode && canvasRef.current && pdfDoc3.current ){

    
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

    

    const page1 = await pdfDoc1.current.getPage(pageNo);
    
  const viewport = page1.getViewport({ scale: 1.5 });
  const canvas = leftCanvasRef.current;
  const canvasContext = canvas.getContext('2d');
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  // canvasContext.beginPath();

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = { canvasContext, viewport };
  const renderTask =  page1.render(renderContext);

  const temp = pageNo + " / " + totalPage ; 
  completedPageLabelRef.current.innerText = temp ; 




  if( pageNo +1  <=  totalPage  ){
    rightCanvasRef.current.style.display = "block" ; 
          const page2 = await pdfDoc3.current.getPage(pageNo+1);
            
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
    
        loadNewDocument(doc1, pageNo); 


      } catch (error) {
          console.error('Error loading PDF document:', error);
      }




      // if( recordTotalPage === -1 )  updateTotalPagesOfBook(totalPage) ; 
    }


    useEffect(()=>{
     
      if( singlePageMode && canvasRef.current )    {
        twoCanvasDiv.current.style.display = "none" ;
        canvasDivRef.current.style.display= "flex" ;  
        pageMovement(Number(sessionStorage.getItem('currentPage'))) ; 
        
      }
       if( !singlePageMode && leftCanvasRef.current  && rightCanvasRef.current)     {
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

        
        const getRequest = objectStore.get(key);

        getRequest.onsuccess =   async function(event) {
            const record = event.target.result;
           

            const bookID = record.id ; 

        
            setBookRecentlyViewed(readBook(bookID) )
        
          
            const blob = new Blob(  [record.data] , { type: 'application/pdf' });
            const objectUrl = URL.createObjectURL(blob);
            sessionStorage.setItem('OBJECTURL' , objectUrl ) ; 

            setIframeURL(objectUrl) ; 

        
            sessionStorage.setItem("totalPage" ,  record.totalPage  ) ; 
            sessionStorage.setItem("objectUrl" ,  objectUrl  ) ; 

            const iframe = iframeRef.current;

            iframe.src = objectUrl + `#page=${iframePageNumber}`;
          };

        getRequest.onerror = function(event) {
            console.error("Error retrieving record:", event.target.error);
        };
    };
   
  
  }

} , [iframePageNumber])
  useEffect(()=>{ 
if( iframeRef.current && scrollMode  ){
  const searchParams = new URLSearchParams(location.search);

  const param1 = Number(searchParams.get('bookID')) ;
  sessionStorage.setItem("bookKey" , param1) ; 

  const openDBRequest = indexedDB.open("BooksDatabase", 1);

      openDBRequest.onsuccess = function(event) {

          const db = event.target.result;

          const transaction = db.transaction("booksinformation", "readonly");
          const objectStore = transaction.objectStore("booksinformation");

          const key = Number(sessionStorage.getItem("bookKey"))  ;
          const getRequest = objectStore.get(key);

          getRequest.onsuccess =   async function(event) {
              const record = event.target.result;
           
              const bookID = record.id ;
              setBookRecentlyViewed(readBook(bookID) )
         
            
              const blob = new Blob(  [record.data] , { type: 'application/pdf' });
              const objectUrl = URL.createObjectURL(blob);

              setIframeURL(objectUrl) ; 
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
    
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        moveToNextPage( singlePageMode,pageMovement ) ; 
      }

      if (event.key === "ArrowLeft") {
        moveToPreviousPage( singlePageMode,pageMovement ) ; 
      }
    };

   
    const searchParams = new URLSearchParams(location.search);

    const param1 = Number(searchParams.get('bookID')) ;
    sessionStorage.setItem("bookKey" , param1) ; 

    const openDBRequest = indexedDB.open("BooksDatabase", 1);

        openDBRequest.onsuccess = function(event) {

            const db = event.target.result;

            const transaction = db.transaction("booksinformation", "readonly");
            const objectStore = transaction.objectStore("booksinformation");

            const key = Number(sessionStorage.getItem("bookKey"))  ;
            const getRequest = objectStore.get(key);

            getRequest.onsuccess =   async function(event) {
                const record = event.target.result;
                const bookID = record.id ; 

                setBookRecentlyViewed(readBook(bookID) )
           
                const blob = new Blob(  [record.data] , { type: 'application/pdf' });
                const objectUrl = URL.createObjectURL(blob);
                sessionStorage.setItem("currentPage" , record.currentPage ) ; 
                sessionStorage.setItem("totalPage" ,  record.totalPage  ) ; 
                sessionStorage.setItem("objectUrl" ,  objectUrl  ) ; 
                sessionStorage.setItem("OBJECTURL" ,  objectUrl  ) ; 

              pageMovement(Number(sessionStorage.getItem('currentPage')))
             
              };

            getRequest.onerror = function(event) {
                console.error("Error retrieving record:", event.target.error);
            };
        };



        document.addEventListener("keydown", handleKeyDown);

     
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
        
        }		
	}, []);
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
        localStorage.setItem("firstTimeView" , true )
      }
    }}
    styles={{
      overlay: {
          width: '100vw',
          height: '100vh',
          zIndex: 100
      } , 
      options: {          
        primaryColor: 'rgba(145, 83, 206, 0.56)',
        color: 'black',
      } , 
      spotlight: {
        backgroundColor: 'white',
        opacity: "0.5"
      }
    }}        
/>
}


{ <ClockMessage  clockMessageRef={clockMessageRef} pdfContainer={pdfContainer} fileList={[]}
               setSinglePageMode={setSinglePageMode} pageMovement={pageMovement} 
               singlePageMode={singlePageMode} scrollMode={scrollMode} setScrollMode={setScrollMode}
               iframeRef={iframeRef} iframeURL={_iframeURL}  
               setIframePageNumber={setIframePageNumber}/> 
               
}
<div className='pdfContainer' ref={pdfContainer}>

{
  !scrollMode && 

  <div id="leftSideBar" onClick={ () =>moveToPreviousPage( singlePageMode,pageMovement ) } onMouseEnter={()=>{ ; 
  completedPageRef.current.style.display="block" ;  }} 
     onMouseLeave={()=>{; 
     completedPageRef.current.style.display="none" }} >

    <button ref={movePrevfRef} id="movePrev" >
      <ChevronLeft />
    </button>

 </div>
}

{
  scrollMode && 
  
   <iframe
  ref={iframeRef}
 
  width="100%"
  height="100%"
  frameBorder="0"


/>
}

{ !scrollMode  &&  <div id="canvasDiv" ref={canvasDivRef} >
  <canvas className="fullCanvas" ref={canvasRef}  />
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
  <div id="rightSideBar"  onClick={ () => moveToNextPage( singlePageMode,pageMovement )  } onMouseEnter={()=>{ completedPageRef.current.style.display="block"  }}  
  onMouseLeave={()=>{; completedPageRef.current.style.display="none" }}
>

    <button  ref={moveNextRef} id="moveNext" style={{display : "block"}}>
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