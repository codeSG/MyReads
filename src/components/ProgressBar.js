

const ProgressBar = ( { outerDiv , innerDiv1 , innerDiv2 , progressWidth })=>{
return ( 

    <div className={outerDiv}>
                      <div className={innerDiv1} style={{width:`${progressWidth }%`}}></div>
                      <div className={innerDiv2}></div>
                      <label>{`${  progressWidth }%`}</label>
    </div>
)
} ; 
  export default  ProgressBar; 