import React, { useRef } from 'react'
import { useState , useEffect , useContext} from 'react' ; 
import {storage} from "./firebase" ; 
import {ref, uploadBytes , listAll, getDownloadURL, deleteObject, getMetadata} from "firebase/storage" ; 
import {v4} from "uuid" ; 
import { Link } from 'react-router-dom';
import urlHelper from '../utils/urlHelper';
import obj from '../utils/emailSet';
import FileCard from './FileCard';
import { useOutletContext } from 'react-router-dom';
import DeletePopup from './DeletePopup';
import Spinner from './Spinner';
import { useSearchParams } from 'react-router-dom';
import Calendar from "../components/features/Calendar"
// import { Link } from 'react-router-dom';
import AddNewFilePopup from './features/AddNewFilePopup';

import {ContextInfo}  from "../App"

// import React from 'react'
import "../style/BetterFile.css"
// import 'boxicons';
import LeftUI from './LeftUI';




const BetterFile = ({fileUpload, setFileUpload,spinner,fileName, setFileName , 
  setSpinner}) => {
   
    const {fileList, setFileList, originalFile, setOriginalFile, calendarEntry,setCalendarEntry, 
      hashID , setHashID} = useContext(ContextInfo) ;
    
    const [ hash , setHash] = useSearchParams()  ;
      
    const [search , setSearch] = useState("") ; 
      const tt =  hash.get("id") ;
      setHashID( tt ) ;
      const [black , setBlack] = useState( true ) ;  
      const [deleteName , setDeleteName ]  = useState("") ; 
      const [ deleteInd , setDeletInd ] = useState(-1) ; 
      const [uploadBook , setUploadBook] = useState( false  ); 
      const [deletePath  , setDeletePath] = useState(-1) ; 
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
        
           
   
  
    
      useEffect( () => {
        // alert(getEmail()) ; 
          
          async function fun(){
  
            try {
              const res = await listAll(listRef);
              let ans = new Array(res.items.length );
          
              for (let ind = 0; ind < res.items.length; ind++) {
                const item = res.items[ind];
                console.log("------" ,  item );
                const bookName = item.name.split(".pdf")[0]
                // alert(item.name.split(".pdf")[0] );
                console.log(item._location.path_);
          
                const url = await getDownloadURL(item);

          
                const temp = "" + ind;
                console.log("the temp is ", temp);
                urlHelper(temp, url, 1);
                if( ind === 0 ){
                  console.log( "ind===0") ; 
                  console.log( item.name  ) ; 
                }
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


             const bookInforMation = await fetch("https://www.googleapis.com/books/v1/volumes?q="+bookName) ; 
             console.log("bookInforMation",bookInforMation);
             const bookInforMationJson = await bookInforMation.json() ; 
             console.log("bookInforMationJson",bookInforMationJson);
             let cnt = 0 ;
             for( let bookentry of bookInforMationJson.items){
                 if( bookentry.volumeInfo.authors ){
                  ans[ind].bookAuthor  = bookentry.volumeInfo.authors[0] ;
                     cnt++;
                 }
                 if( bookentry.volumeInfo.categories ){
                  ans[ind].bookGenre  = bookentry.volumeInfo.categories[0] ;
                     cnt++;
                 }
                 if( bookentry.volumeInfo.imageLinks.thumbnail ){
                  ans[ind].bookImageLink  =  bookentry.volumeInfo.imageLinks.thumbnail ;
                     cnt++;
                 }
                 if( bookentry.volumeInfo.description ){
                  ans[ind].bookDescription = bookentry.volumeInfo.description ;
                  cnt++;
                  }
                 if( cnt === 4 ) break ; 

             }
             ans[ind].bookName = item.name.split(".pdf")[0] ; 




                console.log(fileList, "22222");
                
              }          
              console.log("3333333");
              console.log(ans);
              setFileList(ans);
              setOriginalFile( ans  ) ; 
              setSpinner(false) ; 
              setBlack(false);
              if(window.localStorage.getItem('search')) {
                setSearch( window.localStorage.getItem('search') ) ; 
                const filterArr = ans.filter( ele =>{
                  let aword = ele.title.toLowerCase() ; 
                  let bword  = window.localStorage.getItem('search').toLowerCase() ; 
                  return aword.includes( bword ) ;
                })
                console.log("useEffect" , filterArr,  window.localStorage.getItem('search') )
                setFileList( filterArr ) ; 
                // searchFilter( window.localStorage.getItem('search'))
              }
              console.log("fileList----", fileList);
            } catch (error) {
              alert( " Error ocurred in getMatadata ") ; 
              console.error("Error fetching data:", error);
            }
  
          }
          fun()
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
            alert("changsvakue 1");

          }else if( calendarArr.length !== numberOfDays ){
            const pp = new Array(numberOfDays).fill(false) ; 
            
            localStorage.setItem("calendarArray" , JSON.stringify(pp)) ; 
            calendarArr = JSON.parse(localStorage.getItem("calendarArray") );
            console.log("localstorage" , calendarArr) ;
            setCalendarEntry( calendarArr )  ; 
            alert("changsvakue 2");
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
                <p>Kindle</p>
                <div id="search">
                    <input id="searchInput" placeholder="Search"
                    onChange={  (e)=>{  searchFilter(e.target.value ) ;  }} />
                    <i id="font" class='bx bx-search-alt-2'></i> 
    
                </div>
            </div>
            <p id="bookLast">Books You Read Last</p>
            <div id="twoBooks">
              
                <div class="theBook">
                <img class="bookImage" src="https://books.google.com/books/content?id=t_E5zwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" alt="hi" />  
                    <div>
                        <p>Book Name</p>
                        <p>Author Name</p>

                    </div>
                   
                </div>
                <div class="theBook theSecond" >
                    <img className="bookImage" src="/bookCover.jpg" / >  
                    <div>
                        <p>Book Name</p>
                        <p>Author Name</p>

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
                          <Link   className="FileLink" to={`/file/showfile/?url=${ind}`} >
                              <p class="title">{ele.bookName}</p>
                              <p class="description">{ele.bookAuthor}</p>
                              <div>
                                  <button class="genre">{ele.bookGenre}</button>
                              </div>
                            </Link>
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
            
            ( deletePath !== -1 &&  deletePath !== 0 ) && <DeletePopup deleteName={deleteName} setBlack={setBlack}
              setDeletInd={setDeletInd}  deleteFile={deleteFile}
              deletePath={ deletePath} setDeletePath={setDeletePath}
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