import React , { useState, useEffect , useRef }from 'react';
import "../../css/ClockMessage.css";
import { SendHorizontal } from "lucide-react"
import { MessageSquareX } from "lucide-react"
import saveNotes from '../../utils/saveNotes';
import deleteNotes from '../../utils/deleteNotes';
const MessageBody = ({pageMovement, scrollMode }) => {
    const [ currentPageNumber , setCurrectPageNumber] = useState( "" )  
    const [msgArr, setMsgArr] = useState([] );
     

    const textAreaRef = useRef(null) ; 
     function saveMessage(){
        const page = scrollMode ? currentPageNumber : Number( sessionStorage.getItem("currentPage")) ; 
        const message = textAreaRef.current.value ; 
        const messageID = Date.now() ; 
        setMsgArr( prev=> [ ...prev , { page : page , message : message , messageID : messageID }]) ; 
        textAreaRef.current.value = "" ;
        saveNotes( page , message , messageID ) ;  
        setCurrectPageNumber("")
    }
    function deleteMessage( messageID ){

        setMsgArr( prev => prev.filter( ele => ele.messageID !== messageID )) 
        deleteNotes( messageID ) ; 
    }

    useEffect(()=>{
        
    const openDBRequest = indexedDB.open("BooksDatabase", 1);

    openDBRequest.onsuccess = function(event) {

    
        const db = event.target.result;

        const transaction = db.transaction("booksinformation", "readonly");
        const objectStore = transaction.objectStore("booksinformation");

        const key = Number(sessionStorage.getItem("bookKey"))  ;

        console.log( " the key is " , key )
        const getRequest = objectStore.get(key);

        getRequest.onsuccess =   async function(event) {
            const record = event.target.result;
            // if (record) {
            //     setRecord(record);
            // } else {
            //     console.log("Record not found");
            // }

            console.log( " the record is " , record ) ; 
            console.log( "insdie the messageBody I have openedc db  ...." , record.currentPage,record.totalPage,  record.data) ; 
       
            const bookID = record.id ; 
           console.log( "the entry is also present here" , record.notes )
           setMsgArr(  record.notes ) ; 

           
           

       
          };

        getRequest.onerror = function(event) {
            console.error("Error retrieving record:", event.target.error);
        };
    };
    } , [] )
return(
 <div id="second">
       <p id="notes">NOTES</p>
       <div id="message">
           <div id="messageDiv" style={ msgArr.length === 0 ? {padding:"0"}:{}}>
           { 
               msgArr.map( (ele,ind)=>{
                   return( 
                       <div className="messagesBody">
                       <p className="pageNumber" onClick={()=>pageMovement(Number(ele.page))}>
                          {`page ${ele.page}`}
                       </p>
                         <p className="pageBody" >
                          {ele.message}
                       </p>
                       <MessageSquareX width="15px" height="15px" className="deleteIcon"  onClick={()=> deleteMessage(ele.messageID)}/>
                       </div>
                   )
               })
           }
           </div>
       </div>
       <div id="wrapper">
            {
                scrollMode && 
                <input type="number" id="iframePageNumber" placeholder='Page Number' onChange={(e)=>setCurrectPageNumber(Number(e.target.value ))}
                value={currentPageNumber}
               />
            }           
           <textarea ref={textAreaRef} style={ scrollMode ? { height: "70%" , borderRadius:"0"  , 
           borderBottomLeftRadius:"12px" , borderBottomRightRadius:"12px"  } :{}}placeholder='Write Notes' id="messageContent"     
           />   
           <SendHorizontal  className="sendMessage" onClick={ ()=>saveMessage()  } />
       </div>

</div>


)


}

export default MessageBody