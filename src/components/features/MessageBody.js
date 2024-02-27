import React , { useState, useEffect }from 'react';
// import 'boxicons';
import "./style/ClockMessage.css";
// import "./style/ClockMessage.css"

import {Play} from "lucide-react"
import {PauseCircle } from "lucide-react"
import {Square } from "lucide-react"


const MessageBody = ({divRef}) => {
    const [msgArr, setMsgArr] = useState([]);
    
    async function saveChanges(){
        // const msg = divRef.current.textContent ; 
        // const pageNumber =  fileList[bookIndex].currentPage ; 
        // alert(`${msg} , ${pageNumber}`)
        // const obj  = {page: pageNumber , message:msg} ; 
        // const newMsgArr = [ ...msgArr ,  obj ]
        // setMsgArr( (prev)=> [...prev, obj] ) 
        // console.log( "msgArr",msgArr)  ; 

        // const metaRef = ref( storage , fileList[bookIndex].path ) ;
        // console.log( "originalFile[bookIndex].path " , fileList[bookIndex].path );
        // const metaData= await  getMetadata(metaRef) ;
        // const objMetaData = metaData.customMetadata ; 
        // const tttt = JSON.stringify(newMsgArr)  
        // alert(`objMetaData ${objMetaData}`)
        // console.log("objMetaData" , objMetaData ) ; 
        // objMetaData.messageBody = tttt 
        // console.log("objMetaData" , objMetaData ) ;
        // const newMetadata = {
        //     "customMetadata": objMetaData 
        // }         
         
        // ;
        // console.log( newMetadata ) ; 
        // console.log("newMetadata" , newMetadata ) ; 
        // const resultMetaData = await updateMetadata(metaRef, newMetadata) ; 
        // console.log("resultMetaData" , resultMetaData) ;
        // setComment("Comments here...")

    }



return(
 <div id="second">
       
       <div id="message">
           <div id="messageDiv" style={ msgArr.length === 0 ? {padding:"0"}:{}}>
           { 
               msgArr.map( (ele,ind)=>{
                   return( 
                       <div className="messagesBody">
                       <p className="pageNumber">
                          {`page ${ele.page}`}
                       </p>
                       <p className="pageBody" >
                          {ele.message}
                       </p>

                       </div>
                   )
               })
           }
               
           </div>
          
       </div>
       <div id="wrapper">
           <textarea placeholder='Write Notes' id="messageContent"    onKeyDown={(e)=> {if(e.key === 'Enter') saveChanges()}}
           />
            
           {/* <input placeholder="Enter your Comment"></input> */}
       </div>
  
</div>


)


}

export default MessageBody