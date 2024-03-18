
import React , {useContext , useState  , useEffect} from "react";
import "./style/UserName.css"
import openBook from  "../../image/openBook.png"
import proceed from "../../image/proceed.png"
import goalsaathi from "../../image/goalsaathi.png"
import { ContextInfo } from "../../App";
const UserName = ({setBlack , setSpinner , nameDone , setNameDone })=>{


    const {userName , setUserName , wrapPageRuntour, setWrapPageRunTour ,
      firebaseFileFetched , setFirebaseFileFetched } = useContext(ContextInfo) ; 
    const [ name , setName] = useState("") ; 
    // const [ nameDone , setNameDone] = useState( localStorage.getItem("userName") === "" ? true : localStorage.getItem("userName") ) ; 
    // useEffect(()=>{

    //   if( nameDone && firebaseFileFetched){
    //     setUserName(name);
    //     console.log( "nameDone && firebaseFileFetched ")
    //     setBlack(false) ; 
        
    //     setSpinner( false ) ; 
    //     setWrapPageRunTour( true) ; 
                
    //   }
    // } , [ nameDone ] ) ; 
  
    // useEffect(()=>{
    //   // if(firebaseFileFetched  && nameDone ) alert("  if( nameDone && firebaseFileFetched){ ")

    //   if( nameDone && firebaseFileFetched){
    //     localStorage.setItem("userName" , name)
    //     setUserName(name);
    //     setBlack(false) ; 
      
    //     setSpinner( false ) ; 
    //     setWrapPageRunTour( true) ; 
                
    //   }
    // } , [ firebaseFileFetched  , nameDone ] ) ; 

    // if( firebaseFileFetched && nameDone  ) {
    //   setUserName(name);
    //   console.log( "nameDone && firebaseFileFetched ")
    //   setBlack(false) ; 
      
    //   setSpinner( false ) ; 
    //   setWrapPageRunTour( true) ; 
    // }
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
                    <h1>My Book Shelf</h1>
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