import React , {useState, useRef , useContext, useEffect }from 'react'
import "../../css/ClockMessage.css"
import { ContextInfo } from '../../App';
import { useSearchParams, Link } from 'react-router-dom';
import MessageBody from '../../components/SideBar/MessageBody';
import StopWatch from '../../components/SideBar/StopWatch';
import Timer from '../../components/SideBar/Timer';
import ShowOptions from '../../components/SideBar/ShowOptions';

import InnerShowOptions from '../../components/SideBar/InnerShowOptions';

const ClockMessage = ({ fileList, clockMessageRef, pdfContainer, setSinglePageMode, singlePageMode, pageMovement , 
  scrollMode, setScrollMode , iframeRef , iframeURL , setIframePageNumber}) => {

  const divRef = useRef(null) ; 
  const [searchParams, setSearchParams] = useSearchParams() ;
  const url= searchParams.get("url") ; 
  const [bookIndex , setBookIndex] = useState(Number( url ) ) ;
  const [msgArr, setMsgArr] = useState([]);

  const[  showStopWatch , setShowStopWatch] = useState( false ) ; 

    
  async function saveChanges(){
      const msg = divRef.current.textContent ; 
      const pageNumber =  fileList[bookIndex].currentPage ; 
      alert(`${msg} , ${pageNumber}`)
      const obj  = {page: pageNumber , message:msg} ; 
      const newMsgArr = [ ...msgArr ,  obj ]
      setMsgArr( (prev)=> [...prev, obj] ) 
      
  }


  function moveLeft(){
  
    clockMessageRef.current.classList.add("movedClockLeft") ;
    clockMessageRef.current.classList.remove("movedClockRight") ;
    showOptions.current.classList.remove("movedOptionsLeft") ; 
    showOptions.current.classList.add("movedOptionsRight") ;
    pdfContainer.current.classList.remove("movedPdfRight") ; 
    pdfContainer.current.classList.add("movedPdfLeft") ;  
}
function moveRight(){
    clockMessageRef.current.classList.remove("movedClockLeft") ;
    clockMessageRef.current.classList.add("movedClockRight") ;
    showOptions.current.classList.add("movedOptionsLeft") ; 
    showOptions.current.classList.remove("movedOptionsRight") ; 
    pdfContainer.current.classList.add("movedPdfRight") ; 
    pdfContainer.current.classList.remove("movedPdfLeft") ;  
}



  const showOptions= useRef(null) ; 
   
    
  return (
    <div id="clockContainer">
       <ShowOptions  moveRight={moveRight} showOptions={showOptions} showStopWatch={showStopWatch} setShowStopWatch={setShowStopWatch}
       setSinglePageMode={setSinglePageMode} pageMovement={pageMovement} singlePageMode={singlePageMode}
       scrollMode={scrollMode} setScrollMode={setScrollMode} 
       iframeRef={iframeRef}  iframeURL ={iframeURL} setIframePageNumber={setIframePageNumber}
       />



        <div  ref={clockMessageRef} id="messageRight">
       <InnerShowOptions moveLeft={moveLeft} setShowStopWatch={setShowStopWatch} showStopWatch={showStopWatch} />
     
      
       <StopWatch showStopWatch={showStopWatch} />
       
       <Timer moveRight={moveRight}  showStopWatch={showStopWatch}/>




        <MessageBody pageMovement={pageMovement} scrollMode={scrollMode} setScrollMode={scrollMode}
        setIframePageNumber={setIframePageNumber} />
</div>
    </div>
    
  )
}

export default ClockMessage