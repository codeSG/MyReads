
import React , {useContext , useState  , useEffect} from "react";
import "../../css/UserName.css"
import openBook from  "../../assets/openBook.png"
import proceed from "../../assets/proceed.png"
import goalsaathi from "../../assets/goalsaathi.png"
import { ContextInfo } from "../../App";
const UserName = ({setBlack , setSpinner , nameDone , setNameDone })=>{


    const {userName , setUserName , wrapPageRuntour, setWrapPageRunTour ,
      firebaseFileFetched , setFirebaseFileFetched } = useContext(ContextInfo) ; 
    const [ name , setName] = useState("") ; 
   
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        // Perform an action when Enter key is pressed
        localStorage.setItem("userName" , name)
        setUserName(name);
        setNameDone(true) ; 
        // You can perform any action here like submitting the form, etc.
      }
    };
    return (
        <div id="_userName" > 
        
          <div className="userNameDiv1">
                <img src={openBook} />
                <div>
                    <p>Welcome To</p>
                    <h1>My Bookshelf</h1>
                </div>
          </div>
          <div className="userNameDiv2">
            <input onKeyDown={handleKeyDown} placeholder="Enter Your Name" value={name} onChange={e=> setName(e.target.value)} />
            <img  src={proceed} onClick={()=>{ 
               localStorage.setItem("userName" , name)
               setUserName(name);
               setNameDone(true) ; 
          
            // setUserName(null);
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