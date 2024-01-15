import React, {useState} from 'react'

let obj = {}  ; 
const urlHelper = ( key , value  , num ) => {
  
  if( num === 1 ){
    console.log( key , value ) ; 
    obj[key] = value ; 
  }
  return obj  ;  
}

export default urlHelper