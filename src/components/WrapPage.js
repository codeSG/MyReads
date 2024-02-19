import React , {useState, useEffect , useContext, useRef} from 'react';
import { Document, Page , pdfjs} from 'react-pdf';
import { useSearchParams } from 'react-router-dom';
import "../style/WrapPage.css"
import ClockMessage from './features/ClockMessage.js';
import { ContextInfo } from '../App.js';
import urlHelper from '../utils/urlHelper';
// const obj = urlHelper( 0 , 0  , 0  ) ; 

import WrapHeader from './features/WrapHeader.js';

// import file from "./"

const PDFViewer = () => {
  const [pdfURL , setPdfURL]  = useState("" ) ; 
  const obj = urlHelper( 0 , 0  , 0  ) ; 

  


  const {fileList, setFileList, originalFile, setOriginalFile,setCalendarEntry, setMetadataPath} = useContext(ContextInfo) ;

  const clockMessageRef= useRef(null);
  const btnRef=useRef(null) ; 
  const pdfRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams() ;

  // pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
   
  //   'pdfjs-dist/legacy/build/pdf.worker.min.js',
  //    import.meta.url,
  //  ).toString();
  pdfjs.GlobalWorkerOptions.workerSrc = `
  //unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  
  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
   
  //   'pdfjs-dist/legacy/build/pdf.worker.min.js',
  //    import.meta.url,
  //  ).toString();


   useEffect(()=>{
   console.log( sessionStorage.getItem("bookIndex"))
   
   }  ,[])

//  const pdfURL = "https://firebasestorage.googleapis.com/v0/b/uploadingfile-b50cc.appspot.com/o/8eab544d671a8b9a1bc3e99f376f17b2c1fe8855084c3f1fcec34d1141290dde%2FCODING%20COMPETITIONS.pdf-5c2eac66-9487-41da-ab04-1a0b89ddffde?alt=media&token=32b62e83-b4d8-415c-ba40-788bf1125e81"
return (
 <div>
  <WrapHeader clockMessageRef={clockMessageRef} pdfRef={pdfRef} btnRef={btnRef}/>
  <div   className='pdfContainer'>
 <div ref={pdfRef} className="abc">
 <Document className="def" file={fileList[Number(sessionStorage.getItem("bookIndex"))].data}>
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