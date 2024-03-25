import React, { useRef } from 'react'
import { useState , useEffect , useContext} from 'react' ; 
// import {storage} from "./firebase" ; 
// import {ref, uploadBytes , listAll, BDownloadURL, deleteObject, getMetadata} from "firebase/storage" ; 
// import {v4} from "uuid" ; 
import { Link } from 'react-router-dom';
// import urlHelper from '../utils/urlHelper';

import DeletePopup from '../../components/Popup/DeletePopup.js';
import Spinner from '../../components/Popup/Spinner.js';
import { useSearchParams } from 'react-router-dom';
import Calendar from "../../components/Calendar.js"
// import { Link } from 'react-router-dom';
import AddNewFilePopup from '../../components/Popup/AddNewFilePopup.js';
import UserName from '../../components/Popup/UserName.js';

import {ContextInfo}  from "../../App.js" ; 
import bookImageSubstitue from "../../assets/bookImageSubstitue.jpg"
import uploadBookImage from "../../assets/uploadBook.png"
import  plusUpload from "../../assets/plusUpload.png"
// import React from 'react'
import "../../css/BetterFile.css";
import CanvasComponent from '../../components/Canvas/CanvasComponent.js';
import FrequentCanvasComponent from "../../components/Canvas/FrequentCanvasComponent.js"
import Heading from './Heading.js';
import openDatabase from "../../utils/openDatabase.js"

// import getBookAuthor from '../utils/getBookAuthor.js';
// import 'boxicons';
import { Play , Trash2} from 'lucide-react';
// import {Trash2 }

import LeftUI from './LeftUI.js';
import { setFrequentBooks } from '../../utils/updateBookRecentlyViewed.js';

import SendFeedBack from '../../components/Popup/SendFeedBack.js';

import RecentlyViewedBook from './RecentlyViewedBook.js';

import ProgressBar from '../../components/ProgressBar.js';
import getPercentageCompleted from '../../utils/getPercentageCompleted.js';
import fetchDataFromIndexedDB from "../../utils/fetchDataFromIndexedDB.js"
import readAllData from "../../utils/readAllData.js"

