import React , {useContext, useEffect, useState , useRef} from 'react'
// import "../style/BetterFile.css"
import "../../css/LeftUI.css"

 import {ContextInfo}  from "../../App"
import Calendar from '../../components/Calendar'
import { Link } from 'react-router-dom';
import bookImageSubstitue from "../../assets/bookImageSubstitue.jpg" ; 
 import pinkBox from "../../assets/pinkBox.png" ; 
 import plusUpload from "../../assets/plusUpload.png"
import CanvasComponent from '../../components/Canvas/CanvasComponent' ; 
import FrequentCanvasComponent from '../../components/Canvas/FrequentCanvasComponent' ; 
import { Pencil , Check} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomImage from '../../components/BottomImage'

import ProgressBar from '../../components/ProgressBar'

import getPercentageCompleted from "../../utils/getPercentageCompleted" ; 
import getBookAuthor from "../../utils/getBookAuthor" ; 
import getBookName from "../../utils/getBookName" ; 
import getBookPath from "../../utils/getBookPath" ; 



const LeftUI = ({setUploadNewBook , setSendFeedBack , setBlack}) => {
    const [ enterName , setEnterName] = useState( true ) ;  
    // const [ userName , setUserName] = useState("") ; 
    const inputImageRef = useRef(null) ; 
    const inputNameRef = useRef(null) ; 
    const {calendarEntry , setCalendarEntry, bookRecentlyViewed, setBookRecentlyViewed, originalFile, setOriginalFile , 
      userName, setUserName } = useContext(ContextInfo)
    const [ userImageSrc , setUserImageSrc] = useState("") ; 

    function imageUploaded( imageFile ){
      if( !imageFile ) return ; 
        console.log( "imageFile" , imageFile ) ;
        
        const imageType=["jpeg", "jpg", "png", "gif", "bmp", "svg", "webp" ] ; 
        const uploadedImageType = imageFile.type.split("/")[1] ; 

        
        const ind = imageType.findIndex( ele => ele===uploadedImageType) ; 
        console.log( uploadedImageType , ind )
        if( ind === -1 ){
          toast.error("Only Image File Allowed!! ") ; 
            // alert("Only Image File Allowed!! ") ; 

            return ; 
        }

        const reader = new FileReader(); // Create a FileReader object

    reader.onload = function(e) {
      var imageSrc = e.target.result; // Get the image source data
    //   var image = document.createElement('img'); // Create an image element
    //   image.src = imageSrc; // Set the image source

    //   var imageContainer = document.getElementById('imageContainer');
    //   imageContainer.innerHTML = ''; // Clear previous content
    //   imageContainer.appendChild(image); // Append the image to the container
    setUserImageSrc( imageSrc ) ; 
    // alert(imageSrc) 
    localStorage.setItem("userImageSrc" , JSON.stringify(imageSrc ))
    };

    reader.readAsDataURL( imageFile );
        


    }
    
  useEffect(()=>{
    let val = localStorage.getItem("userName") ;
    // val = !val ? "" : val ; 
    setUserName( val )  ;  
    const userImageSrc = JSON.parse( localStorage.getItem("userImageSrc")) ; 
    setUserImageSrc( userImageSrc ) ; 
  } , [] )
  
   if( !calendarEntry || calendarEntry.length===0) return <div></div>
    return (
        <div id="bookleft">
           <div id="name">

                <div id="userImage" >
                      {/* <input type="file" ></input> */}
          { !userImageSrc && <svg  viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29 7C31.6522 7 34.1957 8.05357 36.0711 9.92893C37.9464 11.8043 39 14.3478 39 17C39 19.6522 37.9464 22.1957 36.0711 24.0711C34.1957 25.9464 31.6522 27 29 27C26.3478 27 23.8043 25.9464 21.9289 24.0711C20.0536 22.1957 19 19.6522 19 17C19 14.3478 20.0536 11.8043 21.9289 9.92893C23.8043 8.05357 26.3478 7 29 7ZM29 12C27.6739 12 26.4021 12.5268 25.4645 13.4645C24.5268 14.4021 24 15.6739 24 17C24 18.3261 24.5268 19.5979 25.4645 20.5355C26.4021 21.4732 27.6739 22 29 22C30.3261 22 31.5979 21.4732 32.5355 20.5355C33.4732 19.5979 34 18.3261 34 17C34 15.6739 33.4732 14.4021 32.5355 13.4645C31.5979 12.5268 30.3261 12 29 12ZM29 29.5C35.675 29.5 49 32.825 49 39.5V47H9V39.5C9 32.825 22.325 29.5 29 29.5ZM29 34.25C21.575 34.25 13.75 37.9 13.75 39.5V42.25H44.25V39.5C44.25 37.9 36.425 34.25 29 34.25Z" fill="black"/>
<circle cx="28.5" cy="28.5" r="28.5" fill="#9153CE" fill-opacity="0.25" 
    onClick={()=>{inputImageRef.current.click()}}  />
</svg>}

{ userImageSrc && <img src={userImageSrc} 
onClick={()=>{inputImageRef.current.click()}} />}

<input ref={inputImageRef} type="file" 
onChange={e => imageUploaded(e.target.files[0])} />
                </div>
          
            <div id="welcome">
                <p id="greeting">Greetings...</p>
                <input ref={inputNameRef} id="userName" placeholder='UserName' value={userName===null?"":userName} onChange={(e)=>setUserName(e.target.value)} 
                autofocus="autofocus" readOnly={enterName} />
               { enterName &&  <Pencil width="20" height="20"   onClick={()=>{setEnterName(false)
                    inputNameRef.current.focus() 
            
            }} /> }
               { !enterName && <Check  width="20" height="20"  onClick={()=>{

                localStorage.setItem('userName' , userName  ) ; 
                setEnterName(true) ; 
               }}  /> }
                {/* <p id="userName">UserName</p> */}
            </div>
          
           </div>
           {/* <div id='bookReadContainer'> */}
           {
            (!bookRecentlyViewed[0] || bookRecentlyViewed[0] ===-1|| originalFile.length===0)
            &&
            <div id="pinkBoxDiv" >
             
              <img  src={pinkBox}  id="pinkBox"  onClick={()=>{setUploadNewBook(false);setUploadNewBook(true)}}  />
              <img src={plusUpload} id="plusUploadPink" onClick={()=>{setUploadNewBook(false);setUploadNewBook(true)}} />
              <p id="uploadPink" onClick={()=>{setUploadNewBook(false);setUploadNewBook(true)}}  >UPLOAD</p>
              
           </div>

           }
          
           {
            // { console.log(bookRecentlyViewed)}
            
            !(!bookRecentlyViewed[0] || bookRecentlyViewed[0] ===-1|| originalFile.length===0)
          
            &&
            
            <div id="bookRead" className="second-step" >
              {console.log("!(!bookRecentlyViewed[0]  " , 
              bookRecentlyViewed )}
              
                <p id="bookName">{getBookName(bookRecentlyViewed[0] , originalFile)}</p>
                <p id="author">-- {getBookAuthor(bookRecentlyViewed[0] , originalFile)}</p>
                
                    <div id="bookView">
                        <div className>
                        { (!bookRecentlyViewed[0] || bookRecentlyViewed[0] ===-1|| originalFile.length===0)?
                  <img src={bookImageSubstitue}  className='firstViewCanvas'/> :   
                  <FrequentCanvasComponent  bookID={bookRecentlyViewed[0]}  
                  bookImageSubstitue={bookImageSubstitue} 
                  bookClass={"firstViewCanvas"} bookRecentlyViewed={bookRecentlyViewed}
                  />}
                            {/* <CanvasComponent />
              <img src={getImageLink(bookRecentlyViewed[0])} className="firstViewCanvas"/> */}
                        </div>
                        
                       
                    </div>
                
                    <ProgressBar outerDiv={"bookprogress"}  innerDiv1={"bookprogress1"}  innerDiv2={"bookprogress2"} progressWidth={ getPercentageCompleted(  bookRecentlyViewed[0] ,originalFile) } />
                    
                <Link style={ {textDecoration :"none"} }to ={getBookPath(bookRecentlyViewed[0] , originalFile)} onClick={ ()=>{  if( getBookPath(bookRecentlyViewed[0] , originalFile) ) sessionStorage.setItem("bookKey" , bookRecentlyViewed[0]) }}>
                            <p id="read" > 
                        {"Continue Reading >>"}
                          </p>
                      </Link>

                     
            </div>}
           {/* </div> */}
           
             <Calendar />
          

             <BottomImage  setSendFeedBack={setSendFeedBack}  setBlack={setBlack}/>
             
             
           
              
        </div>

    )
}

export default LeftUI