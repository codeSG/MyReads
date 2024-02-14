import React , {useContext} from 'react'
import "../style/DeletePopup.css";
import {ContextInfo} from "../App";
const DeletePopup = ({deleteName , setBlack, deletePath,setDeletePath,deleteFile}) => {
  
  const {fileList, setFileList, originalFile, setOriginalFile} = useContext(ContextInfo)
  return (
    <div style={{ position:"fixed", 
    top:"0", left:"0", right:"0",bottom:"0",
     zIndex:"6" , width:"100%" , height:"fitContent" , display:"flex" , 
     justifyContent:"center" , alignItems:"center"}}
    >
    <div id="p1box">
        <p id="p1p">{`Are you sure, you want to Delete ${deleteName} !!`}  </p>
        <div id="p1dec">
            <button onClick={()=>{
              // if( deleteInd === -1 ) return ; 
              
              deleteFile(deletePath ) ; 
              setBlack(false);
              setDeletePath( 0) ; 
              setBlack(false);

            }}>Yes</button>
             <button onClick={()=>{
                setDeletePath( 0) ;  ; setBlack(false);
            }}> No</button>
        </div>
    </div>
    </div>
    
  )
}

export default DeletePopup ; 