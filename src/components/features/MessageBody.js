import React , { useState, useEffect , useRef }from 'react';
// import 'boxicons';
import "./style/ClockMessage.css";
// import "./style/ClockMessage.css"

import {Play} from "lucide-react"
import {PauseCircle , Send, SendHorizontal } from "lucide-react"
import {Square } from "lucide-react"
import { MessageSquareX } from "lucide-react"


const MessageBody = ({pageMovement, scrollMode , setScrollMode , setIframePageNumber}) => {


    const [ currentPageNumber , setCurrectPageNumber] = useState( "" )  
    const [msgArr, setMsgArr] = useState([] );
    function saveNotes( page , message, messageID ){

        // alert("2222222222222") ; 
        const openDBRequest = indexedDB.open("BooksDatabase", 1);
      
        
        console.log( " trying yo dsnr mant ehnf here in this ") ; 
      openDBRequest.onsuccess = function(event) {
          const db = event.target.result;
      
          const transaction = db.transaction("booksinformation", "readwrite");
          const objectStore = transaction.objectStore("booksinformation");
      
          const key = Number(sessionStorage.getItem("bookKey"));
      
          const getRequest = objectStore.get(key);
      
          getRequest.onsuccess = function(event) {
              const record = event.target.result;
      
              // Modify the total page count
            //   record.currentPage = pageNo; // Assuming totalPages is the new total page count
      
            //   record.totalPage = totalPageOfBook ; 
              // Update the record in the object store
console.log( " saved thenotes ")
            //  const recordArr =  record.notes ; 
             record.notes.push({page , message, messageID } ) ; 
            //  record.notes = recordArr
            //   record.currentPage = pageNo; // Assuming totalPages is the new total page count

            //   record.totalPage = totalPageOfBook ;
console.log("333333333333333333333" , msgArr)
            //   alert("333333333333333")
              const updateRequest = objectStore.put(record);
      
              updateRequest.onsuccess = function(event) {
                  console.log("Total pages updated successfully");
                //   alert("44444444444444444")
              };
      
              updateRequest.onerror = function(event) {
                  console.error("Error updating total pages:", event.target.error);
              };
          };
      
          getRequest.onerror = function(event) {
              console.error("Error retrieving record:", event.target.error);
          };
      };
      
      
      }

      function deleteNotes(messageID){


        const openDBRequest = indexedDB.open("BooksDatabase", 1);
      
        // const pageNo = Number( sessionStorage.getItem("currentPage")) ; 
        // const totalPageOfBook = Number( sessionStorage.getItem("totalPage"))
      
        console.log( " trying yo dsnr mant ehnf here in this ") ; 
      openDBRequest.onsuccess = function(event) {
          const db = event.target.result;
      
          const transaction = db.transaction("booksinformation", "readwrite");
          const objectStore = transaction.objectStore("booksinformation");
      
          const key = Number(sessionStorage.getItem("bookKey"));
      
          const getRequest = objectStore.get(key);
      
          getRequest.onsuccess = function(event) {
              const record = event.target.result;
      
              // Modify the total page count
            //   record.currentPage = pageNo; // Assuming totalPages is the new total page count
      
            //   record.totalPage = totalPageOfBook ; 
              // Update the record in the object store
console.log( " saved thenotes ")
             const recordArr =  record.notes ; 
            //  record.notes.push({page , message, messageID } ) ; 
            const tempRecordArr = recordArr.filter( ele => ele.messageID !== messageID ) ; 

             record.notes = [  ...tempRecordArr ]

            //   record.currentPage = pageNo; // Assuming totalPages is the new total page count

            //   record.totalPage = totalPageOfBook ;
console.log("333333333333333333333" , msgArr)
            //   alert("333333333333333")
              const updateRequest = objectStore.put(record);
      
              updateRequest.onsuccess = function(event) {
                  console.log("Total pages updated successfully");
                //   alert("44444444444444444")
              };
      
              updateRequest.onerror = function(event) {
                  console.error("Error updating total pages:", event.target.error);
              };
          };
      
          getRequest.onerror = function(event) {
              console.error("Error retrieving record:", event.target.error);
          };
      };


      }


    // const [ msgVal , setMsgVal] = useState("") ; 
    const textAreaRef = useRef(null) ; 
    
     function saveMessage(){

        // if( scrollMode){

        // }else{
            
        // }
        const page = scrollMode ? currentPageNumber : Number( sessionStorage.getItem("currentPage")) ; 
        const message = textAreaRef.current.value ; 
        const messageID = Date.now() ; 

        setMsgArr( prev=> [ ...prev , { page : page , message : message , messageID : messageID }]) ; 
        textAreaRef.current.value = "" ;
        // textAreaRef.current.rese
        saveNotes( page , message , messageID ) ;  
        setCurrectPageNumber("")
        // setMsgVal( "")
        // alert("Enter pressed")
    }
    function deleteMessage( messageID ){
        // alert( messageID ) ; 

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



    // return ()=>{
    //     alert("111111111111")
    //     saveNotesAndPageNumbers() ; 
    //   }




  
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
           {/* <Send className="sendMessage"/> */}
           <SendHorizontal  className="sendMessage" onClick={ ()=>saveMessage()  } />
            
           {/* <input placeholder="Enter your Comment"></input> */}
       </div>
  
</div>


)


}

export default MessageBody