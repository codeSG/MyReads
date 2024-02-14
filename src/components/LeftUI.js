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
           <div id="ddateBox">
                <p> SCHEDULED READING </p>
                <div id="bbookdate">
                    <label className="wweekDay">S</label>
                    <label className="weekDay">M</label>
                    <label className="weekDay">T</label>
                    <label className="weekDay">W</label>
                    <label className="weekDay">T</label>
                    <label className="weekDay">F</label>
                    <label className="weekDay">S</label>
                    {
                        new Array(firstDayOfWeek).fill(1).map((ele, ind)=>{
                            return <input style={{outline:"0"}} value={""} key={-ind} disabled={true}></input>
                        })
                    }
                    {
                        new Array(numberOfDays).fill(1).map((ele, ind)=>{
                            return <>
                                <input type="checkbox" checked={ calendarEntry[ind]}>

                                </input>
                                <label className="checkbox-custom">
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