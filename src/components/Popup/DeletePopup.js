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

  // alert(deleteBookID)  ;
  // const [ deleteBook , setDeleteBook] = useState(false) ; 
  // useEffect(()=>{
  //   setDeleteBook(false) ; 
  //   setDeleteBook(true ) ; 
  // } , [deleteBookID]) ; 
  useEffect(()=>{
    // alert(deleteteCanvasImage)
    // alert("     setDeleteBookID( prev => prev +1 )    ")
     setDeleteBookID( prev => prev +1 ) ; 
     setDeleteBookID( prev => prev -1 ) ; 
    
  } , [] )
  const {setBookRecentlyViewed,   bookRecentlyViewed } = useContext(ContextInfo) ; 
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
    <div id="deletep1box">

       <div className="deleteFrequent" >
                {/* <img src={getImageLink(bookRecentlyViewed[1])} /> */}
             
                
                  
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
              // if( deleteInd === -1 ) return ; 
              
              // deleteFile(deletePath ) ; 
              // alert("hi")
              deleteFileFromIndexedDB(deleteBookID).then(()=>{
                setDeleteBookID(-1) ; 
                setDeleteName("") ;
                setBlack( false ) ;  



                setOriginalFile( prevArr => prevArr.filter( (ele) => ele.id !== deleteBookID))
                setFileList( prevArr => prevArr.filter( (ele) => ele.id !== deleteBookID)) ;
                // window.location.reload() ; 
                const delArr =  deleteBook(deleteBookID) ; 

                console.log( " ADD NEW FILE POPUP JS " , delArr  ) ; 
                setBookRecentlyViewed( setFrequentBooks()) ; 
                setBookRecentlyViewed( () => [...delArr] )


                // setOriginalFile( prev => [...prev])
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