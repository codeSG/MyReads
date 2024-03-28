import React , {useContext , useState , useEffect} from 'react'
import "../../css/DeletePopup.css";
import {ContextInfo} from "../../App.js";
import {deleteBook , setFrequentBooks} from "../../utils/updateBookRecentlyViewed.js"
import FrequentCanvasComponent from '../Canvas/FrequentCanvasComponent.js';
import DeleteCanvasComponent from "../Canvas/DeleteCanvasComponent.js" ; 
// import bookImageSubstitue from "../image/bookImageSubstitue.jpg"
import bookImageSubstitue from '../../assets/bookImageSubstitue.jpg'
const DeletePopup = ({  setOriginalFile , setFileList , originalFile , fileList  , uploadBook  ,  setDeleteName, setBlack, deletePath,setDeletePath , deleteBookID,setDeleteBookID , 
}) => {

  useEffect(()=>{
     setDeleteBookID( prev => prev +1 ) ; 
     setDeleteBookID( prev => prev -1 ) ; 
  } , [] )
  const {setBookRecentlyViewed,   bookRecentlyViewed } = useContext(ContextInfo) ; 
  async function deleteFileFromIndexedDB(deleteID) {
    // alert("hi")
    try {
      // Open a connection to the IndexedDB database
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open('BooksDatabase', 1);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
  
      // Access the object store where the file is stored
      const transaction = db.transaction(['booksinformation'], 'readwrite');
      const objectStore = transaction.objectStore('booksinformation');
  
      // Use the delete method to remove the file from the object store
      await new Promise((resolve, reject) => {
        const deleteRequest = objectStore.delete(deleteID);
        deleteRequest.onsuccess = () => resolve();
        deleteRequest.onerror = () => reject(deleteRequest.error);

      });
  
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
  
  return (
    <div style={{ position:"fixed", 
    top:"0", left:"0", right:"0",bottom:"0",
     zIndex:"6" , width:"100%" , height:"fitContent" , display:"flex" , 
     justifyContent:"center" , alignItems:"center"}}
    >
    <div id="deletep1box">

       <div className="deleteFrequent" >
              
                  <DeleteCanvasComponent 
                  originalFile={originalFile}  fileList={fileList} 
                    uploadBook={uploadBook} deleteBookID={deleteBookID}  
                bookImageSubstitue={bookImageSubstitue} 
                bookClass={"deleteRecentCanvas"} bookRecentlyViewed={bookRecentlyViewed}
                />
                 
                
                <div className="deleteDescriptionBook" >

                  <p id="deleteQuestion">Do you want to delete this book ?</p>
                  <div className="deleteOptions">


                  <button onClick={ async ()=>{
              deleteFileFromIndexedDB(deleteBookID).then(()=>{
                setDeleteBookID(-1) ; 
                setDeleteName("") ;
                setBlack( false ) ;  

                setOriginalFile( prevArr => prevArr.filter( (ele) => ele.id !== deleteBookID))
                setFileList( prevArr => prevArr.filter( (ele) => ele.id !== deleteBookID)) ;
                const delArr =  deleteBook(deleteBookID) ; 
                setBookRecentlyViewed( setFrequentBooks()) ; 
                setBookRecentlyViewed( () => [...delArr] )
              })
              
             
            }}>YES</button>
             <button onClick={()=>{
               setDeleteBookID(-1) ; 
               setDeleteName("") ;
               setBlack( false ) ; 
            }}>NO</button>
                  </div>
                  
                </div>
              </div>
    </div>
    </div>
    
  )
}

export default DeletePopup ; 