const BetterFile = ({fileUpload, setFileUpload,spinner,fileName, setFileName , 
  setSpinner}) => {

    const [ sendFeedBack , setSendFeedBack] = useState( false ) ; 
    // const [ firstTimeViewName  , setFirstTimeViewName ] = useState( localStorage.getItem("userName")  ) ; 
    const [ nameDone , setNameDone] = useState( localStorage.getItem("userName") === "" ? true : localStorage.getItem("userName") ) ; 
    const [ uploadNewBook , setUploadNewBook] = useState( false ) ; 
   
      // const [] = useState( false ) ; 
    
    const {fileList, setFileList, originalFile, setOriginalFile, calendarEntry,setCalendarEntry, 
      hashID , setHashID, 
      bookRecentlyViewed, setBookRecentlyViewed , 
      userName   , firebaseFileFetched  , setWrapPageRunTour
    } = useContext(ContextInfo) ;

    






    
      
    const [search , setSearch] = useState("") ; 
      // const tt =  hash.get("id") ;
     
      const [black , setBlack] = useState( true ) ;  
      const [deleteName , setDeleteName ]  = useState("") ; 
      const [ deleteInd , setDeletInd ] = useState(-1) ; 
      const [uploadBook , setUploadBook] = useState( false  ); 
      const [deletePath  , setDeletePath] = useState(-1) ; 
      const [ deleteBookID , setDeleteBookID ] = useState(-1) ; 

  
   
      
    
    


      useEffect( () => {
        // setSpinner(false) ; 
        // setBlack( false) ; 
        // alert(getEmail()) ; 
          if( !firebaseFileFetched ) {
            showCalendarDetails() ; 
            return ; 
          } 
    

        

      setEmailUploadedToday() ; 
       fetchDataFromIndexedDB(setBlack, setSpinner , setBookRecentlyViewed, setFileList, setOriginalFile ,  userName , setFrequentBooks) ;
       showCalendarDetails() ; 

          
        }, []);

        function setEmailUploadedToday(){
          const temp = new Date() ; 
          const day = temp.getDate() ; 
          let arr = JSON.parse(localStorage.getItem("setEmailUploadedToday") )  ; 
          const bool = !arr || arr[0] !== day ? false : arr[1] ; 
          // if( bool ) return ; 
          arr = [ day , bool ] ; 
          localStorage.setItem("setEmailUploadedToday" , JSON.stringify(arr)) ;

          

        }
        function showCalendarDetails(){
          const temp = new Date() ; 
          const month = temp.getMonth() ; 
          const year = temp.getFullYear() ; 
          let numberOfDays = new Date(year, month+1, 0).getDate();
          let calendarArr = JSON.parse(localStorage.getItem("calendarArray") ); 
          if( calendarArr === null ){
            const readStatus = { readToday : false , pagesRead :{} , timeSpent : 0  } ; 
            const pp = new Array(numberOfDays).fill({ ...readStatus }) ; 

            localStorage.setItem("calendarArray" , JSON.stringify(pp)) ; 
            calendarArr = JSON.parse(localStorage.getItem("calendarArray") );
            console.log("localstorage" , calendarArr) ;
            setCalendarEntry( calendarArr )  ; 
            // alert("changsvakue 1");

          }else if( calendarArr.length !== numberOfDays ){
            const readStatus = { readToday : false , pagesRead :{} , timeSpent : 0  } ; 
            const pp = new Array(numberOfDays).fill({...readStatus}) ; 
            
            localStorage.setItem("calendarArray" , JSON.stringify(pp)) ; 
            calendarArr = JSON.parse(localStorage.getItem("calendarArray") );
            console.log("localstorage" , calendarArr) ;
            setCalendarEntry( calendarArr )  ; 
            // alert("changsvakue 2");
          }else if(calendarEntry.length===0){

            setCalendarEntry(calendarArr)
          } 
        }
        function searchFilter(val  ){
            // window.localStorage.setItem( 'search' , val ) ; 
            setSearch( val ) ; 
            // alert( search)
            // console.log( "search" , val ) ; 
            const filterArr = originalFile.filter( ele =>{
              let aword = ele.bookName.toLowerCase() ; 
              let bword  = val.toLowerCase() ; 
              return aword.includes( bword ) ;
            })
            setFileList( filterArr ) ; 
        }
      //  if( originalFile.length === 0 ){
      //   setBlack(true) ;setSpinner(true);
      //  }else{
      //   setBlack(false )  ; setSpinner(false)
      //  }
  return (
    <div id="bookBox"> 
      <LeftUI
     setBlack={setBlack}
     setUploadNewBook={setUploadNewBook}
      setSendFeedBack={setSendFeedBack}
      />
      <div id="right">
           
            <Heading searchFilter={searchFilter} />
        
          
            <RecentlyViewedBook setDeleteName={setDeleteName}  
            bookRecentlyViewed ={bookRecentlyViewed} FrequentCanvasComponent={FrequentCanvasComponent}
              
          
             setDeleteBookID={setDeleteBookID} 
             setUploadNewBook={setUploadNewBook}
            />

         

           
          
           
            <AddNewFilePopup setUploadBook={setUploadBook} setBlack={setBlack} 
            fileUpload={fileUpload} setFileUpload={setFileUpload}  setSpinner={setSpinner}
            hashID={hashID} setHashID={setHashID} 
            uploadNewBook={uploadNewBook}  setUploadNewBook={setUploadNewBook} />
          {/* <div id="addBook">
            <p>YOUR LIBRARY</p>
            <button>+ ADD BOOK</button>
          </div> */}
          <div id="book-container">
          {
            fileList.map( (ele, ind)=>
                    {

                      // const key = "" + ind ; 
                      //     urlHelper( key, ele.url , 1 ) ;
                      // {alert("fileList.map( (ele, ind)=>")} 
                      return(
                      
                        <div  className='textBook fifth-step'>
                          <p className="title">{ele.bookName.substring(0, ele.bookName.length -4 )}</p>
                           <div className="image"> 
                           
                          <Link to={`/file/showfile?bookID=${ele.id}`}>
                          <CanvasComponent  bookID={ele.id}  originalFile={originalFile}
                  bookImageSubstitue={bookImageSubstitue}
                  bookClass={"canvasImage"} />
                    </Link>
                          
                          
                          
                             
                           
                              
                          </div>
                          {/* <div> */}
                          <div className="progressBook">
                            
                          <ProgressBar
              outerDiv={"progressBookDiv"}  innerDiv1={"progress1Div"}  innerDiv2={"progress2Div"} progressWidth={ getPercentageCompleted(  ele.id  , originalFile) }                
              
                              />
                          
                            
                          </div>
                          {/* </div> */}
                          <div id="content">
                          
                          
                                <div className="bookoptions"  >
                                
                                  
                                  <Link   className="FileLink" to={`/file/showfile?bookID=${ele.id}`} >
                                  <button>Read</button>
                                  
                                  </Link>
                                 
                                

                        <Trash2   className="trash"   onClick={ ()=>{

                          
                          setDeleteBookID( ele.id) ; 
                          setDeleteName( ele.bookName );
                        // alert( ele.id) ; 
                        // setBlack( true ); 
                      }}/>


                              </div>
                          
                              

                          
                          
                         
                          </div>
                      </div>
                     
                     
                     )
                      
                  }
               )

          }
          
          





            </div>
      </div>
      




        {
            black && <div  onClick={()=>{if( sendFeedBack) {setSendFeedBack(false) ;  setBlack(false)}} }
            style={{backgroundColor:"black", position:"fixed", 
            top:"0", left:"0", right:"0",bottom:"0",
            opacity:"0.5" , zIndex:"4" , width:"100%" , height:"100%"}}>

            </div>
          }
           {
            (userName===null) && <UserName  setBlack={setBlack} setSpinner={setSpinner}
            nameDone={nameDone} setNameDone={setNameDone} />

          }
          {
       sendFeedBack && <SendFeedBack  setSendFeedBack={setSendFeedBack} setBlack={setBlack} 
  />

          }

          {
            
            ( deleteBookID !== -1 ) && <DeletePopup  
            setOriginalFile={setOriginalFile}
             setFileList={setFileList}
            originalFile={originalFile}
            fileList={fileList}
            
           
             setBlack={setBlack}
              setDeletInd={setDeletInd}  
              deletePath={ deletePath} setDeletePath={setDeletePath}  deleteBookID={deleteBookID} 
              setDeleteBookID = {setDeleteBookID} deleteName={deleteName} setDeleteName={setDeleteName}
              uploadBook={uploadBook}
              // deleteAuthor={} deleteGenre={}
              
              
            />
            
          
          }
           {
            
            ( deleteBookID !== -1 ) &&  <div 
                style={{backgroundColor:"black", position:"fixed", 
                top:"0", left:"0", right:"0",bottom:"0",
                opacity:"0.6" , zIndex:"4" , width:"100%" , height:"100%"}}>

            </div>
            
          
          }

          {
             uploadBook && <AddNewFilePopup     
             setUploadBook={setUploadBook} setBlack={setBlack}
    fileUpload={fileUpload} setFileUpload={setFileUpload}  
    setSpinner={setSpinner} hashID={hashID} setHashID={setHashID} 
            />
          }
          {
            spinner && <div>
                <div onClick={()=>{setDeletInd(-1) ; setBlack(false);}}
                style={{backgroundColor:"black", position:"fixed", 
                top:"0", left:"0", right:"0",bottom:"0",
                opacity:"0.6" , zIndex:"4" , width:"100%" , height:"100%"}}></div>
                <Spinner/>
            </div>
          }

         

 
    </div>

    
  )
}


export default BetterFile