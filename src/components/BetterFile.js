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

import {ContextInfo}  from "../App"
import openBook from "../image/openBook.png"

import dustbins from "../image/dustbins.png"
import bookImageSubstitue from "../image/bookImageSubstitue.jpg"
// import React from 'react'
import "../style/BetterFile.css"
// import 'boxicons';
import LeftUI from './LeftUI';
import { setFrequentBooks } from '../utils/updateBookRecentlyViewed';




const BetterFile = ({fileUpload, setFileUpload,spinner,fileName, setFileName , 
  setSpinner}) => {
   

   
    const {fileList, setFileList, originalFile, setOriginalFile, calendarEntry,setCalendarEntry, 
      hashID , setHashID, 
      dataBaseCreated,
      setDataBaseCreated,
      request,
      setRequest, 
      bookRecentlyViewed, setBookRecentlyViewed
    } = useContext(ContextInfo) ;
    
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
    function getBookName(bookID){
      if( !bookID || bookID === -1 ) return "" ; 

      let arr = originalFile.filter( ele => ele.id === bookID ) ; 
      if( arr.length === 0 ) return ""
      return arr[0].bookName ;
    }
    function getBookPath(bookID){
      // alert(bookID )
      if( !bookID || bookID === -1 ) return "/" ; 
      // if( arr.length === 0 ) return ""

      return `/file/showfile?bookID=${bookID}` ; 


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
      const [ deleteBookID , setDeleteBookID ] = useState(-1)
      const listRef = ref( storage , `${tt}/`) ;
      console.log( "git list ref " , listRef) ;   
      async function deleteFile(path) {
          try {
        
            const desertRef = ref(storage, path);
        
           
            await deleteObject(desertRef);
            alert("The File got deleted Successdully !!");
        
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
          

        async function fetchDataFromIndexedDB() {
          try {
              const database = await openDatabase('BooksDatabase' , "booksinformation");
              const data = await readAllData(database, 'booksinformation');
              console.log( " all the data from the daatabse " , data )  ; 
              let bookEntries = new Array(data.length ) ; 
            console.log( bookEntries[0]) ; 
              for( let ind in  data ){
                  const ele = data[ind] ; 
                const bookName = ele.bookName ; 

                const bookInforMation = await fetch("https://www.googleapis.com/books/v1/volumes?q="+bookName) ; 
             console.log("bookInforMation",bookInforMation);
             const bookInforMationJson = await bookInforMation.json() ; 
             console.log("bookInforMationJson",bookInforMationJson);
             let cnt = 0 ;
             const bookObj = { ...ele } ; 
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
                  bookObj.bookImageLink  =  bookentry.volumeInfo.imageLinks.thumbnail ;
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
             
             if( !bookObj.bookImageLink){
              bookObj.bookImageLink = bookImageSubstitue  ; 
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
              setBlack( false )  ; 
              setSpinner( false ) ; 

              setBookRecentlyViewed( setFrequentBooks()) ; 

              // setBook
          } catch (error) {
              console.log( " errro occured ")
              console.error(error);
              setBlack( false )  ; 
              setSpinner( false ) ;
          }
      }

      
       fetchDataFromIndexedDB() ;

          // async function fun(){
  
          //   try {
          //     const res = await listAll(listRef);
          //     let ans = new Array(res.items.length );
          
          //     for (let ind = 0; ind < res.items.length; ind++) {
          //       const item = res.items[ind];
          //       console.log("------" ,  item );
          //       const bookName = item.name.split(".pdf")[0]
          //       // alert(item.name.split(".pdf")[0] );
          //       console.log(item._location.path_);
          
          //       const url = await getDownloadURL(item);

          
          //       const temp = "" + ind;
          //       console.log("the temp is ", temp);
          //       urlHelper(temp, url, 1);
          //       if( ind === 0 ){
          //         console.log( "ind===0") ; 
          //         console.log( item.name  ) ; 
          //       }
          //       const ppp= item._location.path_ ; 
          //       const metaRef = ref(storage, ppp );
          //       const metaData= await  getMetadata(metaRef) ;
          //       const des =  metaData.customMetadata.description ; 
          //       const ttl = metaData.customMetadata.title ;
          //       const cP = Number(metaData.customMetadata.currentPage) ; 
          //       const tP = Number(metaData.customMetadata.totalPage);
          //       console.log( ind, "metadata" , des,ttl ) ; 

          //       ans[ind] = { "url": url, "path": item._location.path_ , 
          //     "name" : item.name , "description":des ,
          //    "title":ttl , "currentPage" : cP , "totalPage" : tP  } ;


          //    const bookInforMation = await fetch("https://www.googleapis.com/books/v1/volumes?q="+bookName) ; 
          //    console.log("bookInforMation",bookInforMation);
          //    const bookInforMationJson = await bookInforMation.json() ; 
          //    console.log("bookInforMationJson",bookInforMationJson);
          //    let cnt = 0 ;
          //    for( let bookentry of bookInforMationJson.items){
          //        if( bookentry.volumeInfo?.authors ){
          //         ans[ind].bookAuthor  = bookentry.volumeInfo.authors[0] ;
          //            cnt++;
          //        }
          //        if( bookentry.volumeInfo?.categories ){
          //         ans[ind].bookGenre  = bookentry.volumeInfo.categories[0] ;
          //            cnt++;
          //        }
          //        if( bookentry.volumeInfo?.imageLinks?.thumbnail ){
          //         ans[ind].bookImageLink  =  bookentry.volumeInfo.imageLinks.thumbnail ;
          //            cnt++;
          //        }
          //        if( bookentry.volumeInfo?.description ){
          //         ans[ind].bookDescription = bookentry.volumeInfo.description ;
          //         cnt++;
          //         }
          //        if( cnt === 4 ) break ; 

          //    }
          //    ans[ind].bookName = item.name.split(".pdf")[0] ; 




          //       console.log(fileList, "22222");
                
          //     }          
          //     console.log("3333333");
          //     console.log(ans);
          //     setFileList(ans);
          //     setOriginalFile( ans  ) ; 
          //     setSpinner(false) ; 
          //     setBlack(false);

          //     if( localStorage)
          //     if(window.localStorage.getItem('search')) {
          //       setSearch( window.localStorage.getItem('search') ) ; 
          //       const filterArr = ans.filter( ele =>{
          //         let aword = ele.title.toLowerCase() ; 
          //         let bword  = window.localStorage.getItem('search').toLowerCase() ; 
          //         return aword.includes( bword ) ;
          //       })
          //       console.log("useEffect" , filterArr,  window.localStorage.getItem('search') )
          //       setFileList( filterArr ) ; 
          //       // searchFilter( window.localStorage.getItem('search'))
          //     }
          //     console.log("fileList----", fileList);
          //   } catch (error) {
          //     alert( " Error ocurred in getMatadata ") ; 
          //     console.error("Error fetching data:", error);
          //     setBlack(false) ; 
          //     setSpinner( false ) ; 
              
          //   }
  
          // }
          // fun()
          // setSearch( )
          const temp = new Date() ; 
          const month = temp.getMonth() ; 
          const year = temp.getFullYear() ; 
          let numberOfDays = new Date(year, month+1, 0).getDate();
          let calendarArr = JSON.parse(localStorage.getItem("calendarArray") ); 
          if( calendarArr === null ){
            const pp = new Array(numberOfDays).fill(false) ; 
            localStorage.setItem("calendarArray" , JSON.stringify(pp)) ; 
            calendarArr = JSON.parse(localStorage.getItem("calendarArray") );
            console.log("localstorage" , calendarArr) ;
            setCalendarEntry( calendarArr )  ; 
            // alert("changsvakue 1");

          }else if( calendarArr.length !== numberOfDays ){
            const pp = new Array(numberOfDays).fill(false) ; 
            
            localStorage.setItem("calendarArray" , JSON.stringify(pp)) ; 
            calendarArr = JSON.parse(localStorage.getItem("calendarArray") );
            console.log("localstorage" , calendarArr) ;
            setCalendarEntry( calendarArr )  ; 
            // alert("changsvakue 2");
          }else if(calendarEntry.length===0){

            setCalendarEntry(calendarArr)
          }
         
          
        }, []);

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
      fileUpload={fileUpload} setFileUpload={setFileUpload}  setSpinner={setSpinner} hashID={hashID} setHashID={setHashID}             
      setUploadBook={setUploadBook} setBlack={setBlack}
      setDeletePath={setDeletePath}  deletePath={deletePath}
      />
      <div id="right">
            <div id="heading">
              <div id="topBar">
                <img src={openBook} />
                <label>My Reads</label>
              </div>
                
                <div id="search">
                    <input id="searchInput" placeholder="Search"
                    onChange={  (e)=>{  searchFilter(e.target.value ) ;  }} />
                    <i id="font" className='bx bx-search-alt-2'></i> 
    
                </div>
            </div>
           
            <div id="threeBooks" >
              
              
              <div className="frequent" id="frequentBook1">
                  <img src={getImageLink(bookRecentlyViewed[1])} />
                  <div className="descriptionBook" >
                    <label>
                     { getBookAuthor(bookRecentlyViewed[1])}

                    </label>
                    <div className="progress">
                      <div className='progress1'></div>
                      <div className='progress2'></div>
                      <legend>25%</legend>
                    </div>
                    <div className="options">
                      <Link to ={getBookPath(bookRecentlyViewed[1])} >
                          <button>Read</button>
                      </Link>
                      
                      <img src={dustbins}
                      onClick={ ()=>{
                        setDeleteBookID( bookRecentlyViewed[1]) ; 
                        setDeleteName( getBookName(bookRecentlyViewed[1]) );
                        // alert( ele.id) ; 
                        setBlack( true ); 
                      }}
                      ></img>
                    </div>
                  </div>
               </div>


               <div className="frequent" id="frequentBook2">
                  <img src={getImageLink(bookRecentlyViewed[2])} />
                  <div className="descriptionBook" >
                    <label>
                     { getBookAuthor(bookRecentlyViewed[2])}

                    </label>
                    <div className="progress">
                      <div className='progress1'></div>
                      <div className='progress2'></div>
                      <legend>25%</legend>
                    </div>
                    <div className="options">
                      <Link to ={getBookPath(bookRecentlyViewed[2])} onClick={ ()=>{  if( getBookPath(bookRecentlyViewed[2]) ) sessionStorage.setItem("bookKey" , bookRecentlyViewed[1]) }}>
                          <button>Read</button>
                      </Link>
                      
                      <img src={dustbins}   
                      onClick={ ()=>{
                        setDeleteBookID( bookRecentlyViewed[2]) ; 
                        setDeleteName(  getBookName(bookRecentlyViewed[1]) );
                        // alert( ele.id) ; 
                        setBlack( true ); 
                      }}
                      ></img>
                    </div>
                  </div>
               </div>



               <div className="frequent" id="frequentBook1">
                  <img src={getImageLink(bookRecentlyViewed[3])} />
                  <div className="descriptionBook" >
                    <label>
                     { getBookAuthor(bookRecentlyViewed[3])}

                    </label>
                    <div className="progress">
                      <div className='progress1'></div>
                      <div className='progress2'></div>
                      <legend>25%</legend>
                    </div>
                    <div className="options">
                      <Link to ={getBookPath(bookRecentlyViewed[3])} >
                          <button>Read</button>
                      </Link>
                      
                      <img src={dustbins}
                      
                      onClick={ ()=>{
                        setDeleteBookID( bookRecentlyViewed[3]) ; 
                        setDeleteName( getBookName(bookRecentlyViewed[3]) );
                        // alert( ele.id) ; 
                        setBlack( true ); 
                      }}
                      
                      ></img>
                    </div>
                  </div>
               </div>
               
               
              
            

               
                
            </div>
           
            <AddNewFilePopup setUploadBook={setUploadBook} setBlack={setBlack} 
            fileUpload={fileUpload} setFileUpload={setFileUpload}  setSpinner={setSpinner}
            hashID={hashID} setHashID={setHashID} />
          {/* <div id="addBook">
            <p>YOUR LIBRARY</p>
            <button>+ ADD BOOK</button>
          </div> */}
          <div id="book-container">
          {
            fileList.map( (ele, ind)=>
                    {

                      const key = "" + ind ; 
                          urlHelper( key, ele.url , 1 ) ; 
                      return(
                      
                        <div id="textBook">

                           <div id="image"> 
                             
                              <img style={{"width":"100%", "height":"100%"}} src={ele.bookImageLink}/>    
                          </div>
                          <div id="content">
                          <p className="title">{ele.bookName}</p>
                          
                                <div className="bookoptions"     >
                                
                                  
                                  <Link   className="FileLink" to={`/file/showfile?bookID=${ele.id}`} >
                                  <button>Read</button>
                                  
                                  </Link>
                                 
                                
                                  
                                  <img src={dustbins} onClick={ ()=>{
                                    setDeleteBookID( ele.id) ; 
                                    setDeleteName( ele.bookName );
                                    // alert( ele.id) ; 
                                    setBlack( true ); 
                                  }} />
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
            black && <div 
            style={{backgroundColor:"black", position:"fixed", 
            top:"0", left:"0", right:"0",bottom:"0",
            opacity:"0.6" , zIndex:"4" , width:"100%" , height:"100%"}}>

            </div>
          }
          {
            
            ( deleteBookID !== -1 ) && <DeletePopup  setBlack={setBlack}
              setDeletInd={setDeletInd}  deleteFile={deleteFile}
              deletePath={ deletePath} setDeletePath={setDeletePath}  deleteBookID={deleteBookID} 
              setDeleteBookID = {setDeleteBookID} deleteName={deleteName} setDeleteName={setDeleteName}
              
            />
            
          
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