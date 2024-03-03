import React , {useContext} from 'react'
import "../style/DeletePopup.css";
import {ContextInfo} from "../App";
import {deleteBook} from "../utils/updateBookRecentlyViewed"
const DeletePopup = ({deleteName , setDeleteName, setBlack, deletePath,setDeletePath,deleteFile , deleteBookID,setDeleteBookID , 
}) => {
  
  const {fileList, setFileList, originalFile, setOriginalFile,   bookRecentlyViewed, 
    setBookRecentlyViewed} = useContext(ContextInfo) ; 


  async function deleteFileFromIndexedDB(deleteID) {
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
  


      console.log('File deleted successfully');
      
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
  
  // Call the function
  // deleteFileFromIndexedDB();
  
  return (
    <div style={{ position:"fixed", 
    top:"0", left:"0", right:"0",bottom:"0",
     zIndex:"6" , width:"100%" , height:"fitContent" , display:"flex" , 
     justifyContent:"center" , alignItems:"center"}}
    >
    <div id="p1box">
        <p id="p1p">{`Are you sure, you want to Delete ${deleteName} !!`}  </p>
        <div id="p1dec">
            <button onClick={ async ()=>{
              // if( deleteInd === -1 ) return ; 
              
              // deleteFile(deletePath ) ; 
              deleteFileFromIndexedDB(deleteBookID).then(()=>{
                setDeleteBookID(-1) ; 
                setDeleteName("") ;
                setBlack( false ) ;  



                setOriginalFile( prevArr => prevArr.filter( (ele) => ele.id !== deleteBookID))
                setFileList( prevArr => prevArr.filter( (ele) => ele.id !== deleteBookID)) ;
                const delArr =  deleteBook(deleteBookID) ; 

                console.log( " ADD NEW FILE POPUP JS " , delArr  )
                setBookRecentlyViewed( [...delArr] )


                // setOriginalFile( prev => [...prev])
              })
              
             

            }}>Yes</button>
             <button onClick={()=>{
               setDeleteBookID(-1) ; 
               setDeleteName("") ;
               setBlack( false ) ; 
            }}> No</button>
        </div>
    </div>
    </div>
    
  )
}

export default DeletePopup ; 