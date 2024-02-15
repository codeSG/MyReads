
import React, {useState, useEffect , useContext, useRef} from 'react'
import { Document, Page , pdfjs, StyleSheet} from 'react-pdf';

import { useSearchParams } from 'react-router-dom';
import urlHelper from '../utils/urlHelper';
import "../style/WrapPage.css"
import $ from "jquery";
import "./tturn.js";
import Turn from "./Turn.js";
import {v4} from "uuid" ; 
import { ContextInfo } from '../App.js';
import {ref, getMetadata, updateMetadata } from "firebase/storage" ;
import {storage} from "./firebase" ;
import ClockMessage from './features/ClockMessage.js';
// const obj = urlHelper( 0 , 0  , 0  ) ; 

import WrapHeader from './features/WrapHeader.js';
const WrapPage = () => {



  const [expand , setExpand] = useState( true) ; 
  const btnRef=useRef(null) ; 
  const pdfRef = useRef(null);
  const [animtionNumber, setAnimationNumber] =useState(0) ; 
  const {fileList, setFileList, originalFile, setOriginalFile,setCalendarEntry, setMetadataPath} = useContext(ContextInfo) ;

  const [searchParams, setSearchParams] = useSearchParams() ;
  const url= searchParams.get("url") ; 
  const [leftDiv , setLeftDiv] = useState(false) ; 
  const [rightDiv  , setRightDiv] = useState( false ) ; 
  const obj = urlHelper( 0 , 0  , 0  ) ; 
  const [numPages , setNumPages] = useState(null) ; 
    const [_pageNumber , _setPageNumber]  = useState(1) ; 
  const [ pdfURL , setPdfURL] = useState( obj[url]) ; 
  const [bookIndex , setBookIndex] = useState(Number( url ) ) ;
  const pdfDivRef = useRef(null)
  // setOriginalFile( JSON.parse(localStorage.getItem("originalFile") ));
          // alert("noooooooo") 
  // alert( pdfURL ) ; 
  
// alert(originalFile) ; 
console.log("originaFile" , originalFile)
  const options = {
    // mode: "no-cors",
    width: 1000,
    height: 700,
    autoCenter: true,
    display: "double",
    acceleration: true,
    elevation: 50,
    gradients: !$.isTouch,
    when: {
      turned: function(e, page) {
        // console.log("Current view: ", $(this).turn("view") , page ) ;
        console.log(   " the page numbe is" ,page ) ;
        // _setPageNumber(page) ; 
        updatePageNumber(page  ) ;

      }
    } , 
    page : !fileList[bookIndex] ? 1:fileList[bookIndex].currentPage
    // currentPage ?originalFile[bookIndex].currentPage :1

  };
  const clockMessageRef= useRef(null)



  useEffect(()=>{
    if( obj[url] ){
     window.localStorage.setItem( 'link' , obj[url]) ; 
     setMetadataPath(obj[url])
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

  // const [pageNumber  , setP]
  console.log( "222222" , obj ); 
 
    function onDocumentSuccess({numPages}){
    console.log("pdfpages" , numPages);
        setNumPages(numPages) ; 
      console.log( "originalFile[bokIndex", fileList[bookIndex]) ; 
      setToatlPages(numPages);
        // if( )


        console.log("&&&&&&&&&") ; 

    }

    async function updatePageNumber(pageNumber){
      

       
        console.log("originalIle is tcausing triuble " , originalFile ) ; 
        // if( originalFile.length === 0 ){
        //   console.log( originalFile)
        //   setOriginalFile( JSON.parse(localStorage.getItem("originalFile") ));
        //   console.log(JSON.parse(localStorage.getItem("originalFile") )) ; 
        //   alert(`I set the value ${originalFile}`) ; 

        //   console.log( originalFile )
        // }
        const metaRef = ref( storage , fileList[bookIndex].path ) ;
        console.log( "originalFile[bookIndex].path " , fileList[bookIndex].path );
        const metaData= await  getMetadata(metaRef) ;
        const obj = metaData.customMetadata ; 
        console.log("obj" , obj ) ; 
        const newMetadata = {
            "customMetadata":{
              ...obj , "currentPage" :pageNumber  
            }
          
         
        };
        console.log( " newMetaData" , newMetadata  ) ; 

        const resultMetaData = await updateMetadata(metaRef, newMetadata) ; 
        console.log( "resultMetaData" , resultMetaData) ;
        
        // setOriginalFile( )
        fileList[bookIndex].currentPage = pageNumber ;
        // const pageUpdateArr = [...fileList] ; 
        // pageUpdateArr[bookIndex].currentPage = pageNumber;
        // setFileList(pageUpdateArr)
        // _setPageNumber(pageNumber)
      
    }
    async function setToatlPages(numPages){
      if( numPages%2 === 0 ){
        numPages +=2 ; 
      }else{
        numPages += 3 ; 
      }
      if( fileList[bookIndex].totalPage === -1 || !fileList[bookIndex].totalPage ){
        const metaRef = ref( storage , fileList[bookIndex].path ) ;
        console.log( "originalFile[bookIndex].path " , fileList[bookIndex].path );
        const metaData= await  getMetadata(metaRef) ;
        const obj = metaData.customMetadata ; 
        console.log("obj" , obj ) ; 
        const newMetadata = {
            "customMetadata":{
              ...obj , "totalPage" : numPages 
            }
          
         
        };
        console.log( " newMetaData" , newMetadata  ) ; 

        const resultMetaData = await updateMetadata(metaRef, newMetadata) ; 
        console.log( "resultMetaData" , resultMetaData) ;
        
        // setOriginalFile( )
        fileList[bookIndex].totalPage = numPages ;
      }
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

      // useEffect(()=>{
      //   console.log( " useefect the page number is" , pageNumber ) ; 
      // } , [ pageNumber]) ;

    if( fileList.length === 0 ){
      setFileList( JSON.parse(localStorage.getItem("originalFile") ));
      return <h1>Preparing Your Book .... </h1>
    }
    return(

    
   
      <div>
      <WrapHeader clockMessageRef={clockMessageRef} pdfRef={pdfRef} btnRef={btnRef}/>
        
        
        <div ref={pdfRef} className="pdfContainer">
        
        

        <Document   className="abc" file={pdfURL }
            onLoadSuccess={onDocumentSuccess} 
      >
        <Document className="def" file={pdfURL }    >
        <Turn options={options} className="magazine"  >
    
    <div className="ghi" key={0 } ></div>
    { new Array(numPages).fill(1).map( ( ele , ind)=>

    (    
            

                    <Page  
                        // onMouseEnter={(()=>setPageNumber( ind+ 1))}
                      key={ind+1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        customTextRenderer={false}
                        
                    pageNumber={ind+1} />
            
              
              )
    
    )}
    <div className="ghi" key={ numPages+1}></div>
    {
      (numPages%2 !==0 ) && <div className="ghi" key={numPages+2 } ></div>
    }

    </Turn>

      
      </Document>
    
        
        </Document>  
       
       
        <ClockMessage  clockMessageRef={clockMessageRef} fileList={fileList}/>
              
              {/* <Turn options={options} className="magazine">
          {pages.map((page, index) => (
            <div key={index} className="page">
              <img   src={page} alt="" />
            </div>
          ))}
        </Turn> */}
            
                            
                          
        {/* <button ref={btnRef} style={{"backgroundColor":"black" , "padding":"5px" , "color":"white" , "position":"absolute" , "left":"5px", "bottom":"5px", "borderRadius":"10px", "cursor":"pointer"}}
        onClick={()=>{
          // console.log(clockMessageRef.current.classList);
        
        }}>Expand</button>   
                 */}

                          
        </div>
      </div>
    

    
    
   ) 

}

export default WrapPage