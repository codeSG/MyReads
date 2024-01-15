import React from 'react'
import { Link } from 'react-router-dom'
import {dustbin} from "../utils/imageLink"

const FileCard = ({ind, ele }) => {
  return (
        <div key={ind} style={{ width:"320px"  , padding:"8px", margin:"8px" , 
        flexGrow:"1" , boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" , 
        borderRadius:"10px"}}>
            <div>
            <iframe  src={ele.url} width='100%' height='250px' 
            ></iframe>
            </div>
            <div id="inner" style={{width:"100%" , display:"flex",
            justifyContent:"space-around" , paddingTop:"10px"}}>
                <Link to={`/showfile/?url=${ind}`} style={{width:"45%" }}>
                <button style={{ width:"100%" , height:"100%" , 
                backgroundColor: "#1877f2",color:"white" ,
                fontSize:"20px" , borderRadius:"10px", padding:"5px",border:"0"}}>View File</button>
                </Link>
                {/* <img src={dustbin} style={{width:"35px" , height:"35px"} } /> */}
                <button style={{width:"45%"  , 
                backgroundColor:"#CCCCCC", fontSize:"20px" , borderRadius:"10px",
                padding:"5px", border:"0"

                }}>Delete File</button>

            </div>
           
        
            
            

        </div>

                        


   
  )
}

export default FileCard