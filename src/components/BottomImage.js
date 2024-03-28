import React   from 'react'

import "../css/BottomImage.css"
import goalsaathi from "../assets/goalsaathi.png"
import idea from "../assets/idea.png"
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