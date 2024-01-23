
import React, {useState, useEffect , useRef} from 'react'
import { Document, Page , pdfjs, StyleSheet} from 'react-pdf';
import "../style/PdfViewer.css"
import { useSearchParams } from 'react-router-dom';
import urlHelper from '../utils/urlHelper';
import "../style/WrapPage.css"
import $ from "jquery";
import "./tturn.js";
import Turn from "./Turn.js";
// const obj = urlHelper( 0 , 0  , 0  ) ; 

const WrapPage = () => {


 


  const options = {
    width: 800,
    height: 600,
    autoCenter: true,
    display: "double",
    acceleration: true,
    elevation: 50,
    gradients: !$.isTouch,
    when: {
      turned: function(e, page) {
        console.log("Current view: ", $(this).turn("view"));
      }
    }
  };
  


  const [searchParams, setSearchParams] = useSearchParams() ;
  const url= searchParams.get("url") ; 
  const [leftDiv , setLeftDiv] = useState(false) ; 
  const [rightDiv  , setRightDiv] = useState( false ) ; 
  const obj = urlHelper( 0 , 0  , 0  ) ; 
  const [numPages , setNumPages] = useState(null) ; 
    const [pageNumber , setPageNumber]  = useState(1) ; 

    useEffect(()=>{

      
    }, []) ; 

  // const [pageNumber  , setP]
  console.log( "222222" , obj ); 
  function onDocumentSuccess({numPages}){
    console.log("pdfpages" , numPages);
        setNumPages(numPages) ; 
        console.log("&&&&&&&&&") ; 

    }

    // return <div style={{marginTop:"100px"}}><h1>Hi</h1></div>

    // pdfjs.GlobalWorkerOptions.workerSrc =  
    // `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
   

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
      ).toString();

    
    
  //  const url= "https://firebasestorage.googleapis.com/v0/b/uploadingfile-b50cc.appspot.com/o/8eab544d671a8b9a1bc3e99f376f17b2c1fe8855084c3f1fcec34d1141290dde%2Fweb_prac6.pdf-24c9204b-3e61-437d-b56f-fc025f9eb53b?alt=media&token=86401278-51a9-4e65-9451-8de5e347dfce";
   
//  const url =  "https://firebasestorage.googleapis.com/v0/b/uploadingfile-b50cc.appspot.com/o/8eab544d671a8b9a1bc3e99f376f17b2c1fe8855084c3f1fcec34d1141290dde%2Fweb_prac6.pdf-24c9204b-3e61-437d-b56f-fc025f9eb53b?alt=media&token=86401278-51a9-4e65-9451-8de5e347dfce"

//    const url =  
// "https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf"
   
    console.log( "url , obj, obj[url]",url , obj, obj[url]) ; 
    

    // if( numPages === null ){
    //   return <h1>Preparing your data </h1>
    // }
      // if( numPages === null ) return <h1>Searxhing</h1>

    return(


    <div className="pdfContainer">
    
    
    
    <Document className="abc" file={"https://firebasestorage.googleapis.com/v0/b/uploadingfile-b50cc.appspot.com/o/8eab544d671a8b9a1bc3e99f376f17b2c1fe8855084c3f1fcec34d1141290dde%2Fweb_prac6.pdf-24c9204b-3e61-437d-b56f-fc025f9eb53b?alt=media&token=86401278-51a9-4e65-9451-8de5e347dfce"}
  onLoadSuccess={onDocumentSuccess}
   >
    <Document className="def" file={"https://firebasestorage.googleapis.com/v0/b/uploadingfile-b50cc.appspot.com/o/8eab544d671a8b9a1bc3e99f376f17b2c1fe8855084c3f1fcec34d1141290dde%2Fweb_prac6.pdf-24c9204b-3e61-437d-b56f-fc025f9eb53b?alt=media&token=86401278-51a9-4e65-9451-8de5e347dfce"}>
    <Turn options={options} className="magazine" >

<div className="abc" key={4 } style={{backgroundColor:"gray"}}></div>
{ new Array(numPages).fill(1).map( ( ele , ind)=>

 (
  
  
  

          <Page  key={ind}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              customTextRenderer={false}
              
           pageNumber={ind+1   } />

 
           
           )
 
)}
<div className="abc" key={5 } style={{backgroundColor:"gray"}}></div>
<div className="abc" key={6 } style={{backgroundColor:"gray"}}></div>
</Turn>

   
   </Document>
 
    
    </Document>  
           
          {/* <Turn options={options} className="magazine">
      {pages.map((page, index) => (
        <div key={index} className="page">
          <img   src={page} alt="" />
        </div>
      ))}
    </Turn> */}
        
                         
                       
                
             
                      
    </div>
   ) 

}

export default WrapPage