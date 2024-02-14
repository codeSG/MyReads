import React, { useState } from 'react'
import "../style/SignUp.css"
import {  createUserWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { auth } from './firebase';
import obj from '../utils/emailSet';
import {sha256} from 'crypto-hash';
import { Link } from 'react-router-dom';

const Login  = () => {
  const { setEmail , getEmail} = obj ; 
    const [ registerEmail , setRegisterEmail] = useState("") ;
    const [ registerPassword , setRegisterPassword ] = useState("") ;

    const register= (e)=>{
      alert("11111111111111111"); 
      console.log( e ) ; 
        e.preventDefault() ;
       
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((userCredential) => {
          // Signed up 
          alert("2222222222222222")
          const user = userCredential.user;
          console.log( user   ) ;
          setEmail(registerEmail)  ;
          // const url = "http://localhost:3000/file" ;
          sha256(registerEmail )
        .then(hash => { 
          alert("333333333333333333")
          const pp = "the hash is " + hash ; 
          // alert(" Try to Login ") ; 
          const url = "http://localhost:3000/file/?id=" + hash ; 
          window.open(url, "_self")
        })
        .catch(e => console.log(e)); 
        //   window.open( url , "_self ")
        
        const temp = "wlcome" + getEmail() 
        console.log( temp )  ; 
        // alert( temp  ) ; 
            
         
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert( " Error ocurred!! Try again later ")
          // ..
        });
    }

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       // User is signed in, see docs for a list of available properties
    //       // https://firebase.google.com/docs/reference/js/auth.user
    //       const uid = user.uid;

    //       console.log( "11111",user) ;
    //       setEmail( user.email ) ;  
    //       console.log( "22222",auth) ;
    //       const mail = " welcome " + getEmail()  ; 
    //       // alert( mail ) ; 
    //       const url = "http://localhost:3000/file"

    //       sha256( user.email)
    //     .then(hash => { 
    //       const pp = "the hash is " + hash ; 
    //       // alert(" Try to Login ") ; 
    //       const url = "http://localhost:3000/file/?id=" + hash ; 
    //       window.open(url, "_self")
    //     })
    //     .catch(e => console.log(e));
    //       // window.open( url , "_self" );
    //         // alert("Error ocurred. Try again later "); 
    //       // ...
    //     } else {
    //       // User is signed out
    //       // ...
    //     }
    //   });


  return (
    <div id="outerMain">

<h1 id="title">Kindle</h1>
    <div id="box">
        
          <div id="innerBox">

          <img id="signupImage" src="https://www.hip-books.com/wp-content/uploads/2020/01/0443f79590506ede414d369f0a92012c_taking-notes-clipart_1300-1204.jpeg"/>
            <form id="form" onSubmit={register}>
                <h1>Create a new Account</h1>
                <p id="quick"> It's quick and easy </p>
                <div className="entry" id="mail" style={{ width:"100%" }}  >
                    <label>Enter Email </label>
                    <input className='inpt' type="text" required onChange={(e)=>setRegisterEmail(e.target.value)}/>
                </div>
                <div className="entry">
                    <label>Enter password  </label>
                    <input className='inpt' type="text" name="password" required
                    onChange={(e)=>setRegisterPassword(e.target.value )} />
                </div>

                <button id="btn" type="submit">SignUp</button>
                <p id="account">
                <Link to="/login">
                Already Have an Accont?
                </Link>
                    
                </p>
               
            </form>

          </div>
          
       
    </div>

    </div>
  )
}

export default Login