import React , {useState, useEffect , useContext, useRef} from 'react';
import { Document, Page , pdfjs} from 'react-pdf';
import { useSearchParams } from 'react-router-dom';
import "../style/WrapPage.css"
import ClockMessage from './features/ClockMessage.js';
import { ContextInfo } from '../App.js';
import urlHelper from '../utils/urlHelper';
// const obj = urlHelper( 0 , 0  , 0  ) ; 

import WrapHeader from './features/WrapHeader.js';

const PDFViewer = () => {
  const [pdfURL , setPdfURL]  = useState("" ) ; 
  const obj = urlHelper( 0 , 0  , 0  ) ; 

  


  const {fileList, setFileList, originalFile, setOriginalFile,setCalendarEntry, setMetadataPath} = useContext(ContextInfo) ;

  const clockMessageRef= useRef(null);
  const btnRef=useRef(null) ; 
  const pdfRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams() ;

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
   
      'pdfjs-dist/legacy/build/pdf.worker.min.js',
       import.meta.url,
     ).toString();


     useEffect(()=>{
      const url= searchParams.get("url") ; 
      if( obj[url] ){
       window.localStorage.setItem( 'link' , obj[url]) ; 
      //  setMetadataPath(obj[url])
      }
     
  
  
      console.log( "typeofurl" , typeof(url) ) ; 
      // setIndex
      setPdfURL( window.localStorage.getItem('link')   ) ; 
      // setBookIndex( Number( url ) ) ;
      console.log( "typeofurl" , typeof(bookIndex) ) ; 
  
      const currDate = new Date().getDate() ; 
      let calendarArr = JSON.parse(localStorage.getItem("calendarArray") );
      console.log("localstorage" , calendarArr) ;
      if( !calendarArr[currDate-1]){
        calendarArr[ currDate-1] = true ;
        localStorage.setItem("calendarArray" , JSON.stringify(calendarArr)) ;
  
        // setCalendarEntry[currDate-1] = true ;
        setCalendarEntry( [...calendarArr] )  ;
        
      }
  
      
      
      // document.querySelector(".magazine").turn(  'page' , 2 ) ; 
      // alert( pdfURL)
      if( originalFile.length !== 0 ){
        localStorage.setItem( "originalFile",JSON.stringify(fileList) )
      }
  
      // document.documentElement.style.setProperty('--main-color1', '70vw');
      // document.documentElement.style.setProperty('--main-color2', '70vh');
      // document.documentElement.style.setProperty('--main-color3', '35vw');
      
    //  alert("metaDataAccess")
      // up
    }, []) ;

//  const pdfURL = "https://firebasestorage.googleapis.com/v0/b/uploadingfile-b50cc.appspot.com/o/8eab544d671a8b9a1bc3e99f376f17b2c1fe8855084c3f1fcec34d1141290dde%2FCODING%20COMPETITIONS.pdf-5c2eac66-9487-41da-ab04-1a0b89ddffde?alt=media&token=32b62e83-b4d8-415c-ba40-788bf1125e81"
return (
 <div>
  <WrapHeader clockMessageRef={clockMessageRef} pdfRef={pdfRef} btnRef={btnRef}/>
  <div   className='pdfContainer'>
 <div ref={pdfRef} className="abc">
 <Document className="def" file={pdfURL}>
 <Page  renderTextLayer={false}
                        renderAnnotationLayer={false}
                        customTextRenderer={false} pageNumber={1}
   />
    <Page  renderTextLayer={false}
                        renderAnnotationLayer={false}
                        customTextRenderer={false} pageNumber={2}
   />
    
 </Document>
 </div>
  </div>
 
 <ClockMessage  clockMessageRef={clockMessageRef} fileList={[]}/>
 </div>
 );
};
export default PDFViewer;