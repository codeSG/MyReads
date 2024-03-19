import React, { useRef } from 'react'
import { useState , useEffect , useContext} from 'react' ; 
import {storage} from "./firebase" ; 
import {ref, uploadBytes , listAll, getDownloadURL, deleteObject, getMetadata} from "firebase/storage" ; 
import {v4} from "uuid" ; 
import { Link } from 'react-router-dom';
import urlHelper from '../utils/urlHelper';

import DeletePopup from './DeletePopup';
import Spinner from './Spinner';
import { useSearchParams } from 'react-router-dom';
import Calendar from "../components/features/Calendar"
// import { Link } from 'react-router-dom';
import AddNewFilePopup from './features/AddNewFilePopup';
import UserName from './features/UserName.js';

import {ContextInfo}  from "../App"
import openBook from "../image/openBook.png"

import dustbins from "../image/dustbins.png"
import bookImageSubstitue from "../image/bookImageSubstitue.jpg"
import uploadBookImage from "../image/uploadBook.png"
import  plusUpload from "../image/plusUpload.png"
// import React from 'react'
import "../style/BetterFile.css";
import CanvasComponent from './CanvasComponent';
import FrequentCanvasComponent from "./FrequentCanvasComponent.js"
// import 'boxicons';
import { Play , Trash2} from 'lucide-react';
// import {Trash2 }

import LeftUI from './LeftUI';
import { setFrequentBooks } from '../utils/updateBookRecentlyViewed';

import SendFeedBack from './features/SendFeedBack.js';


