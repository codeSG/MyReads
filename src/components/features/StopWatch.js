import React , { useState }from 'react';
// import 'boxicons';
import "./style/ClockMessage.css";
// import "./style/ClockMessage.css"

import {Play} from "lucide-react"
import {PauseCircle } from "lucide-react";


const StopWatch = () => {

  const [timer, setTimer ] = useState(0) ; 
  const[ timeInterval , setTimeInterval ] = useState(null) ; 

  function playButton(){
    setIsPause( true ) ; 
    const timeId = setInterval(() => {
      setTimer(prev => ( prev+1)%5940 );
  }, 1000);
  // 
  setTimeInterval(timeId)

  }

  function pauseButton(){
    // setRead(true) ; 
    // setRead(true) ;
    setIsPause( false ) ; 
    clearTimeout( timeInterval )
     
  }

  function getProperTime(){

  
    // let time = timer
    let a = Math.floor(timer/60) ; 
    a = a<=9 ? "0" + a : a ; 
    let b = timer%60 ; 
    b = b <= 9 ? "0"+b : b ; 
    let c = a + ":" + b ; 
    return c ; 

}




  const [ isPause , setIsPause] = useState( false) ; 
  return(
    <div className="first">
       <p className="timer">STOPWATCH</p>
        <div id="clock">
            <input type="text" className="time" value={ getProperTime()}   readOnly={true}   />
               
            
            <p id="min">min</p>
            <div id="icons" >
            
           
            
            {
                isPause ?  <PauseCircle onClick={()=>pauseButton()} className='innerIcon' /> :
                 <Play onClick={()=>playButton()} className='innerIcon'/> 
            }
            
            
            </div>
        </div>
    </div>
  )
}

export default StopWatch