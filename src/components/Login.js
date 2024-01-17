import React , {useState} from 'react'
import "../style/Login.css" ; 
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import obj  from '../utils/emailSet';
import {sha256} from 'crypto-hash';
import { Link } from 'react-router-dom';
const Login = () => {
  const { setEmail , getEmail} = obj ;
    const [ loginEmail , setLoginEmail] = useState("") ;
    const [ loginPassword , setLoginPassword ] = useState("") ;

    const loginUser= (e)=>{
        e.preventDefault() ;
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
          // Signed up 
        //   const user = userCredential.user;
        //   console.log( user   ) ;
        //   setEmail(loginEmail)  ;
        //   const url = "http://localhost:3000/file" ; 
        // //   window.open( url , "_self ")
        // const temp = "wlcome" + getEmail() 
        // console.log( temp )  ; 
        // alert( temp  ) ; 

        sha256(loginEmail )
        .then(hash => { 
          const pp = "the hash is " + hash ; 
          // alert(" Try to Login ") ; 
          const url = "http://localhost:3000/file/?id=" + hash ; 
          window.open(url, "_self")
        })
        .catch(e => console.log(e)); 
            
         
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
                    <Link to="/">
                    Sign Up For Kindle
                    </Link>
                    
                </p>
               
            </form>
    
    </div>

    </div>
   
  )
}

export default Login