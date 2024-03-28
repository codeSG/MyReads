function moveToPreviousPage(singlePageMode,pageMovement){

    if( singlePageMode ){
      let num = Number( sessionStorage.getItem("currentPage")) ; 
      num = num === 1 ? num : num-1 ; 
      sessionStorage.setItem("currentPage" , num ) ; 
      if( num ===1 ) return ; 
      pageMovement(  num) ; 

    }else{
      let num = Number( sessionStorage.getItem("currentPage")) ; 
  
      num = num === 1 ? num : num-2 ; 
      sessionStorage.setItem("currentPage" , num ) ; 
      if( num ===1 ) return ; 
      pageMovement(  num) ; 
    }
   
  }
  export default moveToPreviousPage ; 