const BetterFile = ({fileUpload, setFileUpload,spinner,fileName, setFileName , 
  setSpinner}) => {

    const [ sendFeedBack , setSendFeedBack] = useState( false ) ; 
    const [ firstTimeViewName  , setFirstTimeViewName ] = useState( localStorage.getItem("userName")  ) ; 
    const [ nameDone , setNameDone] = useState( localStorage.getItem("userName") === "" ? true : localStorage.getItem("userName") ) ; 
    const [ uploadNewBook , setUploadNewBook] = useState( false ) ; 
   
    const {fileList, setFileList, originalFile, setOriginalFile, calendarEntry,setCalendarEntry, 
      hashID , setHashID, 
      dataBaseCreated,
      setDataBaseCreated,
      request,
      setRequest, 
      bookRecentlyViewed, setBookRecentlyViewed , 
      userName , setUserName  , firebaseFileFetched , setFirebaseFileFetched , setWrapPageRunTour
    } = useContext(ContextInfo) ;

    useEffect(()=>{
      // if(firebaseFileFetched  && nameDone ) alert("  if( nameDone && firebaseFileFetched){ ")

      if( nameDone && firebaseFileFetched){
       
        if( firstTimeViewName === null ){
          setBlack(false) ; 
      
          setSpinner( false ) ; 
          setWrapPageRunTour( true) ; 
        }
     
                
      }
    } , [ firebaseFileFetched  , nameDone ] ) ; 
    // alert( ` The bane of the user is  ${userName}  ${userName===''}` )
    function getImageLink(bookID){
      if( !bookID || bookID === -1 ) return bookImageSubstitue ; 

      let arr = originalFile.filter( ele => ele.id === bookID ) ; 
      if( arr.length === 0 ) return bookImageSubstitue;
      return arr[0].bookImageLink ; 
    }
    function getBookAuthor(bookID){
      if( !bookID || bookID === -1 ) return "" ; 

      let arr = originalFile.filter( ele => ele.id === bookID ) ; 
      if( arr.length === 0 ) return ""
      return arr[0].bookAuthor ;
    }
    function getBookCategory(bookID){
      if( !bookID || bookID === -1 ) return "" ; 

      let arr = originalFile.filter( ele => ele.id === bookID ) ; 
      if( arr.length === 0 ) return ""
      return arr[0].bookGenre ;
    }
    function getBookName(bookID){
      if( !bookID || bookID === -1 ) return "" ; 

      let arr = originalFile.filter( ele => ele.id === bookID ) ; 
      if( arr.length === 0 ) return ""
      return arr[0].bookName.substring( 0 ,arr[0].bookName .length - 4  ) ;
    }
    function getBookPath(bookID){
      // alert(bookID )
      if( !bookID || bookID === -1 ) return "/" ; 
      // if( arr.length === 0 ) return ""
      

      return `/file/showfile?bookID=${bookID}` ; 


    }

    function getPercentageCompleted(bookID ){
      if( !bookID || bookID === -1 ) return 0 ;
      
      let arr = originalFile.filter( ele => ele.id === bookID ) ; 
      if( arr.length === 0 ) return 0 ;
      const a  = arr[0].currentPage ; 
      const b = arr[0].totalPage ; 
      if( a <=0 || b <=0  ) return 0 ; 
      
      const c = Math.ceil(  ( a/b)*100  ) ; 
      return c ;

    }

    function getFirstPage( bookID ){

      if( !bookID || bookID === -1 ) {
        const img = document.createElement("img") ;
        img.classList.add("canvasImage") ;
        img.src = bookImageSubstitue ; 
        return img ; 
      }
      let arr = originalFile.filter( ele => ele.id === bookID ) ; 
      if( arr.length === 0 ) {
        const img = document.createElement("img") ; 
        img.src = bookImageSubstitue ; 
        img.classList.add("canvasImage") ;
        return img ; 
      }



      const canvas = document.createElement('canvas');
      
      canvas.classList.add("canvasImage") ;

      const blob = new Blob(  [arr[0].data] , { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(blob);

      pageMovement(  objectUrl, canvas  )

      return canvas ; 



    }

    async function pageMovement(  objectUrl,  canvas){
      const pdfJS = await import('pdfjs-dist/build/pdf'); 
      pdfJS.GlobalWorkerOptions.workerSrc =
        window.location.origin + '/pdf.worker.min.mjs';


        pdfJS.getDocument({ url: objectUrl }).promise
        .then((doc) => {
            // Check if pdfDoc exists and destroy it
            loadNewDocument(doc , canvas );
        })
        .catch((error) => {
            console.error('Error loading PDF document:', error);
        });

    }




    async function loadNewDocument(doc, canvas ) {

      const pageNo = 1 ; 
      // alert( pageNo )
        // pdfDoc.current = doc;
      
        // const pageNo = Number( sessionStorage.getItem("currentPage") ) ; 
      
      
      // const totalPage = pdfDoc.current.numPages;
      // sessionStorage.setItem("totalPage" , totalPage ) ; 
      
      // Log the total number of pages
      // console.log('Total number of pages:', totalPage);
      // setTotalPages(totalPage ) 
      // console.log( " is it null " , pdfDoc.current ) ;
      
      
      
      
      // Prepare canvas using PDF page dimensions.
      const page = await doc.getPage(pageNo);      
      
      const viewport = page.getViewport({ scale: 1.5 });

            // const canvas = canvasRef.current;

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
      

    }





    const [ hash , setHash] = useSearchParams()  ;
      
    const [search , setSearch] = useState("") ; 
      // const tt =  hash.get("id") ;
      const tt = "8eab544d671a8b9a1bc3e99f376f17b2c1fe8855084c3f1fcec34d1141290dde" ; 
      setHashID( tt ) ;
      const [black , setBlack] = useState( true ) ;  
      const [deleteName , setDeleteName ]  = useState("") ; 
      const [ deleteInd , setDeletInd ] = useState(-1) ; 
      const [uploadBook , setUploadBook] = useState( false  ); 
      const [deletePath  , setDeletePath] = useState(-1) ; 
      const [ deleteBookID , setDeleteBookID ] = useState(-1) ; 
      // const 
      const listRef = ref( storage , `${tt}/`) ;
      console.log( "git list ref " , listRef) ;   
      async function deleteFile(path) {
          try {
        
            const desertRef = ref(storage, path);
        
           
            await deleteObject(desertRef);
            // alert("The File got deleted Successdully !!");
        
            const res = await listAll(listRef);
        
            
            const ans= new Array( res.items.length )
            for( let ind = 0 ; ind < res.items.length ; ind++ ){
                    const item = res.items[ind] ; 
                    const url = await getDownloadURL(item);
                    const ppp= item._location.path_ ; 
                    const metaRef = ref(storage, ppp );
                    const metaData= await  getMetadata(metaRef) ;
                    const des =  metaData.customMetadata.description ; 
                    const ttl = metaData.customMetadata.title ; 
                    const cP = Number(metaData.customMetadata.currentPage) ; 
                    const tP = Number(metaData.customMetadata.totalPage);

                    console.log( ind, "metadata" , des,ttl ) ; 
    
                    ans[ind] = { "url": url, "path": item._location.path_ , 
              "name" : item.name , "description":des ,
             "title":ttl , "currentPage" : cP , "totalPage" : tP  } ;
                    // ans[i] = { "url": url, "path": item._location.path_ };
  
            }
          
        
            console.log("Ans is here");
            console.log(ans);
           
            setFileList(ans);
            setOriginalFile( ans  ) ; 
           
        
            console.log("FileList is here");
            console.log(fileList);
          } catch (error) {
            // Uh-oh, an error occurred!
            alert("Error occurred: " + error.message);
          }
        }
        
           
   
        async function openDatabase(databaseName, objectStoreName) {
          return new Promise((resolve, reject) => {
              const request = indexedDB.open(databaseName);
      
              request.onerror = function(event) {
                  reject(new Error('Error opening database: ' + event.target.errorCode));
              };
      
              request.onsuccess = function(event) {
                  resolve(event.target.result);
              };
      
              // This event is triggered only the first time a database is created
              request.onupgradeneeded = function(event) {
                  const db = event.target.result;
                  const objectStore = db.createObjectStore(objectStoreName, { keyPath: 'id', autoIncrement: true });
                  objectStore.createIndex("bookName", "bookName", { unique: false });
                console.log("Database upgrade needed");
                  // You can create indexes if needed
                  // objectStore.createIndex('fieldName', 'fieldName', { unique: false });
              };
          });
      }
      async function readAllData(database, objectStoreName) {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(objectStoreName, 'readonly');
            const objectStore = transaction.objectStore(objectStoreName);
    
            const data = [];
    
            const cursorRequest = objectStore.openCursor();
    
            cursorRequest.onsuccess = function(event) {
                const cursor = event.target.result;
    
                if (cursor) {
                    data.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(data);
                }
            };
    
            cursorRequest.onerror = function(event) {
                reject(new Error('Error opening cursor: ' + event.target.error));
            };
        });
    }
    


      useEffect( () => {
        // setSpinner(false) ; 
        // setBlack( false) ; 
        // alert(getEmail()) ; 
          if( !firebaseFileFetched ) {
            showCalendarDetails() ; 
            return ; 
          } 
        sessionStorage.setItem("objectUrl" ,  ""  ) ; 

        async function fetchDataFromIndexedDB() {
          try {
              const database = await openDatabase('BooksDatabase' , "booksinformation");
              const data = await readAllData(database, 'booksinformation');
              console.log( " all the data from the daatabse " , data )  ; 
              let bookEntries = new Array(data.length ) ; 
            console.log( bookEntries[0]) ; 
              for( let ind in  data ){
                  const ele = data[ind] ; 
                let bookName = ele.bookName ; 
                bookName = bookName.replace(/.pdf/g, "") ;

                console.log( " the bookName to be searched for i his " , bookName )

                const bookInforMation = await fetch("https://www.googleapis.com/books/v1/volumes?q="+bookName) ; 
             console.log("bookInforMation",bookInforMation);
             const bookInforMationJson = await bookInforMation.json() ; 
             console.log("bookInforMationJson",bookInforMationJson);
             let cnt = 0 ;
             const bookObj = { ...ele } ; 
             bookInforMationJson.items =  bookInforMationJson.items ?  bookInforMationJson.items :[] ; 
             for( let bookentry of bookInforMationJson.items){
                 if( bookentry.volumeInfo?.authors ){
                  bookObj.bookAuthor  = bookentry.volumeInfo.authors[0] ;
                     cnt++;
                 }
                 if( bookentry.volumeInfo?.categories ){
                  bookObj.bookGenre  = bookentry.volumeInfo.categories[0] ;
                     cnt++;
                 }
                 if( bookentry.volumeInfo?.imageLinks?.thumbnail ){
                  // bookObj.bookImageLink  =  bookentry.volumeInfo.imageLinks.thumbnail ;
                  bookObj.categories = bookentry.volumeInfo.categories;
                     cnt++;
                 }
                //  if( bookentry.volumeInfo?.description ){
                //   ans[ind].bookDescription = bookentry.volumeInfo.description ;
                //   cnt++;
                //   }
                 if( cnt === 3 ){
                  bookEntries[ind] = bookObj ; 

                  console.log( " the book Obj for index " , ind , "is " , bookObj) ; 
                  break ; 
                 }
                

             }

             if( !bookObj.bookAuthor){
              bookObj.Author = "Anonyomus"  ; 
             }
             
             if( !bookObj.bookGenre){
              bookObj.bookGenre = "Anoyomus"  ; 
             }
             
             if( !bookObj.categories){
              bookObj.categories = []  ; 
             }

             if( cnt !== 3 ){
              bookEntries[ind] = bookObj ;
             }
            //  ans[ind].bookName = item.name.split(".pdf")[0] ; 


          }

              console.log('All data from object store:', data);
              console.log(" the book entry is " , bookEntries) ; 
              setFileList( bookEntries ) ; 
              console.log("bookEntries" ,bookEntries )
              setOriginalFile( bookEntries )  ;
              if( userName !== null ) setBlack( false )  ;
               
               setSpinner( false ) ; 

              setBookRecentlyViewed( setFrequentBooks()) ; 

              console.log( "  1111111111book reecntly viewed are her e..." , bookRecentlyViewed ) ; 
              console.log( " 22222222222book reecntly viewed are her e..." , setFrequentBooks() ) ; 


              // setBook
          } catch (error) {
              console.log( " errro occured ")
              console.error(error);
              setBlack( false )  ; 
              setSpinner( false ) ;
          }
      }

      
       fetchDataFromIndexedDB() ;
       showCalendarDetails() ; 
          
          
        }, []);

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
            <div id="heading">
              <div id="topBar" >
                <img src={openBook} />
                


                <label>My Book Shelf</label>
              </div>
                
                <div id="search" >
                    <input id="searchInput" placeholder="Search"
                    onChange={  (e)=>{  searchFilter(e.target.value ) ;  }} />
                    <i id="font" className='bx bx-search-alt-2'></i> 
    
                </div>
            </div>
           
        

            <div id="threeBooks" >
             
              {console.log("!(!bookRecentlyViewed[1] || bookRecentlyViewed[1] ===-1|| originalFile.length===0) " , 
              bookRecentlyViewed )}
            {
              !(!bookRecentlyViewed[1] || bookRecentlyViewed[1] ===-1|| originalFile.length===0) 
              && 

              <div className="frequent" id="frequentBook1">
                {/* <img src={getImageLink(bookRecentlyViewed[1])} /> */}
                { (!bookRecentlyViewed[1] || bookRecentlyViewed[1] ===-1|| originalFile.length===0)?
                <img src={bookImageSubstitue}  className='recentViewCanvas'/> :   
                
                  <Link to= {getBookPath(bookRecentlyViewed[1])}  className='recentViewCanvas'  >
                  
                  <FrequentCanvasComponent  bookID={bookRecentlyViewed[1]}  
                bookImageSubstitue={bookImageSubstitue} 
                bookClass={"recentCanvas"} bookRecentlyViewed={bookRecentlyViewed}
                />
                  </Link>
                
                
                }
                
                <div className="descriptionBook" >
                  <label className="getBookName">
                  { getBookName(bookRecentlyViewed[1])}
                    {/* { "ssssssss dddddddd eeeeeeeeeee ww wwwwwwww ssss ddddddddddd fffff ffffff "} */}
                  

                  </label>
                  <label className="getBookAuthor">
                    { getBookAuthor(bookRecentlyViewed[1])}
                    {/* { "ssssssss dddddddd eeeeeeeeeee ww wwwwwwww ssss ddddddddddd fffff ffffff "} */}
                  


                  </label>

                    {/* <button></button> */}
                    
                    {/* <button>{ getBookCategory(bookRecentlyViewed[1])[0]  }</button>  */}
                    { console.log( " the categiro of bookViewed1" , getBookCategory(bookRecentlyViewed[1]) )}
                  { 
                    ( getBookCategory(bookRecentlyViewed[1])  && getBookCategory(bookRecentlyViewed[1])  !== "" && getBookCategory(bookRecentlyViewed[1]).length !== 0   )  && 
                  
                  <button className='getBookCategory'>{ getBookCategory(bookRecentlyViewed[1])}</button>
                  
                  }
                  
                  <div className="progress">
                    <div className='progress1' style={{width:`${getPercentageCompleted(  bookRecentlyViewed[1]    )}%`}}></div>
                    <div className='progress2'></div>
                    <label>{`${getPercentageCompleted(  bookRecentlyViewed[1] )}%`}</label>
                  </div>
                  <div className="options">
                    <Link to ={getBookPath(bookRecentlyViewed[1])} >
                        <button>Read</button>
                    </Link>
                    
                    
                    {/* {getFirstPage(  bookRecentlyViewed[1] )} */}
                    <Trash2   className="trash"   onClick={ ()=>{
                      setDeleteBookID( bookRecentlyViewed[1]) ; 
                      setDeleteName( getBookName(bookRecentlyViewed[1]) );
                      // alert( ele.id) ; 
                      // setBlack( true ); 
                    }}/>
                    {/* <img src={dustbins}
                    onClick={ ()=>{
                      setDeleteBookID( bookRecentlyViewed[1]) ; 
                      setDeleteName( getBookName(bookRecentlyViewed[1]) );
                      // alert( ele.id) ; 
                      // setBlack( true ); 
                    }}
                    /> */}
                  </div>
                </div>
              </div>
              
            }


              {
              
                !(!bookRecentlyViewed[2] || bookRecentlyViewed[2] ===-1|| originalFile.length===0) 
                && 
                <div className="frequent" id="frequentBook2">
                    {/* <img src={getImageLink(bookRecentlyViewed[1])} /> */}
                    { (!bookRecentlyViewed[2] || bookRecentlyViewed[2] ===-1|| originalFile.length===0)?
                    <img src={bookImageSubstitue}  className='recentViewCanvas'/> :   
                    
                      <Link to= {getBookPath(bookRecentlyViewed[2])}  className='recentViewCanvas'  >
                      
                      <FrequentCanvasComponent  bookID={bookRecentlyViewed[2]}  
                    bookImageSubstitue={bookImageSubstitue} 
                    bookClass={"recentCanvas"} bookRecentlyViewed={bookRecentlyViewed}
                    />
                      </Link>
                    
                    
                    
                    
                    }
                    
                    <div className="descriptionBook" >
                      <label className="getBookName">
                      { getBookName(bookRecentlyViewed[2])}
                      {/* { "ssssssss dddddddd eeeeeeeeeee ww wwwwwwww ssss ddddddddddd fffff ffffff "} */}
                      

                      </label>
                      <label className="getBookAuthor">
                      { getBookAuthor(bookRecentlyViewed[2])}
                      {/* { "ssssssss dddddddd eeeeeeeeeee ww wwwwwwww ssss ddddddddddd fffff ffffff "} */}
                    


                      </label>

                      {/* <button></button> */}
                      
                      {/* <button>{ getBookCategory(bookRecentlyViewed[1])[0]  }</button>  */}
                      {/* <button className='getBookCategory'>{ getBookCategory(bookRecentlyViewed[2])[0]}</button> */}
                      { 
                      
                      ( getBookCategory(bookRecentlyViewed[2])  && getBookCategory(bookRecentlyViewed[2])  !== "" && getBookCategory(bookRecentlyViewed[2]).length !== 0   ) 
                      
                      
                      && 
                      
                      <button className='getBookCategory'>{ getBookCategory(bookRecentlyViewed[2])}</button>
                      
                      }
                      <div className="progress">
                        <div className='progress1' style={{width:`${getPercentageCompleted(  bookRecentlyViewed[2]    )}%`}}></div>
                        <div className='progress2'></div>
                        <label>{`${getPercentageCompleted(  bookRecentlyViewed[2] )}%`}</label>
                      </div>
                      <div className="options">
                        <Link to ={getBookPath(bookRecentlyViewed[2])} >
                            <button>Read</button>
                        </Link>
                        
                        
                        {/* {getFirstPage(  bookRecentlyViewed[1] )} */}
                      <Trash2   className="trash"   onClick={ ()=>{
                          setDeleteBookID( bookRecentlyViewed[2]) ; 
                          setDeleteName( getBookName(bookRecentlyViewed[2]) );
                          // alert( ele.id) ; 
                          // setBlack( true ); 
                        }}/>
                        {/* <img src={dustbins}
                        onClick={ ()=>{
                          setDeleteBookID( bookRecentlyViewed[1]) ; 
                          setDeleteName( getBookName(bookRecentlyViewed[1]) );
                          // alert( ele.id) ; 
                          // setBlack( true ); 
                        }}
                        /> */}
                      </div>
                    </div>
                </div>
               
              }


              {
                !(!bookRecentlyViewed[3] || bookRecentlyViewed[3] ===-1|| originalFile.length===0) 
                && 
                <div className="frequent" id="frequentBook3" >
                {/* <img src={getImageLink(bookRecentlyViewed[1])} /> */}
                { (!bookRecentlyViewed[3] || bookRecentlyViewed[3] ===-1|| originalFile.length===0)?
                <img src={bookImageSubstitue}  className='recentViewCanvas'/> :   
                
                  <Link to= {getBookPath(bookRecentlyViewed[3])}  className='recentViewCanvas'  >
                  
                  <FrequentCanvasComponent  bookID={bookRecentlyViewed[3]}  
                bookImageSubstitue={bookImageSubstitue} 
                bookClass={"recentCanvas"} 
                bookRecentlyViewed={bookRecentlyViewed}
                />
                  </Link>
                
                
                }
                
                <div className="descriptionBook" >
                  <label className="getBookName">
                  { getBookName(bookRecentlyViewed[3])}
                    {/* { "ssssssss dddddddd eeeeeeeeeee ww wwwwwwww ssss ddddddddddd fffff ffffff "} */}
                  

                  </label>
                  <label className="getBookAuthor">
                    { getBookAuthor(bookRecentlyViewed[3])}
                    {/* { "ssssssss dddddddd eeeeeeeeeee ww wwwwwwww ssss ddddddddddd fffff ffffff "} */}
                  


                  </label>

                    {/* <button></button> */}
                    
                    {/* <button>{ getBookCategory(bookRecentlyViewed[1])[0]  }</button>  */}
                    { 
                    
                    
                    ( getBookCategory(bookRecentlyViewed[3])  && getBookCategory(bookRecentlyViewed[3])  !== "" && getBookCategory(bookRecentlyViewed[3]).length !== 0   ) 
                    
                    && 
                  
                  <button className='getBookCategory'>{ getBookCategory(bookRecentlyViewed[3])}</button>
                  
                  }
                    {/* <button className='getBookCategory'>{ getBookCategory(bookRecentlyViewed[3])[0]}</button> */}
                  
                  <div className="progress">
                    <div className='progress1' style={{width:`${getPercentageCompleted(  bookRecentlyViewed[3]    )}%`}}></div>
                    <div className='progress2'></div>


                    <label>{`${getPercentageCompleted(  bookRecentlyViewed[3] )}%`}</label>
                  </div>
                  <div className="options">
                    <Link to ={getBookPath(bookRecentlyViewed[3])} >
                        <button>Read</button>
                    </Link>
                    
                    
                    {/* {getFirstPage(  bookRecentlyViewed[1] )} */}
                    <Trash2   className="trash"   onClick={ ()=>{
                      setDeleteBookID( bookRecentlyViewed[3]) ; 
                      setDeleteName( getBookName(bookRecentlyViewed[3]) );
                      // alert( ele.id) ; 
                      // setBlack( true ); 
                    }}/>
                    {/* <img src={dustbins}
                    onClick={ ()=>{
                      setDeleteBookID( bookRecentlyViewed[1]) ; 
                      setDeleteName( getBookName(bookRecentlyViewed[1]) );
                      // alert( ele.id) ; 
                      // setBlack( true ); 
                    }}
                    /> */}
                  </div>
                </div>
                </div>
              
              }
             
               
             {
( (!bookRecentlyViewed[1] || bookRecentlyViewed[1] ===-1|| originalFile.length===0) 
||  (!bookRecentlyViewed[2] || bookRecentlyViewed[2] ===-1|| originalFile.length===0) 
|| (!bookRecentlyViewed[3] || bookRecentlyViewed[3] ===-1|| originalFile.length===0) 

)
&&
<div className="frequent uploadBooks first-step" id="frequentBook1">
  <div id="frequentBook1Div">
  <img id="uploadBookImage" src={uploadBookImage} onClick={()=>{setUploadNewBook(false);setUploadNewBook(true)}} />
  <img  id="plusUpload" src={plusUpload} onClick={()=>{setUploadNewBook(false);setUploadNewBook(true)}} />
  <p id="uploadP"onClick={()=>{setUploadNewBook(false);setUploadNewBook(true)}} >UPLOAD</p>
  <p id="bookP" onClick={()=>{setUploadNewBook(false);setUploadNewBook(true)}}>BOOK</p>
  </div>
    </div>


 }
              
            

               
                
            </div>

           
          
           
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
                            
                            <div className="progressBookDiv">
                            <div className='progress1Div' style={{width:`${getPercentageCompleted( ele.id  )}%`}}></div>
                            <div className='progress2Div'></div>
                            <label>{`${getPercentageCompleted( ele.id  )}%`}</label>
                            </div>
                            
                          </div>
                          {/* </div> */}
                          <div id="content">
                          
                          
                                <div className="bookoptions"  >
                                
                                  
                                  <Link   className="FileLink" to={`/file/showfile?bookID=${ele.id}`} >
                                  <button>Read</button>
                                  
                                  </Link>
                                 
                                
                                  
                                 
                                  {/* <img src={dustbins} onClick={ ()=>{
                                    setDeleteBookID( ele.id) ; 
                                    setDeleteName( ele.bookName );
                                    // alert( ele.id) ; 
                                    // setBlack( true ); 
                                  }} /> */}

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
             setBlack={setBlack}
              setDeletInd={setDeletInd}  deleteFile={deleteFile}
              deletePath={ deletePath} setDeletePath={setDeletePath}  deleteBookID={deleteBookID} 
              setDeleteBookID = {setDeleteBookID} deleteName={deleteName} setDeleteName={setDeleteName}
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