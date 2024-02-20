import React , {useState, useEffect , useContext, useRef} from 'react';
import { Document, Page , pdfjs} from 'react-pdf';
import { useSearchParams } from 'react-router-dom';
import "../style/WrapPage.css"
import ClockMessage from './features/ClockMessage.js';
import { ContextInfo } from '../App.js';
import urlHelper from '../utils/urlHelper';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

// import {pdfjsWorker} from "../../node_modules/pdfjs-dist/build/pdf.worker.mjs"
// import kk from "../../node_modules/pdfjs-dist/build/"
// import filePDF from "../assets/filePDF.js"
// import 'pdfjs-dist/build/pdf.worker'; 
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

  // pdfjs.GlobalWorkerOptions.workerSrc = new URL('./pdfScript.js').toString();

  // GlobalWorkerOptions.workerSrc = new URL(
   
    //   'pdfjs-dist/legacy/build/pdf.worker.min.js',
    //    import.meta.url,
    //  ).toString();
  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
   
  //   'pdfjs-dist/legacy/build/pdf.worker.min.js',
  //    import.meta.url,
  //  ).toString();
 
  // pdfjs.GlobalWorkerOptions.workerSrc = "https://github.com/Decostar123/Kindle/blob/master/src/assets/filePDF.js"
  // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js`;
  // console.log( `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`)
  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
   
  //   'pdfjs-dist/legacy/build/pdf.worker.min.js',
  //    import.meta.url,
  //  ).toString();
  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
   
  //   'pdfjs-dist/build/pdfScript.js',
  //    import.meta.url,
  //  ).toString();
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker  ;
   useEffect(()=>{

    // pdfjs.GlobalWorkerOptions.workerSrc ="./filePdf.js"  ;
    //  pdfjs.GlobalWorkerOptions.workerSrc = "./pdfScript.js"

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