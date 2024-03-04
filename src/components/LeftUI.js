import React , {useContext, useEffect, useState , useRef} from 'react'
import "../style/BetterFile.css"
import AddFile from './features/AddFile'
 import {ContextInfo}  from "../App"
import Calendar from './features/Calendar'
import { Link } from 'react-router-dom';
import bookImageSubstitue from "../image/bookImageSubstitue.jpg"
import CanvasComponent from './CanvasComponent'
import FrequentCanvasComponent from './FrequentCanvasComponent' ; 
import { Pencil , Check} from 'lucide-react';
const temp = new Date() ; 
const month = temp.getMonth() ; 
const year = temp.getFullYear() ; 
const currDate=temp.getDate() ; 
let numberOfDays = new Date(year, month+1, 0).getDate();
let monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
let currentDate = new Date();

currentDate.setDate(1);

let firstDayOfWeek = currentDate.getDay();
const LeftUI = () => {
    const [ enterName , setEnterName] = useState( true ) ;  
    const [ userName , setUserName] = useState("") ; 
    
    const inputNameRef = useState(null) ; 
    const {calendarEntry , setCalendarEntry, bookRecentlyViewed, setBookRecentlyViewed, originalFile, setOriginalFile } = useContext(ContextInfo)
    function getImageLink(bookID){
        if( !bookID || bookID === -1 ) return bookImageSubstitue ; 
  
        let arr = originalFile.filter( ele => ele.id === bookID ) ; 
        if( arr.length === 0 ) return bookImageSubstitue;
        return arr[0].bookImageLink ; 
      }
      function getBookAuthor(bookID){
        if( !bookID || bookID === -1 ) return "" ; 
  
        let arr = originalFile.filter( ele => ele.id === bookID ) ; 
        if( arr.length === 0 ) return ""
        return arr[0].bookAuthor ;
      }
      function getBookName(bookID){
        if( !bookID || bookID === -1 ) return "" ; 
  
        let arr = originalFile.filter( ele => ele.id === bookID ) ; 
        if( arr.length === 0 ) return ""
        return arr[0].bookName ;
      }
      function getBookPath(bookID){
        // alert(bookID )
        if( !bookID || bookID === -1 ) return "/" ; 
        // if( arr.length === 0 ) return ""
  
        return `/file/showfile?bookID=${bookID}` ; 
  
  
      }
  useEffect(()=>{
    let val = localStorage.getItem("userName") ;
    val = !val ? "" : val ; 
    setUserName( val )  ; 
  } , [] )
   if( !calendarEntry || calendarEntry.length===0) return <div></div>
    return (
        <div id="bookleft">
           <div id="name">

            {/* <input type="file" ></input> */}
           <svg width="40" height="40" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29 7C31.6522 7 34.1957 8.05357 36.0711 9.92893C37.9464 11.8043 39 14.3478 39 17C39 19.6522 37.9464 22.1957 36.0711 24.0711C34.1957 25.9464 31.6522 27 29 27C26.3478 27 23.8043 25.9464 21.9289 24.0711C20.0536 22.1957 19 19.6522 19 17C19 14.3478 20.0536 11.8043 21.9289 9.92893C23.8043 8.05357 26.3478 7 29 7ZM29 12C27.6739 12 26.4021 12.5268 25.4645 13.4645C24.5268 14.4021 24 15.6739 24 17C24 18.3261 24.5268 19.5979 25.4645 20.5355C26.4021 21.4732 27.6739 22 29 22C30.3261 22 31.5979 21.4732 32.5355 20.5355C33.4732 19.5979 34 18.3261 34 17C34 15.6739 33.4732 14.4021 32.5355 13.4645C31.5979 12.5268 30.3261 12 29 12ZM29 29.5C35.675 29.5 49 32.825 49 39.5V47H9V39.5C9 32.825 22.325 29.5 29 29.5ZM29 34.25C21.575 34.25 13.75 37.9 13.75 39.5V42.25H44.25V39.5C44.25 37.9 36.425 34.25 29 34.25Z" fill="black"/>
<circle cx="28.5" cy="28.5" r="28.5" fill="#9153CE" fill-opacity="0.25"/>
</svg>


            <div id="welcome">
                <p id="greeting">Greetings...</p>
                <input ref={inputNameRef} id="userName" placeholder='UserName' value={userName} onChange={(e)=>setUserName(e.target.value)} 
                autofocus="autofocus" readOnly={enterName} />
               { enterName &&  <Pencil onClick={()=>{setEnterName(false)
                    inputNameRef.current.focus() 
            
            }} /> }
               { !enterName && <Check  onClick={()=>{

                localStorage.setItem('userName' , userName  ) ; 
                setEnterName(true) ; 
               }}  /> }
                {/* <p id="userName">UserName</p> */}
            </div>
          
           </div>
           <div id="bookRead">
                <p id="bookName">{getBookName(bookRecentlyViewed[0])}</p>
                <p id="author">- {getBookAuthor(bookRecentlyViewed[0])}</p>
                
                    <div id="bookView">
                        <div className>
                        { (!bookRecentlyViewed[0] || bookRecentlyViewed[0] ===-1|| originalFile.length===0)?
                  <img src={bookImageSubstitue}  className='firstViewCanvas'/> :   
                  <FrequentCanvasComponent  bookID={bookRecentlyViewed[0]}  
                  bookImageSubstitue={bookImageSubstitue} 
                  bookClass={"firstViewCanvas"}
                  />}
                            {/* <CanvasComponent />
<img src={getImageLink(bookRecentlyViewed[0])} className="firstViewCanvas"/> */}
                        </div>
                        
                    </div>
                
                
                <Link to ={getBookPath(bookRecentlyViewed[0])} onClick={ ()=>{  if( getBookPath(bookRecentlyViewed[0]) ) sessionStorage.setItem("bookKey" , bookRecentlyViewed[0]) }}>
                            <p id="read"> 
                          {"Continue Reading >>"}
                          </p>
                      </Link> 
            </div>
            <p id="reading">READING TRACKER</p>
           <div id="ddateBox">
                <div id="yearAndMonth">  
                <p id="yearand">{monthNames[month]}</p>
                <p id="andmonth">{year}</p>
                 </div>
                <div id="bbookdate">
                    <label className="wweekDay">S</label>
                    <label className="wweekDay">M</label>
                    <label className="wweekDay">T</label>
                    <label className="wweekDay">W</label>
                    <label className="wweekDay">T</label>
                    <label className="wweekDay">F</label>
                    <label className="wweekDay">S</label>
                    {
                        new Array(firstDayOfWeek).fill(1).map((ele, ind)=>{
                            return <input className="wweekDay" style={{outline:"0"  , "visibility":"hidden"}} value={""} key={-ind} disabled={true}></input>
                        })
                    }
                    {
                        new Array(numberOfDays).fill(1).map((ele, ind)=>{
                            return < >
                                <input key={ind}type="checkbox" checked={ calendarEntry[ind].readToday  }>

                                </input>
                                <label key={-ind -1} className="checkbox-custom tooltip">
                                    {ind+1}
                                    <span className="tooltiptext">
                                        <label> Pages Read : {Object.keys(calendarEntry[ind].pagesRead).length  } </label>
                                        <label> Toal Minutes : {calendarEntry[ind].timeSpent}  </label>
                                       
                                         
                                    </span>
                                </label>
                               
                            </>
                        })
                    }

                   
                    
                 
            
                </div>
            </div>


        </div>

    )
}

export default LeftUI