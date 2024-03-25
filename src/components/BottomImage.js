import React  , {useContext} from 'react'

import "../css/BottomImage.css"
import goalsaathi from "../assets/goalsaathi.png"
import idea from "../assets/idea.png"
// import {Con}
// import { useContext } from 'react';
const BottomImage =  ( { setSendFeedBack  , setBlack  } ) => {

  
  
  return (
    <div id="bottomImages">
    <img src={goalsaathi} className='goalSaathi' />
    <div className="ideaDiv" onClick={()=> { setSendFeedBack( true ) ;  setBlack(true)}}>
      <img  src={idea} className="idea" />
    </div>
    </div>
  )
}

export default BottomImage ; 