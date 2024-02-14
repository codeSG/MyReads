import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function Spinner() {
  return (
    <div id="Spinner" style={{ position:"fixed", 
    top:"0", left:"0", right:"0",bottom:"0",
    opacity:"0.6" , zIndex:"6" , width:"100%" , height:"100%" , 
    display:"flex" , justifyContent:"center" , alignItems:"center" }}>
      <ClipLoader color="#52bfd9" size={100}/>
    </div>
  );
};

export default Spinner;