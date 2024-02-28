import React , { useState, useEffect , useRef }from 'react';
// import 'boxicons';
import "./style/ClockMessage.css";
// import "./style/ClockMessage.css"

import {Play} from "lucide-react"
import {PauseCircle } from "lucide-react"
import {Square } from "lucide-react"


const MessageBody = ({divRef}) => {
    const [msgArr, setMsgArr] = useState([] );
    function saveNotes( page , message ){

        // alert("2222222222222") ; 
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
             recordArr.push({page , message } ) ; 
             record.notes = recordArr
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
    
     function saveChanges(){
        const page = Number( sessionStorage.getItem("currentPage")) ; 
        const message = textAreaRef.current.value ; 

        setMsgArr( prev=> [ ...prev , { page : page , message : message }]) ; 
        textAreaRef.current.value = "" ;
        saveNotes( page , message ) ;  
        // setMsgVal( "")
        // alert("Enter pressed")
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
           <textarea ref={textAreaRef} placeholder='Write Notes' id="messageContent"    onKeyDown={(e)=> {if(e.key === 'Enter') saveChanges()}}
           />
            
           {/* <input placeholder="Enter your Comment"></input> */}
       </div>
  
</div>


)


}

export default MessageBody