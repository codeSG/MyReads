function moveToNextPage( singlePageMode,pageMovement ){

  // alert("Single page mode ") ; 
        if( singlePageMode ){
          let num = Number( sessionStorage.getItem("currentPage")) ;
          const totalPages = Number( sessionStorage.getItem("totalPage"))
          if( num===totalPages) return  ;
         
          num = num+ 1 ; 
          sessionStorage.setItem("currentPage" , num ) ; 
          pageMovement( num) ;
    
        }
        
        if( !singlePageMode) {

          // alert("not single page mode ")
          let num = Number( sessionStorage.getItem("currentPage")) ;
          const totalPages = Number( sessionStorage.getItem("totalPage")) ;
          if( num >= totalPages-1  ) return  ;
        
          num =  num+ 2 ; 
          sessionStorage.setItem("currentPage" , num ) ; 
          pageMovement( num) ; 
        }
        
      }

      export default moveToNextPage ; 