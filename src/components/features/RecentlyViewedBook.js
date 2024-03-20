import React , { useState, useEffect }from 'react';
// import 'boxicons';
import "./style/ClockMessage.css";
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import bookImageSubstitue from "../../image/bookImageSubstitue.jpg" ; 
import plusUpload from "../../image/plusUpload.png" ; 
import uploadBookImage from "../../image/uploadBook.png"
import { ContextInfo } from '../../App';
import { useContext } from 'react';
// import  "../../style/BetterFile.css"
import "./style/RecentlyViewedBook.css"
import ProgressBar from './ProgressBar';
import FrequentCanvasComponent from "../FrequentCanvasComponent"
// import "./style/ClockMessage.css"

import {Play,  PauseCircle , Square} from "lucide-react"


const RecentlyViewedBook = ({  FrequentCanvasComponent ,
     getBookName , getBookAuthor , getBookCategory , getPercentageCompleted ,getBookPath, setDeleteBookID , 
      setUploadNewBook , setDeleteName , setDeleteCanvasImage
     }) => {

        const { originalFile, bookRecentlyViewed     } = useContext(ContextInfo) ;
      

    return ( 

        <div id="threeBooks" >

              { 
                bookRecentlyViewed.map(( ele , ind)=>{
                  if( ind === 0 ) return <div></div>
                  if( (!bookRecentlyViewed[ind] || bookRecentlyViewed[ind] ===-1|| originalFile.length===0)  ){
                   
                    return <div></div> ; 
                  }


                  return (
                  <div className="frequent" id="frequentBook1">
                  {/* <img src={getImageLink(bookRecentlyViewed[1])} /> */}
                  <Link to= {getBookPath(bookRecentlyViewed[ind])}  className='recentViewCanvas'  >
                    
                    <FrequentCanvasComponent  bookID={bookRecentlyViewed[ind]}  
                  bookImageSubstitue={bookImageSubstitue} 
                  bookClass={"recentCanvas"} bookRecentlyViewed={bookRecentlyViewed}
                  />
                    </Link>
                  
                  <div className="descriptionBook" >
                    <label className="getBookName">
                    { getBookName(bookRecentlyViewed[ind])}
                      {/* { "ssssssss dddddddd eeeeeeeeeee ww wwwwwwww ssss ddddddddddd fffff ffffff "} */}
                    
  
                    </label>
                    <label className="getBookAuthor">
                      { getBookAuthor(bookRecentlyViewed[ind])}
                      {/* { "ssssssss dddddddd eeeeeeeeeee ww wwwwwwww ssss ddddddddddd fffff ffffff "} */}
                    
  
  
                    </label>
  
                      {/* <button></button> */}
                      
                      {/* <button>{ getBookCategory(bookRecentlyViewed[1])[0]  }</button>  */}
                      { console.log( " the categiro of bookViewed1" , getBookCategory(bookRecentlyViewed[1]) )}
                    { 
                      ( getBookCategory(bookRecentlyViewed[1])  && getBookCategory(bookRecentlyViewed[1])  !== "" && getBookCategory(bookRecentlyViewed[1]).length !== 0   )  && 
                    
                    <button className='getBookCategory'>{ getBookCategory(bookRecentlyViewed[1])}</button>
                    
                    }
                    

                    <ProgressBar outerDiv={"progress"}  innerDiv1={"progress1"}  innerDiv2={"progress2"} progressWidth={ getPercentageCompleted(  bookRecentlyViewed[1] ) } />
                   
                    <div className="options">
                      <Link to ={getBookPath(bookRecentlyViewed[1])} >
                          <button>Read</button>
                      </Link>
                      
                      
                      {/* {getFirstPage(  bookRecentlyViewed[1] )} */}
                      <Trash2   className="trash"   onClick={ ()=>{
                        const pp = bookRecentlyViewed[1] ; 
                        // setDeleteBookID( ()=> bookRecentlyViewed[1]) ; 
                        // setDeleteName( getBookName(bookRecentlyViewed[1]) );
                        setDeleteCanvasImage( prev => !prev ) ; 
                        // alert( ele.id )
                        setDeleteBookID(  bookRecentlyViewed[ind] ) ; 
                        setDeleteName( getBookName( bookRecentlyViewed[ind] ) );


                        // setDeleteBookID( 2)
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
                  )
                } )
              }
             
               
             {
(   (!bookRecentlyViewed[3] || bookRecentlyViewed[3] ===-1|| originalFile.length===0)
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


    )

}

export default RecentlyViewedBook ; 