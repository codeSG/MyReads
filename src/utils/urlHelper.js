import React, {useState} from 'react'

let obj = {}  ; 
const urlHelper = ( key , value  , num ) => {
  
  if( num === 1 ){
    console.log( key , value ) ; 
    obj[key] = value ; 
    console.log( "111" , obj ) ; 
  }
  return obj  ;  
}

export default urlHelper