import React , {useState} from 'react'
import "../style/Login.css" ; 
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { setEmail , getEmail} from '../utils/emailSet';
const Login = () => {

    const [ loginEmail , setLoginEmail] = useState("") ;
    const [ loginPassword , setLoginPassword ] = useState("") ;

    const loginUser= (e)=>{
        e.preventDefault() ;
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log( user   ) ;
          setEmail(loginEmail)  ;
          const url = "http://localhost:3000/file" ; 
        //   window.open( url , "_self ")
        const temp = "wlcome" + getEmail() 
        console.log( temp )  ; 
        alert( temp  ) ; 
            
         
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert( " Error ocurred!! Try again later ")
          // ..
        });
    }

  return (
    <div>

<p id="title">Kindle</p>
    <div id="bbox">
        
        
            
            <form id="fform">
                <p>Log in to Kindle</p>
               
                <div  style={{width:"100%"}}>
                    <label>Enter Email </label>
                    <input  className="iinpt" type="text"/>
                </div>
                <div>
                    <label>Enter password  </label>
                    <input className="iinpt" type="text"/>
                </div>
                <button id="bbtn">LogIn</button>
                <p id="account">
                    <a href="#">Sign Up For Kindle </a>
                </p>
               
            </form>
    
    </div>

    </div>
   
  )
}

export default Login