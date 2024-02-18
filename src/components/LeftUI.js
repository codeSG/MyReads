import React , {useContext} from 'react'
import "../style/BetterFile.css"
import AddFile from './features/AddFile'
 import {ContextInfo}  from "../App"
import Calendar from './features/Calendar'


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
    const {calendarEntry , setCalendarEntry } = useContext(ContextInfo)
   if( !calendarEntry || calendarEntry.length===0) return <div></div>
    return (
        <div id="bookleft">
           <div id="name">
            <div id="circle">

            </div>
            <div id="welcome">
                <p id="back">Welcome Back....</p>
                <p id="userName">UserName</p>
            </div>
          
           </div>
           <div id="bookRead">
                <p id="bookName">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto illum totam sit omnis saepe dolores quae quo deleniti, doloribus modi. Reprehenderit cumque molestiae debitis corporis vel vero adipisci modi doloremque!.</p>
                <p id="author">- Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias officiis atque laboriosam dolorem rerum fugiat soluta esse quo totam id.</p>
                <div id="bookLink">
                    <div id="bookView"></div>
                </div>
                <p id="read">{"Continue Reading>>"} </p>
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
                                <input key={ind}type="checkbox" checked={ calendarEntry[ind]}>

                                </input>
                                <label key={-ind -1} className="checkbox-custom">
                                    {ind+1}
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