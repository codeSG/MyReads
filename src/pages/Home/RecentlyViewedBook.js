import React from 'react';

import "../../css/ClockMessage.css";
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import bookImageSubstitue from "../../assets/bookImageSubstitue.jpg" ; 
import plusUpload from "../../assets/plusUpload.png" ; 
import uploadBookImage from "../../assets/uploadBook.png"
import { ContextInfo } from '../../App';
import { useContext } from 'react';

import "../../css/RecentlyViewedBook.css"
import ProgressBar from '../../components/ProgressBar';
import getBookAuthor from '../../utils/getBookAuthor';
import getBookName from "../../utils/getBookName"
import getBookCategory from "../../utils/getBookCategory"
import getBookPath from '../../utils/getBookPath';
import getPercentageCompleted from '../../utils/getPercentageCompleted';


const RecentlyViewedBook = ({  FrequentCanvasComponent ,
       setDeleteBookID , 
      setUploadNewBook , setDeleteName 
     }) => {

        const { originalFile, bookRecentlyViewed     } = useContext(ContextInfo) ;
      

    return ( 

        <div id="threeBooks" >

              { 
                bookRecentlyViewed.map(( ele , ind)=>{
                  if( ind === 0 ) return <div key={-1}></div>
                  if( (!bookRecentlyViewed[ind] || bookRecentlyViewed[ind] ===-1|| originalFile.length===0)  ){
                   
                    return <div key={-2}></div> ; 
                  }


                  return (
                  <div key={ind} className="frequent" id="frequentBook1">
              
                  <Link to= {getBookPath(bookRecentlyViewed[ind] , originalFile )}  className='recentViewCanvas'  >
                    
                    <FrequentCanvasComponent  bookID={bookRecentlyViewed[ind]}  
                  bookImageSubstitue={bookImageSubstitue} 
                  bookClass={"recentCanvas"} bookRecentlyViewed={bookRecentlyViewed}
                  />
                    </Link>
                  
                  <div className="descriptionBook" >
                    <label className="getBookName">
                    { getBookName(bookRecentlyViewed[ind] , originalFile)}
                     
                    </label>
                    <label className="getBookAuthor">
                      { getBookAuthor(bookRecentlyViewed[ind] , originalFile)}
                     
                    </label>
                    { 
                      ( getBookCategory(bookRecentlyViewed[1] , originalFile)  && getBookCategory(bookRecentlyViewed[1] , originalFile)  !== "" && getBookCategory(bookRecentlyViewed[1] , originalFile).length !== 0   )  && 
                    
                    <button className='getBookCategory'>{ getBookCategory(bookRecentlyViewed[1] , originalFile)}</button>
                    }
                    <ProgressBar outerDiv={"progress"}  innerDiv1={"progress1"}  innerDiv2={"progress2"} progressWidth={ getPercentageCompleted(  bookRecentlyViewed[1] , originalFile) } />
                   
                    <div className="options">
                      <Link to ={getBookPath(bookRecentlyViewed[1])} >
                          <button>Read</button>
                      </Link>
                      <Trash2   className="trash"   onClick={ ()=>{
                        setDeleteBookID(  bookRecentlyViewed[ind] , originalFile ) ; 
                        setDeleteName( getBookName( bookRecentlyViewed[ind] , originalFile ) );
                      }}/>
                    
                    </div>
                  </div>
                </div>
                  )
                } )
              }
             
             {
      (   (!bookRecentlyViewed[3] || bookRecentlyViewed[3] ===-1|| originalFile.length===0) )
        &&
        <div  className="frequent uploadBooks first-step" id="frequentBook1">
          <div id="frequentBook1Div">
          <img id="uploadBookImage" src={uploadBookImage} onClick={()=>{setUploadNewBook(false);setUploadNewBook(true)}} />
          <img  id="plusUpload" src={plusUpload} onClick={()=>{setUploadNewBook(false);setUploadNewBook(true)}} />
          <p id="uploadP"onClick={()=>{setUploadNewBook(false);setUploadNewBook(true)}} >UPLOAD</p>
          <p id="bookP" onClick={()=>{setUploadNewBook(false);setUploadNewBook(true)}}>BOOK</p>
          </div>
            </div>
        }
                
            </div>
    )
}

export default RecentlyViewedBook ; 