import React from 'react'
import "../style/DeletePopup.css"
const DeletePopup = ({deleteName , setBlack, deleteInd, deleteFile,setDeletInd}) => {
  return (
    <div id="p1box">
        <p id="p1p">{`Are you sure, you want to Delete ${deleteName} !!`}  </p>
        <div id="p1dec">
            <button onClick={()=>{
              if( deleteInd === -1 ) return ; 
              deleteFile(deleteInd ) ; 
              setBlack(false);
            }}>Yes</button>
             <button onClick={()=>{
                setDeletInd(-1) ; setBlack(false);
            }}> No</button>
        </div>
    </div>
  )
}

export default DeletePopup ; 