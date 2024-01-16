import React from 'react'
import "../style/DeletePopup.css"
const DeletePopup = ({deleteName , setBlack, setDeletInd}) => {
  return (
    <div id="p1box">
        <p id="p1p">{`Are you sure, you want to Delete ${deleteName} !!`}  </p>
        <div id="p1dec">
            <button>Yes</button> <button onClick={()=>{
                setDeletInd(-1) ; setBlack(false);
            }}> No</button>
        </div>
    </div>
  )
}

export default DeletePopup ; 