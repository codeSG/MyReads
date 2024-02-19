import React , {useEffect , useRef, useState,useContext}from 'react'

import {storage , auth } from "../firebase" ; 
import {ref, uploadBytes , listAll, getDownloadURL, deleteObject, 
    updateMetadata } from "firebase/storage" ; 
import {v4} from "uuid" ; 
import { ContextInfo } from '../../App';

import "../../style/BetterFile.css"
const AddNewFilePopup = ( { setUploadBook, setBlack,
    fileUpload, setFileUpload, setSpinner,
    hashID, setHashID  }) => {
        const {fileList, setFileList, originalFile, setOriginalFile,
            dataBaseCreated,
            setDataBaseCreated,
            request,
            setRequest
          } = useContext(ContextInfo)
        const [metaDataTitle, setMetaDataTitle] = useState("")  ; 
        const [metaDataDescription , setMetaDataDescription] = useState("") ;

        const getFileFromInput = ()=>{



            return new Promise((resolve, reject) => {
                // const file = document.getElementById('file').files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    // document.getElementById('file').value = '';
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

            // setFileList(prev=>[...prev , uploadedBookObj])  ;
            // setOriginalFile( prev=>[...prev ,uploadedBookObj] ) ; 

            setBlack( true ) ;
            setSpinner( true ) ; 
            
            const indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB ||
            window.shimIndexedDB;

            if (!indexedDB) {
                setDataBaseCreated(false);
                console.log("IndexedDB could not be found in this browser.");
                return;
              }
          
              const req = indexedDB.open("BooksDatabase", 1);
          
              req.onerror = function(event) {
                setDataBaseCreated(false);
                console.log("Database error: " + event.target.errorCode);
              };
          
              req.onupgradeneeded = function (event) {
                const db = event.target.result;
                const store = db.createObjectStore("booksinformation", { keyPath: 'id', autoIncrement: true });
                store.createIndex("bookName", "bookName", { unique: false });
                console.log("Database upgrade needed");
            };

              req.onsuccess = async  function() {

                const file = await getFileFromInput();

                console.log( " the upoaded file " , file )

                const fileObject = { "bookName":uploadedBookObj.bookName , ...file}
                console.log( " the upoaded fileObject " , fileObject )
              
                const db = req.result;
                
                const storeName = "booksinformation" ; 

                const store = db.transaction("booksinformation", 'readwrite').objectStore("booksinformation");

	        store.put( {...fileObject}  );

            store.transaction.oncomplete = () => {
                console.log(  " all things are uploaded ") ;
                setFileList(prev=>[...prev , {...fileObject}])  ;
                setOriginalFile( prev=>[...prev ,{...fileObject}] ) ; 
                setBlack( false ) ; 
                setSpinner( false  ) ;  
                 setFileUpload( null ) ; 
            };
                

                };

             


        }



        const uploadRef = useRef( null ) ; 
        function setUpload(){
            // alert("got clicked ")
           
            uploadRef.current.click() ; 
            // const upload = document.querySelector("#upload") ; 
            // const fileInput = document.querySelector("#fileInput") ; 
            // upload.addEventListener( 'click' , ()=>{
            //     fileInput.click() ;
            // })
            // fileInput.addEventListener( 'change' , ()=>{
            //     console.log(fileInput.files[0])  ; 
            // })
        }
        const uploadFile = async (  )=>{
            // setFileUpload(uf  );

            try{
                console.log("111111111111111 in the Header ");
                console.log( fileUpload) ;
                if( fileUpload === null ) return ; 
                setUploadBook( false ) ;
                console.log("2222222222222222 fileuplaod is not null ");
                // alert(fileUpload.name)
                // const fileRef = ref( storage , `${hashID}/${fileUpload.name}-${v4()}`) ;
                // const fileReff = ref( storage , `${hashID}/web_prac6.pdf-24c9204b-3e61-437d-b56f-fc025f9eb53b`) ;
                // const snapshot = await uploadBytes( fileRef , fileUpload ) ; 
                // const url =  await getDownloadURL( snapshot.ref) ; 
                // const aaa = [] ;
                // const newMetadata = {
                   
                //       "title": "Name1" ,
                //       "description" : "Description1" , 
                //       "currentPage": 1 , 
                //       "totalPage" : -1 ,
                //       "genre" : "genre1"
                    
                //   } ;
                 
                //   console.log(  " new MetaData " , newMetadata )  ; 
                // const metaData = await updateMetadata(fileRef, newMetadata) ; 
                // const des =  metaData.customMetadata.description ; 
                // const ttl = metaData.customMetadata.title ; 
                // const cP = metaData.customMetadata.currentPage ; 
                // const tP = metaData.customMetadata.totalPage
                // const bookName = fileUpload.name ; 
                // console.log( " METADATA" , metaData ) ;
                const uploadedBookObj = {  currentPage : 1 , totalPage : -1   } ; 
                const bookInforMation = await fetch("https://www.googleapis.com/books/v1/volumes?q="+fileUpload.name) ; 
                console.log("bookInforMation",bookInforMation);
                const bookInforMationJson = await bookInforMation.json() ; 
                console.log("bookInforMationJson",bookInforMationJson);
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
                   
                    if( cnt === 4 ) break ; 

                }
                uploadedBookObj.bookName = fileUpload.name ; 
                console.log( "uploadedBookObj.bookAuthor", uploadedBookObj.bookAuthor, uploadedBookObj.bookGenre, uploadedBookObj.bookImageLink );
                storeFileInIndexedDB( uploadedBookObj )

        
               
                    // alert( "file uploaded successsfully ") ;

                    // setSpinner(false) ; 
                    // setBlack( false  )  ; 
                   
                   
    
                    // fileRef.put(file, newMetadata);
        
            }               
            catch( err ){
                console.error( err ) ; 
                    alert( "  error ocurred try again later ") ;
                    setSpinner(false) ; 
                    setBlack( false  )  ;  
                   
            }
          
           
        } 
        useEffect(()=>{
            console.log( "fileUpload", fileUpload );
            // console.log( fileUpload ) ; 
            uploadFile() ; 
        }, 
        [fileUpload]);


  return (       
                <div id="addBook">
                     <p>YOUR LIBRARY</p>
                    <button id="done" 
                    onClick={()=>{
                       
                            // setUploadBook( true ) ; 
                            // setBlack( true ) ; 
                            setUpload();
                        }}
                    
                     >
                    {"+ ADD BOOK"}
                    <input onChange={(e)=>{   
                        //   setSpinner(true) ; 
                     e.preventDefault() ;  setFileUpload(e.target.files[0]) ;
        }} style={{display : "none"}} ref={uploadRef} type="file" />
                    </button>
                    
                    
                          </div>
       
    
   
  )
}

export default AddNewFilePopup