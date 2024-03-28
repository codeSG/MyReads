import React , { useState , useEffect}from 'react';
import "../../css/ClockMessage.css";
import { Play, PauseCircle , Square} from "lucide-react";
const StopWatch = ({showStopWatch}) => {

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
    setIsPause( false ) ; 
    clearTimeout( timeInterval )
     
  }
  useEffect(()=>{

    return ()=>{
      clearTimeout( timeInterval );
    }
  } , [] )

  function squareResetButton(){
    setIsPause( false ) ; 
    clearTimeout( timeInterval ) ; 
    setTimer(0) ; 
  }

  function getProperTime(){
    let a = Math.floor(timer/60) ; 
    a = a<=9 ? "0" + a : a ; 
    let b = timer%60 ; 
    b = b <= 9 ? "0"+b : b ; 
    let c = a + ":" + b ; 
    return c ; 

}

  const [ isPause , setIsPause] = useState( false) ; 
  return(
    <div className="first" style={{display: showStopWatch ? 'block' : 'none'}}>
       <p className="timer">STOPWATCH</p>
        <div id="clock">
            <input type="text" className="time" value={ getProperTime()}   readOnly={true}   />

            <p id="min">min</p>
            <div id="icons" >
            
               <Square style={{visibility : isPause ? "hidden" :"visible" }}  className='innerIcon' onClick={()=>squareResetButton()}/>
               <PauseCircle style={{visibility : isPause ?"visible" :"hidden"}} onClick={()=>pauseButton()} className='innerIcon' /> 
               <Play style={{visibility : isPause ? "hidden" : "visible" }}  onClick={()=>playButton()} className='innerIcon'/>
            
            </div>
        </div>
    </div>
  )
}

export default StopWatch