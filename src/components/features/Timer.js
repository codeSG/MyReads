import React , { useState, useEffect }from 'react';
// import 'boxicons';
import "./style/ClockMessage.css";
// import "./style/ClockMessage.css"

import {Play,  PauseCircle , Square} from "lucide-react"


const Timer = ({moveRight , showStopWatch}) => {

    const [timer, setTimer ] = useState(25*60) ; 
   const [ isPause , setIsPause] = useState( true ) ; 
   const [visible, setVisible] = useState("visible") ; 
  const [read, setRead] = useState( false  ) ; 
  const[ timeInterval , setTimeInterval ] = useState(null) ;
    function playButton(){
        
        if( timer === 0 || timer === -1 ) return ;
        setRead(true) ; 
        setVisible( prev=> prev==='visible' ? "hidden":"visible")
       
            const timeId = setInterval(() => {
                setTimer(prev => prev === 0 ? prev : prev - 1);
            }, 1000);
            // 
            setTimeInterval(timeId)

    }
    function squareButton(){
        setTimer(0) ; 
        setVisible( prev=> prev==='visible' ? "hidden":"visible")
        clearInterval(timeInterval ) ; 
        // timeInterval = false ; 
        setRead( false  ) ; 
        // setVisible(prev=>{return prev==="visible" ?"hidden" : "visible"}) ;

    }
    
    function pauseButton(){
        // setRead(false) ; 
        if( isPause){
            clearInterval(timeInterval ) ; 
            setIsPause( false ) ; 
        }else{
            const timeId = setInterval(() => {
                setTimer(prev => prev === 0 ? prev : prev - 1);
            }, 1000);
            // 
            setTimeInterval(timeId);
            setIsPause( true  ) ; 
            

        }
        
    }
    if( timer === 10  ) moveRight() ; 

    if( timer === 0 ){


        setTimer(-1) ; 
        setRead(false)
        clearInterval(timeInterval ) ; 
        setVisible("visible");
        
    }

    function getProperTime(){

        if( !read ){
            // alert(!read)
            return timer/60;
        }
        // let time = timer
        let a = Math.floor(timer/60) ; 
        a = a<=9 ? "0" + a : a ; 
        let b = timer%60 ; 
        b = b <= 9 ? "0"+b : b ; 
        let c = a + ":" + b ; 
        return c ; 

    }

   

    function getProperTimeFormat( clockValue ){

        let clockVal = Number(clockValue) ; 
        // alert(clockVal) ; 
        if( !clockVal ){
            // alert()
            setTimer( 0 ) ; 
            return ; 
        }
        // if( clockVal < 0 ){

        // }
        setTimer( Number(clockValue.substring(0,2) ) * 60 )
    }


    useEffect(()=>{

        return ()=>{
            clearInterval(timeInterval ) ; 
        }
    } , [] )


    return (
    
    <div className="timerFirst"  style={{display: !showStopWatch ? 'block' : 'none'}}>
    <p className="timer">TIMER</p>
     <div id="clock">
         <input type="text" className="time" value={timer === -1 ? 0 : getProperTime()}  onChange={e => { getProperTimeFormat(e.target.value)   } }  readOnly={read}   />
            
         
         <p id="min">min</p>
         <div id="icons" >
         
         <Square className='innerIcon' onClick={()=>squareButton()} style={{ visibility: visible === "hidden" ? "visible" : "hidden" }} />
         {/* <box-icon onClick={()=>squareButton()} className='innerIcon' style={{ visibility: visible === "hidden" ? "visible" : "hidden" }} ></box-icon> */}
          <Play onClick={()=>playButton()} className='innerIcon' style={{ visibility: visible }}/>
     {/* <box-icon onClick={()=>pauseButton()} className='innerIcon' style={{ visibility: visible === "hidden" ? "visible" : "hidden" }} name={ isPause ?'pause-circle':'play-circle'}></box-icon> */}
         {
             isPause ?  <PauseCircle onClick={()=>pauseButton()} className='innerIcon'  style={{ visibility: visible === "hidden" ? "visible" : "hidden" }}/> :
              <Play onClick={()=>pauseButton()} className='innerIcon'  style={{ visibility: visible === "hidden" ? "visible" : "hidden" }}/> 
         }
         
         
         </div>
     </div>
 </div>)
}

export default Timer