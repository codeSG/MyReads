import React  , {useContext} from 'react'
import "../css/Calendar.css"
import { ContextInfo } from '../App';

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

const Calendar = () => {

  const {calendarEntry } = useContext(ContextInfo)
  
  return (
    <div id="ddateBoxDiv" className="third-step">
    <p id="reading"  >READING TRACKER</p>
 <div id="ddateBox" >
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
                  return <input key={-ind-1}  className="wweekDay" style={{outline:"0"  , "visibility":"hidden"}} value={""} disabled={true}></input>
              })
          }
          {
              new Array(numberOfDays).fill(1).map((ele, ind)=>{
                  return < >
                      <input key={ind} type="checkbox" checked={ calendarEntry[ind].readToday  }>

                      </input>
                      <label key={-ind -1} className="checkbox-custom tooltip ">
                          {ind+1}
                          <span className="tooltiptext elevate" style={{backgroundColor:"red"}} >
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

export default Calendar