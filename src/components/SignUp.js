import React, { useState } from 'react'
import "../style/SignUp.css"
import {  createUserWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { auth } from './firebase';
import { setEmail , getEmail} from '../utils/emailSet';
const Login  = () => {
    const [ registerEmail , setRegisterEmail] = useState("") ;
    const [ registerPassword , setRegisterPassword ] = useState("") ;

    const register= (e)=>{
        e.preventDefault() ;
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log( user   ) ;
          setEmail(registerEmail)  ;
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

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;

          console.log( "11111",user) ;
          setEmail( user.email ) ;  
          console.log( "22222",auth) ;
          const mail = " welcome " + getEmail()  ; 
          alert( mail ) ; 

          // ...
        } else {
          // User is signed out
          // ...
        }
      });


  return (
    <div>

<p id="title">Kindle</p>
    <div id="box">
        

            <img src="https://www.hip-books.com/wp-content/uploads/2020/01/0443f79590506ede414d369f0a92012c_taking-notes-clipart_1300-1204.jpeg"/>
            <form id="form" onSubmit={(e)=>(register(e))}>
                <h1>Create a new Account</h1>
                <p>It's quick and easy </p>
                <div  style={{ width:"100%" }}  >
                    <label>Enter Email </label>
                    <input className='inpt' type="text" required onChange={(e)=>setRegisterEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Enter password  </label>
                    <input className='inpt' type="text" name="password" required
                    onChange={(e)=>setRegisterPassword(e.target.value )} />
                </div>
                <button id="btn" type="submit">SignUp</button>
                <p id="account">
                    <a href="#">Alrady Have an Accont?</a>
                </p>
               
            </form>
       
    </div>

    </div>
  )
}

export default Login