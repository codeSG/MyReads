import React , { useState, useEffect }from 'react';
// import 'boxicons';
import {Link} from "react-router-dom"
import "./style/ClockMessage.css";

import { Columns2  , RectangleVertical , ArrowBigUp , GalleryHorizontal} from 'lucide-react' ; 
// import { ArrowBigUp } from 'lucide-react';


const ShowOptions = ({showOptions,moveRight,showStopWatch, setSinglePageMode ,singlePageMode,  pageMovement , 
    scrollMode , setScrollMode , iframeRef , iframeURL , setIframePageNumber}) => {
    

        // alert( iframeURL )
const [ jumpToPage , setJumpToPage] = useState(false ) ; 

const [jumpToPageNumber , setJumpToPageNumber] = useState( 1 ) ; 

function jumpToPageChange(){
    setJumpToPage(true);
    const pageVal = Number(sessionStorage.getItem("currentPage") ) ; 
    setJumpToPageNumber( pageVal)  ; 
}

function goToPage(){
    // alert( jumpToPageNumber ) ; 
    
    const totalPage = Number(sessionStorage.getItem("totalPage") ) ; 
    let pageVal  = jumpToPageNumber ; 
    pageVal = Math.max( 1 , pageVal ) ; 
    pageVal = Math.min( pageVal , totalPage  )  ; 
    sessionStorage.setItem("currentPage" , pageVal) ; 
    if( !scrollMode){
      
        pageMovement( pageVal ) ; 
        
    }
  else{

   
    
    // alert( `in the scroll Mode ${pageVal}`)
    // console.log(" the iframeURL is thsi " , iframeURL + `#page=${pageVal}`)  ;
    setIframePageNumber( pageVal) ;  
    // iframeRef.current.src= iframeURL + `#page=${pageVal}` ;
  }
  
        setJumpToPage( false ) ; 
}

async function getPdfBytesFromUrl(pdfUrl) {
    try {
        const response = await fetch(pdfUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch PDF file');
        }
        const pdfBytes = await response.arrayBuffer();
        return pdfBytes;
    } catch (error) {
        console.error('Error fetching PDF bytes:', error);
        return null;
    }
}




async function savePDFChanges(){
    try{

    //     const existingPdfBytes = await fetch(iframeURL).then(res => res.arrayBuffer())

    // const file = await getFileFromInput(existingPdfBytes);
    const OBJECTURL = sessionStorage.getItem("OBJECTURL") ; 
    const response = await fetch(OBJECTURL);
    const pdfBytes = await response.arrayBuffer();
    const file = await getFileFromInput(pdfBytes);

    console.log( " the modified pdf file is this "  , file , "dekh bhaoya dhyan se") ; 
    // console.log()
    saveChangesInBook(file) ; 
    }catch(error){

    }
    


}

function saveChangesInBook(file){
    const openDBRequest = indexedDB.open("BooksDatabase", 1);
  
    const pageNo = Number( sessionStorage.getItem("currentPage")) ; 
    const totalPageOfBook = Number( sessionStorage.getItem("totalPage"))
  
  openDBRequest.onsuccess = function(event) {
      const db = event.target.result;
  
      const transaction = db.transaction("booksinformation", "readwrite");
      const objectStore = transaction.objectStore("booksinformation");
  
      const key = Number(sessionStorage.getItem("bookKey"));
  
      const getRequest = objectStore.get(key);
  
      getRequest.onsuccess = function(event) {
          let record = event.target.result;
  
          // Modify the total page count
          record.currentPage = pageNo; // Assuming totalPages is the new total page count
  
          record.totalPage = totalPageOfBook ; 

        //   -------------------------------------

            record = { ...record , ...file }
        // ------------------------------------

          // Update the record in the object store
          const updateRequest = objectStore.put(record);
  
          updateRequest.onsuccess = function(event) {
              console.log("Bonzye the pdf is saved successfully");
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



const getFileFromInput = (existingPdfBytes) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve({
                type: 'application/pdf', // Assuming PDF type
                size: existingPdfBytes.byteLength, // Get the byte length of existingPdfBytes
                data: event.target.result , // Use existingPdfBytes directly
            });
        };
        reader.onerror = (event) => {
            reject(event.target.error);
        };
        reader.readAsArrayBuffer(new Blob( [existingPdfBytes] , { type: 'application/pdf' }   )); // Convert existingPdfBytes to Blob and read as ArrayBuffer
    });
}


return(
    <div id="showOptions" ref={showOptions} >

        <Link to="/">
        <div className="svgIcon link ttooltip showOptions-ningthStep"   onClick={()=> {}}>
            <svg  style={{width:"25px" , height:"25px"}} viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.91974 9.8706L0.959868 11.0934L0 9.8706L0.959868 8.6478L1.91974 9.8706ZM25 23.7071C25 24.1658 24.857 24.6057 24.6024 24.9301C24.3477 25.2544 24.0024 25.4366 23.6423 25.4366C23.2823 25.4366 22.9369 25.2544 22.6823 24.9301C22.4277 24.6057 22.2847 24.1658 22.2847 23.7071H25ZM7.74818 19.7412L0.959868 11.0934L2.8796 8.6478L9.66792 17.2956L7.74818 19.7412ZM0.959868 8.6478L7.74818 0L9.66792 2.4456L2.8796 11.0934L0.959868 8.6478ZM1.91974 8.14104H15.4964V11.6002H1.91974V8.14104ZM25 20.248V23.7071H22.2847V20.248H25ZM15.4964 8.14104C18.0169 8.14104 20.4342 9.41658 22.2164 11.6871C23.9987 13.9576 25 17.037 25 20.248H22.2847C22.2847 17.9544 21.5695 15.7548 20.2964 14.133C19.0234 12.5113 17.2967 11.6002 15.4964 11.6002V8.14104Z" fill="black"/>
            </svg>
          
  <span className="ttooltiptext">Back</span>


        </div>


        </Link>
   

    <div className="svgIcon darkShadow ttooltip showOptions-eigthStep" onClick={()=>moveRight()}>
    <svg style={{width:"25px" , height:"25px"}}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5 5H11L16 12L11 19H15.5L20.5 12L15.5 5Z" fill="black"/>
<path d="M8.5 5H4L9 12L4 19H8.5L13.5 12L8.5 5Z" fill="black"/>
</svg>
<span className="ttooltiptext" >Show Options</span>


    </div>


  

 
    {/* <div className="svgIcon darkShadow ttooltip"  style={{ backgroundColor: singlePageMode ?"rgba(145, 83, 206, 0.25)" : "white"}} onClick={()=>
        {
            setScrollMode( false )
            setSinglePageMode(true) ; }  } >
        <RectangleVertical/>
        <span className="ttooltiptext" >Single Page</span>
    </div> */}

<div className="darkShadow svgContainer">

        <div className="svgContainerIcon ttooltip showOptions-seventhStep" onClick={()=>moveRight()} style={{ backgroundColor:showStopWatch? "white":"rgba(145, 83, 206, 0.25)" }}>
            <svg style={{width:"25px" , height:"25px"}} viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.915 13L13.2266 12.7585C16.5191 10.2056 19.2565 7.12492 21.3 3.673C21.4849 3.36068 21.5809 3.01199 21.5795 2.6581C21.5781 2.30422 21.4793 1.95615 21.2919 1.64503C21.1046 1.3339 20.8344 1.0694 20.5057 0.875177C20.177 0.680951 19.8 0.563047 19.4083 0.532004L17.4516 0.379004C13.1587 0.0412272 8.84123 0.0412272 4.5483 0.379004L2.59164 0.532004C2.19994 0.563047 1.82289 0.680951 1.49419 0.875177C1.16549 1.0694 0.895385 1.3339 0.708009 1.64503C0.520633 1.95615 0.421828 2.30422 0.420425 2.6581C0.419022 3.01199 0.515066 3.36068 0.69997 3.673C2.74344 7.1249 5.48089 10.2056 8.7733 12.7585L9.08497 13L8.7733 13.2415C5.48056 15.7953 2.74309 18.877 0.69997 22.33C0.515434 22.6423 0.419687 22.9908 0.421277 23.3445C0.422868 23.6982 0.521745 24.046 0.709083 24.3569C0.896422 24.6678 1.16639 24.9322 1.49488 25.1263C1.82338 25.3204 2.20018 25.4384 2.59164 25.4695L4.5483 25.6225C8.84164 25.9615 13.1583 25.9615 17.4516 25.6225L19.4083 25.4695C19.7998 25.4384 20.1766 25.3204 20.5051 25.1263C20.8336 24.9322 21.1035 24.6678 21.2909 24.3569C21.4782 24.046 21.5771 23.6982 21.5787 23.3445C21.5803 22.9908 21.4845 22.6423 21.3 22.33C19.2567 18.8776 16.5192 15.7964 13.2266 13.243L12.915 13ZM11.0066 11.509L11.01 11.506L11.595 11.053C14.6062 8.71793 17.1181 5.90727 19.0066 2.7595L17.2333 2.62C13.0857 2.29367 8.91428 2.29367 4.76664 2.62L2.99164 2.7595C4.88057 5.90791 7.39296 8.7191 10.405 11.0545L10.9883 11.5075C10.9899 11.5082 10.9916 11.5087 10.9933 11.509H11C11.0022 11.5094 11.0044 11.5094 11.0066 11.509ZM11.01 14.494L11.0066 14.491H11C10.9978 14.4906 10.9955 14.4906 10.9933 14.491L10.9883 14.494L10.405 14.947C7.39299 17.2824 4.8806 20.0936 2.99164 23.242L4.76497 23.38C8.91497 23.707 13.0866 23.707 17.2333 23.38L19.0066 23.2405C17.1182 20.0922 14.6064 17.281 11.595 14.9455L11.01 14.494Z" fill="black"/>

        </svg>

            <span className="ttooltiptext" >Timer</span>


    </div>




        <div className="svgContainerIcon ttooltip showOptions-sixthStep" onClick={()=>moveRight()} style={{ backgroundColor:showStopWatch? "rgba(145, 83, 206, 0.25)" :"white" }}>
    <svg style={{ width:"25px" , height:"25px"}} viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.375 3.125V0.375H16.625V3.125H8.375ZM11.125 18.25H13.875V10H11.125V18.25ZM12.5 29.25C10.8042 29.25 9.2055 28.9237 7.704 28.271C6.2025 27.6183 4.89075 26.7301 3.76875 25.6063C2.64583 24.4833 1.75804 23.1711 1.10538 21.6696C0.452708 20.1681 0.125917 18.5699 0.125 16.875C0.125 15.1792 0.451792 13.5805 1.10538 12.079C1.75896 10.5775 2.64675 9.26575 3.76875 8.14375C4.89167 7.02083 6.20387 6.13304 7.70537 5.48037C9.20687 4.82771 10.8051 4.50092 12.5 4.5C13.9208 4.5 15.2844 4.72917 16.5906 5.1875C17.8969 5.64583 19.1229 6.31042 20.2687 7.18125L22.1937 5.25625L24.1188 7.18125L22.1937 9.10625C23.0646 10.2521 23.7292 11.4781 24.1875 12.7844C24.6458 14.0906 24.875 15.4542 24.875 16.875C24.875 18.5708 24.5482 20.1695 23.8946 21.671C23.241 23.1725 22.3533 24.4843 21.2313 25.6063C20.1083 26.7292 18.7961 27.6174 17.2946 28.271C15.7931 28.9246 14.1949 29.2509 12.5 29.25ZM12.5 26.5C15.1583 26.5 17.4271 25.5604 19.3063 23.6813C21.1854 21.8021 22.125 19.5333 22.125 16.875C22.125 14.2167 21.1854 11.9479 19.3063 10.0688C17.4271 8.18958 15.1583 7.25 12.5 7.25C9.84167 7.25 7.57292 8.18958 5.69375 10.0688C3.81458 11.9479 2.875 14.2167 2.875 16.875C2.875 19.5333 3.81458 21.8021 5.69375 23.6813C7.57292 25.5604 9.84167 26.5 12.5 26.5Z" fill="black"/>
</svg>
<span className="ttooltiptext" >StopWatch</span>



         </div>
    </div>






<div className="darkShadow svgContainer showOptions-fifthStep">
        <div className="svgContainerIcon  ttooltip"  style={{ backgroundColor: scrollMode ?"rgba(145, 83, 206, 0.25)" : "white"}}
        onClick={()=>
            {
                setScrollMode( true ) ; 
             }  } >
   
    
   <svg style={{margin:"0" , width:"20px" , height:"20px" , }}    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 6.25C7 5.836 7.334 5.5 7.747 5.5H13.753C14.166 5.5 14.5 5.836 14.5 6.25C14.5 6.664 14.166 7 13.753 7H7.747C7.64869 6.99987 7.55136 6.98036 7.4606 6.94258C7.36983 6.90481 7.2874 6.84951 7.21802 6.77986C7.14864 6.7102 7.09368 6.62755 7.05627 6.53663C7.01886 6.44571 6.99974 6.34831 7 6.25ZM7.747 14.5C7.64869 14.5001 7.55136 14.5196 7.4606 14.5574C7.36983 14.5952 7.2874 14.6505 7.21802 14.7201C7.14864 14.7898 7.09368 14.8725 7.05627 14.9634C7.01886 15.0543 6.99974 15.1517 7 15.25C7 15.664 7.334 16 7.747 16H13.753C13.8513 15.9999 13.9486 15.9804 14.0394 15.9426C14.1302 15.9048 14.2126 15.8495 14.282 15.7799C14.3514 15.7102 14.4063 15.6275 14.4437 15.5366C14.4811 15.4457 14.5003 15.3483 14.5 15.25C14.5003 15.1517 14.4811 15.0543 14.4437 14.9634C14.4063 14.8725 14.3514 14.7898 14.282 14.7201C14.2126 14.6505 14.1302 14.5952 14.0394 14.5574C13.9486 14.5196 13.8513 14.5001 13.753 14.5H7.747ZM7 10.75C7 10.336 7.334 10 7.747 10H13.753C14.166 10 14.5 10.336 14.5 10.75C14.5 11.164 14.166 11.5 13.753 11.5H7.747C7.64869 11.4999 7.55136 11.4804 7.4606 11.4426C7.36983 11.4048 7.2874 11.3495 7.21802 11.2799C7.14864 11.2102 7.09368 11.1275 7.05627 11.0366C7.01886 10.9457 6.99974 10.8483 7 10.75ZM4 4.25C4 3.65326 4.23705 3.08097 4.65901 2.65901C5.08097 2.23705 5.65326 2 6.25 2H15.25C15.8467 2 16.419 2.23705 16.841 2.65901C17.2629 3.08097 17.5 3.65326 17.5 4.25V17.25C17.5 17.8467 17.2629 18.419 16.841 18.841C16.419 19.2629 15.8467 19.5 15.25 19.5H6.25C5.65326 19.5 5.08097 19.2629 4.65901 18.841C4.23705 18.419 4 17.8467 4 17.25V4.25ZM5.504 4.173C5.50136 4.19858 5.50003 4.22428 5.5 4.25V17.25C5.5 17.664 5.836 18 6.25 18H15.25C15.4489 18 15.6397 17.921 15.7803 17.7803C15.921 17.6397 16 17.4489 16 17.25V4.25C16 4.05109 15.921 3.86032 15.7803 3.71967C15.6397 3.57902 15.4489 3.5 15.25 3.5H6.25C6.06443 3.50001 5.88544 3.56882 5.74765 3.69312C5.60986 3.81743 5.52305 3.98841 5.504 4.173ZM8.75 22C8.2846 22.0001 7.8306 21.856 7.45056 21.5873C7.07052 21.3187 6.78313 20.9388 6.628 20.5H15.25C16.112 20.5 16.9386 20.1576 17.5481 19.5481C18.1576 18.9386 18.5 18.112 18.5 17.25V8.937L19.34 9.777C19.763 10.2 20 10.772 20 11.369V17.25C20 17.8738 19.8771 18.4915 19.6384 19.0677C19.3997 19.644 19.0498 20.1677 18.6088 20.6088C18.1677 21.0498 17.644 21.3997 17.0677 21.6384C16.4915 21.8771 15.8738 22 15.25 22H8.75Z" fill="black"/>
</svg>

    <span className="ttooltiptext" >Scroll Mode</span>
        </div>

        <div className="svgContainerIcon  ttooltip"  style={{ backgroundColor:"rgba(145, 83, 206, 0.25)" }} >
            {/* <RectangleVertical/> */}
            

    <svg style={{width:"20px", height:"20px" , backgroundColor:"rgba(145, 83, 206, 0.25)"}}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.17208 16.818L7.75708 18.232L12.0001 22.475L16.2431 18.232L14.8281 16.818L12.0001 19.647L9.17208 16.818ZM14.8281 7.182L16.2431 5.768L12.0001 1.525L7.75708 5.768L9.17208 7.182L12.0001 4.354L14.8281 7.182Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9ZM12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11Z" fill="black"/>
</svg>





            {/* <span className="ttooltiptext" >Single Page</span> */}
        </div>
   
    </div>
     


    



{/* <div className="svgIcon darkShadow ttooltip  showOptions-firstStep" >
    <span className="ttooltiptext" >Scroll Mode</span>
    <GalleryHorizontal onClick={()=>setScrollMode(true)} />


</div> */}




    <div className="darkShadow svgContainer ">
        <div className="svgContainerIcon  ttooltip showOptions-fourthStep"  style={{ backgroundColor: !singlePageMode && !scrollMode ?"rgba(145, 83, 206, 0.25)" : "white"}}
        onClick={()=>
            {
                setSinglePageMode(false) ; 
                // alert(singlePageMode)
                // alert("got clicked ")
                setScrollMode( false ) ; 
               
                 }  } >
    {/* <Columns2/> */}
    
    <svg style={{margin:"0" , width:"50px" , height:"50px"}}  viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.69167 31.6667C6.925 31.6667 6.285 31.41 5.77167 30.8967C5.25722 30.3822 5 29.7417 5 28.975V11.025C5 10.2583 5.25722 9.61833 5.77167 9.105C6.285 8.59055 6.925 8.33333 7.69167 8.33333H32.3083C33.075 8.33333 33.715 8.59055 34.2283 9.105C34.7428 9.61833 35 10.2583 35 11.025V28.975C35 29.7417 34.7433 30.3817 34.23 30.895C33.7156 31.4094 33.075 31.6667 32.3083 31.6667H7.69167ZM7.69167 30H19.1667V10H7.69167C7.43611 10 7.20111 10.1067 6.98667 10.32C6.77333 10.5344 6.66667 10.7694 6.66667 11.025V28.975C6.66667 29.2306 6.77333 29.4656 6.98667 29.68C7.20111 29.8933 7.43611 30 7.69167 30ZM20.8333 30H32.3083C32.5639 30 32.7989 29.8933 33.0133 29.68C33.2267 29.4656 33.3333 29.2306 33.3333 28.975V11.025C33.3333 10.7694 33.2267 10.5344 33.0133 10.32C32.7989 10.1067 32.5639 10 32.3083 10H20.8333V30ZM9.80833 25.8333H16.025C16.2617 25.8333 16.46 25.7533 16.62 25.5933C16.7789 25.4333 16.8583 25.235 16.8583 24.9983C16.8583 24.7617 16.7789 24.5639 16.62 24.405C16.46 24.2461 16.2617 24.1667 16.025 24.1667H9.80833C9.57167 24.1667 9.37333 24.2467 9.21333 24.4067C9.05444 24.5667 8.975 24.765 8.975 25.0017C8.975 25.2383 9.05444 25.4361 9.21333 25.595C9.37333 25.7539 9.57167 25.8333 9.80833 25.8333ZM9.80833 20.8333H16.025C16.2617 20.8333 16.46 20.7533 16.62 20.5933C16.7789 20.4333 16.8583 20.235 16.8583 19.9983C16.8583 19.7617 16.7789 19.5639 16.62 19.405C16.46 19.2461 16.2617 19.1667 16.025 19.1667H9.80833C9.57167 19.1667 9.37333 19.2467 9.21333 19.4067C9.05444 19.5667 8.975 19.765 8.975 20.0017C8.975 20.2383 9.05444 20.4361 9.21333 20.595C9.37333 20.7539 9.57167 20.8333 9.80833 20.8333ZM9.80833 15.8333H16.025C16.2617 15.8333 16.46 15.7533 16.62 15.5933C16.7789 15.4333 16.8583 15.235 16.8583 14.9983C16.8583 14.7617 16.7789 14.5639 16.62 14.405C16.46 14.2461 16.2617 14.1667 16.025 14.1667H9.80833C9.57167 14.1667 9.37333 14.2467 9.21333 14.4067C9.05444 14.5667 8.975 14.765 8.975 15.0017C8.975 15.2383 9.05444 15.4361 9.21333 15.595C9.37333 15.7539 9.57167 15.8333 9.80833 15.8333ZM23.975 25.8333H30.1917C30.4283 25.8333 30.6267 25.7533 30.7867 25.5933C30.9456 25.4333 31.025 25.235 31.025 24.9983C31.025 24.7617 30.9456 24.5639 30.7867 24.405C30.6267 24.2461 30.4283 24.1667 30.1917 24.1667H23.975C23.7383 24.1667 23.54 24.2467 23.38 24.4067C23.2211 24.5667 23.1417 24.765 23.1417 25.0017C23.1417 25.2383 23.2211 25.4361 23.38 25.595C23.54 25.7539 23.7383 25.8333 23.975 25.8333ZM23.975 20.8333H30.1917C30.4283 20.8333 30.6267 20.7533 30.7867 20.5933C30.9456 20.4333 31.025 20.235 31.025 19.9983C31.025 19.7617 30.9456 19.5639 30.7867 19.405C30.6267 19.2461 30.4283 19.1667 30.1917 19.1667H23.975C23.7383 19.1667 23.54 19.2467 23.38 19.4067C23.2211 19.5667 23.1417 19.765 23.1417 20.0017C23.1417 20.2383 23.2211 20.4361 23.38 20.595C23.54 20.7539 23.7383 20.8333 23.975 20.8333ZM23.975 15.8333H30.1917C30.4283 15.8333 30.6267 15.7533 30.7867 15.5933C30.9456 15.4333 31.025 15.235 31.025 14.9983C31.025 14.7617 30.9456 14.5639 30.7867 14.405C30.6267 14.2461 30.4283 14.1667 30.1917 14.1667H23.975C23.7383 14.1667 23.54 14.2467 23.38 14.4067C23.2211 14.5667 23.1417 14.765 23.1417 15.0017C23.1417 15.2383 23.2211 15.4361 23.38 15.595C23.54 15.7539 23.7383 15.8333 23.975 15.8333Z" fill="black"/>
    </svg>

    <span className="ttooltiptext" >Two Pages</span>
        </div>

        <div className="svgContainerIcon  ttooltip showOptions-thirdStep"  style={{ backgroundColor: singlePageMode && !scrollMode ?"rgba(145, 83, 206, 0.25)" : "white"}} onClick={()=>
            {
                setScrollMode( false )
                setSinglePageMode(true) ; 
                }  } >
            {/* <RectangleVertical/> */}
            <svg style={{width:"20px", height:"20px"}} viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.18 7.984C13.4259 7.93948 13.6462 7.80451 13.7976 7.60566C13.9489 7.40682 14.0203 7.15851 13.9978 6.90964C13.9752 6.66077 13.8602 6.42938 13.6756 6.26102C13.4909 6.09266 13.2499 5.99954 13 6H7L6.82 6.016C6.57411 6.06052 6.35379 6.19549 6.20244 6.39434C6.05109 6.59318 5.97967 6.84149 6.00225 7.09036C6.02483 7.33923 6.13977 7.57062 6.32443 7.73898C6.5091 7.90734 6.75011 8.00046 7 8H13L13.18 7.984ZM14 14C14.0001 14.2341 13.9181 14.4607 13.7682 14.6405C13.6184 14.8203 13.4102 14.9419 13.18 14.984L13 15H7C6.75011 15.0005 6.5091 14.9073 6.32443 14.739C6.13977 14.5706 6.02483 14.3392 6.00225 14.0904C5.97967 13.8415 6.05109 13.5932 6.20244 13.3943C6.35379 13.1955 6.57411 13.0605 6.82 13.016L7 13H13C13.2652 13 13.5196 13.1054 13.7071 13.2929C13.8946 13.4804 14 13.7348 14 14ZM13.18 21.968C13.4259 21.9235 13.6462 21.7885 13.7976 21.5897C13.9489 21.3908 14.0203 21.1425 13.9978 20.8936C13.9752 20.6448 13.8602 20.4134 13.6756 20.245C13.4909 20.0767 13.2499 19.9835 13 19.984H7L6.82 20C6.57411 20.0445 6.35379 20.1795 6.20244 20.3783C6.05109 20.5772 5.97967 20.8255 6.00225 21.0744C6.02483 21.3232 6.13977 21.5546 6.32443 21.723C6.5091 21.8913 6.75011 21.9845 7 21.984H13L13.18 21.968ZM0 4C0 2.93913 0.421427 1.92172 1.17157 1.17157C1.92172 0.421427 2.93913 0 4 0H16C17.0609 0 18.0783 0.421427 18.8284 1.17157C19.5786 1.92172 20 2.93913 20 4V24C20 25.0609 19.5786 26.0783 18.8284 26.8284C18.0783 27.5786 17.0609 28 16 28H4C2.93913 28 1.92172 27.5786 1.17157 26.8284C0.421427 26.0783 0 25.0609 0 24V4ZM16 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H16C16.5304 26 17.0391 25.7893 17.4142 25.4142C17.7893 25.0391 18 24.5304 18 24V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2ZM13.18 7.984C13.4259 7.93948 13.6462 7.80451 13.7976 7.60566C13.9489 7.40682 14.0203 7.15851 13.9978 6.90964C13.9752 6.66077 13.8602 6.42938 13.6756 6.26102C13.4909 6.09266 13.2499 5.99954 13 6H7L6.82 6.016C6.57411 6.06052 6.35379 6.19549 6.20244 6.39434C6.05109 6.59318 5.97967 6.84149 6.00225 7.09036C6.02483 7.33923 6.13977 7.57062 6.32443 7.73898C6.5091 7.90734 6.75011 8.00046 7 8H13L13.18 7.984ZM14 14C14.0001 14.2341 13.9181 14.4607 13.7682 14.6405C13.6184 14.8203 13.4102 14.9419 13.18 14.984L13 15H7C6.75011 15.0005 6.5091 14.9073 6.32443 14.739C6.13977 14.5706 6.02483 14.3392 6.00225 14.0904C5.97967 13.8415 6.05109 13.5932 6.20244 13.3943C6.35379 13.1955 6.57411 13.0605 6.82 13.016L7 13H13C13.2652 13 13.5196 13.1054 13.7071 13.2929C13.8946 13.4804 14 13.7348 14 14ZM13.18 21.968C13.4259 21.9235 13.6462 21.7885 13.7976 21.5897C13.9489 21.3908 14.0203 21.1425 13.9978 20.8936C13.9752 20.6448 13.8602 20.4134 13.6756 20.245C13.4909 20.0767 13.2499 19.9835 13 19.984H7L6.82 20C6.57411 20.0445 6.35379 20.1795 6.20244 20.3783C6.05109 20.5772 5.97967 20.8255 6.00225 21.0744C6.02483 21.3232 6.13977 21.5546 6.32443 21.723C6.5091 21.8913 6.75011 21.9845 7 21.984H13L13.18 21.968Z" fill="black"/>
    </svg>





            <span className="ttooltiptext" >Single Page</span>
        </div>
    </div>
     




    {/* <div className="svgIcon darkShadow ttooltip"  style={{ backgroundColor: !singlePageMode ?"rgba(145, 83, 206, 0.25)" : "white"}}
     onClick={()=>
        {
            setScrollMode( false ) ; 
            setSinglePageMode(false) ;  }  } >
   <Columns2/>
   <span className="ttooltiptext" >Two Pages</span>
    </div> */}

  

    



<div onClick={()=>moveRight()}  className="svgIcon darkShadow ttooltip showOptions-secondStep">
    <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0V20H9.563L12.281 22.72L13.001 23.406L13.721 22.719L16.437 20H26V0H0ZM2 2H24V18H15.594L15.281 18.28L13 20.563L10.72 18.283L10.406 18.001H2V2ZM6 5V7H20V5H6ZM6 9V11H20V9H6ZM6 13V15H16V13H6Z" fill="black"/>
</svg>
<span className="ttooltiptext" >Messages</span>
    </div>

<div className="svgIcon darkShadow ttooltip jump showOptions-firstStep " style={{cursor : jumpToPage ? "auto" : "pointer" }} >
        
    { jumpToPage&& <>
        <input className="jumpToPage" type="number" value={jumpToPageNumber} onChange={(e)=> setJumpToPageNumber(e.target.value)}  />
{/*         
        <ArrowBigUp  
        style={{width:"20px" , height : "20px" , margin:"0" , marginTop:"5px"  , cursor :"pointer"}} 
        onClick={()=>goToPage()} /> */}
<svg style={{width:"20px" , height : "20px" , margin:"0" , marginTop:"5px"  , cursor :"pointer"}}  onClick={()=>goToPage()  } viewBox="0 0 31 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5 15.75C16.1852 15.75 16.8422 15.9871 17.3267 16.409C17.8112 16.831 18.0833 17.4033 18.0833 18C18.0833 18.5967 17.8112 19.169 17.3267 19.591C16.8422 20.0129 16.1852 20.25 15.5 20.25C14.8149 20.25 14.1578 20.0129 13.6733 19.591C13.1889 19.169 12.9167 18.5967 12.9167 18C12.9167 17.4033 13.1889 16.831 13.6733 16.409C14.1578 15.9871 14.8149 15.75 15.5 15.75ZM30.3025 9.9675L28.2488 17.7188L19.375 15.93L24.2833 13.2525C23.3583 11.9492 22.0653 10.8741 20.5277 10.1297C18.9901 9.38525 17.2592 8.99632 15.5 9C10.3979 9 6.16127 12.2175 5.32168 16.4587L2.7771 16.065C3.82335 10.7775 9.11918 6.75 15.5 6.75C20.1242 6.75 24.1929 8.87625 26.4792 12.06L30.3025 9.9675Z" fill="black"/>
</svg>


        {/* <svg  style={{width:"20px" , height : "20px" , margin:"0" , marginTop:"5px"  , cursor :"pointer"}} 
          onClick={()=>goToPage()}
           width="72" height="58" viewBox="0 0 72 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_575_79)">
        <rect x="4" width="64" height="50" rx="20" fill="#9153CE" fill-opacity="0.25" shape-rendering="crispEdges"/>
        </g>
        <defs>
        <filter id="filter0_d_575_79" x="0" y="0" width="72" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_575_79"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_575_79" result="shape"/>
        </filter>
        </defs>
        </svg> */}





    </> 
    
    
    
    } 


       { !jumpToPage && 
       <>
       {/* <svg width="72" height="58"  onClick={()=>jumpToPageChange()  } viewBox="0 0 72 58" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_575_79)">
<rect x="4" width="64" height="50" rx="20" fill="#9153CE" fill-opacity="0.25" shape-rendering="crispEdges"/>
</g>
<defs>
<filter id="filter0_d_575_79" x="0" y="0" width="72" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_575_79"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_575_79" result="shape"/>
</filter>
</defs>
</svg> */}




<svg style={{width:"30px" , height : "30px" , margin:"0" }} onClick={()=>jumpToPageChange()  } viewBox="0 0 31 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5 15.75C16.1852 15.75 16.8422 15.9871 17.3267 16.409C17.8112 16.831 18.0833 17.4033 18.0833 18C18.0833 18.5967 17.8112 19.169 17.3267 19.591C16.8422 20.0129 16.1852 20.25 15.5 20.25C14.8149 20.25 14.1578 20.0129 13.6733 19.591C13.1889 19.169 12.9167 18.5967 12.9167 18C12.9167 17.4033 13.1889 16.831 13.6733 16.409C14.1578 15.9871 14.8149 15.75 15.5 15.75ZM30.3025 9.9675L28.2488 17.7188L19.375 15.93L24.2833 13.2525C23.3583 11.9492 22.0653 10.8741 20.5277 10.1297C18.9901 9.38525 17.2592 8.99632 15.5 9C10.3979 9 6.16127 12.2175 5.32168 16.4587L2.7771 16.065C3.82335 10.7775 9.11918 6.75 15.5 6.75C20.1242 6.75 24.1929 8.87625 26.4792 12.06L30.3025 9.9675Z" fill="black"/>
</svg>

       {/* <ArrowBigUp style={{width:"30px" , height : "30px" , margin:"0" }} onClick={()=>
        

        jumpToPageChange()  
        
        }/> */}
        <span className="ttooltiptext" >Jump To Page</span> 
       </>
      
       
       
       } 
    </div>
</div>


)


}

export default ShowOptions