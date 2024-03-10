
import React , {useContext , useState} from "react";
import "./style/UserName.css"
import openBook from  "../../image/openBook.png"
import proceed from "../../image/proceed.png"
import goalsaathi from "../../image/goalsaathi.png"
import { ContextInfo } from "../../App";
const UserName = ({setBlack })=>{

    const {userName , setUserName , wrapPageRuntour, setWrapPageRunTour } = useContext(ContextInfo) ; 
    const [ name , setName] = useState("") ; 
    return (
        <div id="_userName" > 
          <div className="userNameDiv1">
                <img src={openBook} />
                <div>
                    <p>Welcome To</p>
                    <h1>MyBookshelf</h1>
                </div>
          </div>
          <div className="userNameDiv2">
            <input placeholder="Enter Your Name" value={name} onChange={e=> setName(e.target.value)} />
            <img  src={proceed} onClick={()=>{ 
                localStorage.setItem("userName" , name)
                setUserName(name) ; setBlack(false) ; 
                setWrapPageRunTour( true) ; 
                } }/>

          </div>
          <div className="userNameDiv3">
            <p>Powered by</p>
            <img src={goalsaathi} />
          </div>
        
        </div>
    )
  
}

export default UserName ; 