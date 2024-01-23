import React from 'react'
import { Link } from 'react-router-dom'
import {dustbin} from "../utils/imageLink"
import "../style/FileCard.css"
const FileCard = ({ind, ele , deleteFile, setDeleteName, setBlack,setDeletInd,
  setFileName}) => {

  return (
        <div className="fileCard" key={ind} >
            <div class="frame">
            <iframe 
            id="iframe" src={ele.url} 
            ></iframe>
            </div>
            <div id="inner" >
                <Link id="link" to={`/file/showfile/?url=${ind}`} >
                <button class="View" 
                onClick={()=>setFileName(ele.name)}>
                View File
                </button>
                </Link>
                {/* <img src={dustbin} style={{width:"35px" , height:"35px"} } /> */}
                
                
                
                <button class="Delete" onClick={()=> {
                  setDeleteName(ele.name) ; 
                  setBlack( true ) ; 
                  setDeletInd(ele.path) ; 
                }}>Delete File</button>

            </div>
           
        
            
            

        </div>

                        


   
  )

}

export default FileCard