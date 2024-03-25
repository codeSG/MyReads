function moveToNextPage( singlePageMode,pageMovement ){

    // alert("hi11111111111")
    // alert(singlePageMode)
    // alert(" function moveToNextPage(){") ; 
        if( singlePageMode ){
          let num = Number( sessionStorage.getItem("currentPage")) ;
          const totalPages = Number( sessionStorage.getItem("totalPage"))
          if( num===totalPages) return  ;
         
          num = num+ 1 ; 
          sessionStorage.setItem("currentPage" , num ) ; 
          // updateCurrentPageOfBook() ; 
        
          // alert( num )
          pageMovement( num) ;
    
        }
        
        if( !singlePageMode) {
          // alert("hi")
          // alert("    if( !singlePageMode) {") ; 
          let num = Number( sessionStorage.getItem("currentPage")) ;
          const totalPages = Number( sessionStorage.getItem("totalPage")) ;
          if( num >= totalPages-1  ) return  ;
        
          num =  num+ 2 ; 
          sessionStorage.setItem("currentPage" , num ) ; 
          // updateCurrentPageOfBook() ; 
          
          // alert( num )
          pageMovement( num) ; 
        }
        
      
      }

      export default moveToNextPage ; 