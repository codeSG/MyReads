import React, {useState} from 'react'
import { Document, Page , pdfjs, StyleSheet} from 'react-pdf';
import "../style/PdfViewer.css"
import { useSearchParams } from 'react-router-dom';
import urlHelper from '../utils/urlHelper';

const PdfViewer = () => {
  const [searchParams, setSearchParams] = useSearchParams() ;
  const url= searchParams.get("url") ; 
  const [leftDiv , setLeftDiv] = useState(false) ; 
  const [rightDiv  , setRightDiv] = useState( false ) ; 
  const obj = urlHelper( 0 , 0  , 0  ) ; 
  const [numPages , setNumPages] = useState(null) ; 
    const [pageNumber , setPageNumber]  = useState(1) ; 
  // const [pageNumber  , setP]
  console.log( "222222" , obj ); 

    // return <div style={{marginTop:"100px"}}><h1>Hi</h1></div>

    // pdfjs.GlobalWorkerOptions.workerSrc =  
    // `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
   

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
      ).toString();

      const options = {
        cMapUrl: "cmaps/",
        cMapPacked: true,
        standardFontDataUrl: "standard_fonts/",
      };
    
  //  const url= "https://firebasestorage.googleapis.com/v0/b/uploadingfile-b50cc.appspot.com/o/8eab544d671a8b9a1bc3e99f376f17b2c1fe8855084c3f1fcec34d1141290dde%2Fweb_prac6.pdf-24c9204b-3e61-437d-b56f-fc025f9eb53b?alt=media&token=86401278-51a9-4e65-9451-8de5e347dfce";
   
//  const url =  "https://firebasestorage.googleapis.com/v0/b/uploadingfile-b50cc.appspot.com/o/8eab544d671a8b9a1bc3e99f376f17b2c1fe8855084c3f1fcec34d1141290dde%2Fweb_prac6.pdf-24c9204b-3e61-437d-b56f-fc025f9eb53b?alt=media&token=86401278-51a9-4e65-9451-8de5e347dfce"

//    const url =  
// "https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf"
   function onDocumentSuccess({numPages}){
    console.log("pdfpages" , numPages);
        setNumPages(numPages) ; 

    }
    console.log( url , obj, obj[url]) ; 
   return (
    <div className="pdfContainer">
    
          <div className='leftDiv' onMouseEnter={()=>setLeftDiv(true)} onMouseLeave={()=>setLeftDiv(false)}
                onClick={()=>{
                  setPageNumber( prev=> { if( prev !== 1 ) return prev-1 ; return prev });
                }}>
             { (pageNumber!==1 ) && leftDiv &&
              <button class="leftDivButton">
               <img src="https://www.svgrepo.com/download/309423/chevron-left.svg"/>
              </button>
             } 
          </div>
          <Document file={obj[url]} onLoadSuccess={onDocumentSuccess}>
                <Page
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    customTextRenderer={false}
                    
                 pageNumber={pageNumber} />
            </Document>
            <div className='rightDiv'
             onMouseEnter={()=>setRightDiv(true)} onMouseLeave={()=>setRightDiv(false)}
             onClick={()=>{
                  setPageNumber( prev=> { if( prev !== numPages) return prev+1 ; return prev });
                }}
             >
              
              {(pageNumber !== numPages  ) && rightDiv && <button class="rightDivButton">
               <img src="https://www.svgrepo.com/download/309424/chevron-right.svg  "/>
              </button> }
            </div>           
    </div>
  )

}

export default PdfViewer