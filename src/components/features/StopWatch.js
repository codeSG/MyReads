import React from 'react';
// import 'boxicons';
import "./style/ClockMessage.css";
const StopWatch = () => {
  return (
    <div id="first">
    <p id="timer">STOP WATCH</p>
     <div id="clock">
         <input type="text" id="time" >
            
         </input>
         <p id="min">min</p>
         <div id="icons" >
         
         
     <box-icon  name='play-circle' ></box-icon>
     {/* <box-icon onClick={()=>pauseButton()}style={{ visibility: visible === "hidden" ? "visible" : "hidden" }} name={ isPause ?'pause-circle':'play-circle'}></box-icon> */}

         
         </div>
     </div>
 </div>
  )
}

export default StopWatch