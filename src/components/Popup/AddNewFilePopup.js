import React , {useEffect , useRef, useState,useContext}from 'react'
import { ContextInfo } from '../../App.js';
import bookImageSubstitue from "../../assets/bookImageSubstitue.jpg"
import "../../css/AddNewFilePopup.css"
import { ToastContainer, toast } from 'react-toastify';
import library from "../../assets/library.png" ; 
import 'react-toastify/dist/ReactToastify.css';
 import {ChevronRight , ChevronLeft  } from "lucide-react" ; 
 import {readBook} from "../../utils/updateBookRecentlyViewed.js"
const AddNewFilePopup = ( { setUploadBook, setBlack, fileUpload, setFileUpload, setSpinner,
    hashID, setHashID   , uploadNewBook ,  setUploadNewBook}) => {
        const {fileList, setFileList, originalFile, setOriginalFile,
            dataBaseCreated,
            setDataBaseCreated,
            request,
            setRequest, firebaseFileFetched, setFirebaseFileFetched , 
            bookRecentlyViewed, setBookRecentlyViewed
          } = useContext(ContextInfo)
        const [ bookCategoryTag , setBookCategoryTag] = useState([]) ; 
        const [activebookCategoryInd , setactivebookCategoryInd] = useState(0) ; 
        const [startingIndex , setStartingIndex ] = useState(0) ; 

        function categoryFilter(category){

            if( !category || category === 'All' ){
                setFileList( originalFile ) ; 
                return;
            }
            const arr = originalFile.filter( ele => {
                let got = false; 
                    if (ele.bookGenre.toLowerCase().includes(category.toLowerCase())) {
                        got = true; 
                    }
                return got; 
            });
            setFileList( () => arr ) ;
            
        }
        

        const getFileFromInput = ()=>{

            if( !firebaseFileFetched ){
                return new Promise((resolve, reject) => {
                const url = "https://firebasestorage.googleapis.com/v0/b/uploadingfile-b50cc.appspot.com/o/The-Jungle-Books-text.pdf?alt=media&token=c129e8b6-6e88-402a-b119-dbb092898277"
                fetch(url)
                .then(async (response) => {
                    const data = await response.arrayBuffer();
                    const contentType = response.headers.get('content-type');
                    const size = data.byteLength;
                    resolve({
                        type: contentType,
                        size: size,
                        data: data,
                    });

                })
                .catch((error) => {
                    reject(error);
                });

            }) 
                
            }
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve({
                        type: fileUpload.type,
                        size: fileUpload.size,
                        data: event.target.result,
                    });

                    
                };
                reader.onerror = (event) => {
                    reject(event.target.error);
                };
                reader.readAsArrayBuffer(fileUpload);
            });

        }


        const storeFileInIndexedDB = (uploadedBookObj)=>{
            const indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB ||
            window.shimIndexedDB;

            if (!indexedDB) {
                setDataBaseCreated(false);
                return;
              }
          
              const req = indexedDB.open("BooksDatabase", 1);
          
              req.onerror = function(event) {
                setDataBaseCreated(false);
                  setSpinner(false) ; 
                    setBlack( false  )  ; 
                    alert("Some Error Ocuured !! Try Again Later ")
              };
          
              req.onupgradeneeded = function (event) {
                const db = event.target.result;
                const store = db.createObjectStore("booksinformation", { keyPath: 'id', autoIncrement: true });
                store.createIndex("bookName", "bookName", { unique: false });
            };

              req.onsuccess = async  function() {

                const file = await getFileFromInput();
                const fileObject = { ...uploadedBookObj,  ...file}              
                const db = req.result;
                const storeName = "booksinformation" ; 

                const store = db.transaction("booksinformation", 'readwrite').objectStore("booksinformation");

                const putRequest = store.put(fileObject); 
                putRequest.onsuccess = function (event) {
                    const keyID = event.target.result;
                    const objectUploaded = {...fileObject} ; 
                    objectUploaded.id  = keyID ;
                   
                    const originalFileCategory = originalFile ; 
                     setFileList(prev=>[...prev , {...objectUploaded}])  ;
                setOriginalFile( prev=>[...prev ,{...objectUploaded}] ) ;
                if( firebaseFileFetched){
                    setBlack( false ) ; 
                    setSpinner( false  ) ;  
                     setFileUpload( null ) ;
                     setUploadNewBook( false ) ; 
                }else{
                    setBookRecentlyViewed(readBook(keyID));
                    setFirebaseFileFetched( true  ) ; 

                    localStorage.setItem("firebaseFileFetched" , true ) ;  

                }

                };

	      

                };

        }

        useEffect(()=>{
            if( firebaseFileFetched ) return ; 
            async function fetchTheFile(){
            const uploadedBookObj = {  currentPage : 1 , totalPage : 0 , notes : []    } ; 
            const fileUploadName = "The-Jungle-Books-text" ; 
                const bookInforMation = await fetch("https://www.googleapis.com/books/v1/volumes?q="+fileUploadName) ; 
                const bookInforMationJson = await bookInforMation.json() ; 
                let cnt = 0 ;
                for( let entry of bookInforMationJson.items){
                    if( entry.volumeInfo?.authors ){
                        uploadedBookObj.bookAuthor  = entry.volumeInfo.authors[0] ;
                        cnt++;
                    }
                    if( entry.volumeInfo?.categories ){
                        uploadedBookObj.bookGenre  = entry.volumeInfo.categories[0] ;
                        cnt++;
                    }
                    if( entry.volumeInfo?.imageLinks?.thumbnail ){
                        uploadedBookObj.bookImageLink  =  entry.volumeInfo.imageLinks.thumbnail ;
                        cnt++;
                    }
                   
                    if( cnt === 3 ) break ; 

                }

                if( !uploadedBookObj.bookAuthor){
                    uploadedBookObj.Author = "Anonyomus"  ; 
                   }
                   
                   if( !uploadedBookObj.bookGenre){
                    uploadedBookObj.bookGenre = "Anoyomus"  ; 
                   }
                   
                   if( !uploadedBookObj.bookImageLink){
                    uploadedBookObj.bookImageLink = bookImageSubstitue  ; 
                   }
      

                uploadedBookObj.bookName = fileUploadName ;   
            storeFileInIndexedDB( uploadedBookObj ) ; 
                }
            fetchTheFile() ; 

        } , [firebaseFileFetched])

        useEffect(()=>{
            if( !uploadNewBook ) return ; 
                setUpload()  ; 
        } , [uploadNewBook])
        const uploadRef = useRef( null ) ; 
        function setUpload(){
            uploadRef.current.click() ; 
           
        }
        const uploadFile = async (  )=>{
            
            try{
                
                if( fileUpload === null ) return ; 
                if( fileUpload.type !== "application/pdf" || !fileUpload.type ){
                    toast.error("Only PDF files allowed !!") ; 
                  
                    
                    setFileUpload( null ) ; 
                    setUploadNewBook( false ) ; 
                    return ; 
    
                }
                if( originalFile.length === 15  ){
                    console.log("only pdf files ae allowed ") ; 
                    toast.error("Only 15 books allowed !!") ; 
                    setFileUpload( null ) ; 
                    setUploadNewBook( false ) ; ; 
                    return ; 
    
                }
                setUploadBook( false ) ;
                
                  setSpinner(true) ; 
                setBlack( true  )  ; 
                const uploadedBookObj = {  currentPage : 1 , totalPage : 0 , notes : []    } ; 
                const bookInforMation = await fetch("https://www.googleapis.com/books/v1/volumes?q="+fileUpload.name) ; 
                const bookInforMationJson = await bookInforMation.json() ; 
                let cnt = 0 ;
                for( let entry of bookInforMationJson.items){
                    if( entry.volumeInfo?.authors ){
                        uploadedBookObj.bookAuthor  = entry.volumeInfo.authors[0] ;
                        cnt++;
                    }
                    if( entry.volumeInfo?.categories ){
                        uploadedBookObj.bookGenre  = entry.volumeInfo.categories[0] ;
                        cnt++;
                    }
                    if( entry.volumeInfo?.imageLinks?.thumbnail ){
                        uploadedBookObj.bookImageLink  =  entry.volumeInfo.imageLinks.thumbnail ;
                        cnt++;
                    }
                   
                    if( cnt === 3 ) break ; 

                }

                if( !uploadedBookObj.bookAuthor){
                    uploadedBookObj.Author = "Anonyomus"  ; 
                   }
                   
                   if( !uploadedBookObj.bookGenre){
                    uploadedBookObj.bookGenre = "Anoyomus"  ; 
                   }
                   
                   if( !uploadedBookObj.bookImageLink){
                    uploadedBookObj.bookImageLink = bookImageSubstitue  ; 
                   }
      
                uploadedBookObj.bookName = fileUpload.name ; 
                
                storeFileInIndexedDB( uploadedBookObj ) ; 
                
            }               
            catch( err ){
                console.error( err ) ; 
                    alert( "  error ocurred try again later ") ;
                    setSpinner(false) ; 
                    setBlack( false  )  ;  
                   
            }
          
           
        } 
        useEffect(()=>{
            uploadFile() ; 
        }, 
        [fileUpload]);

        function updateFileTags( originalFileCategory){
            if( !originalFileCategory ) return  ; 
            const bookObj =  originalFileCategory.reduce( ( acc , ele )=>{
                const categoryArr = ele.bookGenre ; 
                if( !categoryArr ) return acc ; 
                const category = categoryArr ; 
                if( !acc[category]){
                    acc[category] = 1 ; 
                }else {
                    acc[category] = acc[category]  +  1; 
                }
               
                return acc ; 
            } , {} ); 
            const bookArr = Object.keys(bookObj) ;  
            bookArr.sort((a, b) => bookObj[b] - bookObj[a]); // Corrected sorting function
            bookArr.unshift("All" ) ; 
            setBookCategoryTag( (prev)=> bookArr);

        }

        useEffect( ()=>{

            updateFileTags(originalFile) ; 
           
        } , [originalFile ])

  return (       
                <div id="addBook">

                 <div id="uploading">
                    <div id="uploadingLeft">

                        <img src={library} />
                        <label>Library</label>

                    </div>
                    <div className="categoryOptions fourth-step">
                       {startingIndex !== 0 && 
                        <ChevronLeft  className='leftArrow'  onClick={()=> setStartingIndex(prev => prev-1)}/>
                       } 

                          {bookCategoryTag.map((ele, ind) => {
                            return (
                                (ind < startingIndex  || ind >= startingIndex+4 )? (
                                    <div key={-ind-1}></div>
                                ) : (
                                    <div
                                        key={ind}
                                        style={{ background: ind === activebookCategoryInd ? "rgba(145, 83, 206, 0.56)" : "" }}
                                        className="categoryDiv"
                                        onClick={() => {
                                            categoryFilter(bookCategoryTag[ind]);
                                            setactivebookCategoryInd(ind);
                                        }}
                                    >
                                        <p>{bookCategoryTag[ind]}</p>
                                    </div>
                                )
                            );
                        })}
                        {
                            (startingIndex + 3  < bookCategoryTag.length -1  ) &&

                             <ChevronRight  className='rightArrow' onClick={()=>setStartingIndex(prev => prev+1)}/>
                        }
                        
                    </div>
                    <button id="done" 
                    onClick={()=>{
                            setUpload();
                        }}
                    
                     >
                    {"+ Add Books"}
                    <input onChange={(e)=>{    
                     e.preventDefault() ;  
                     setFileUpload(e.target.files[0]) ;
        }} style={{display : "none"}} ref={uploadRef} type="file" />
                    </button>
                 </div>
                    
                </div>
   
  )
}

export default AddNewFilePopup ; 