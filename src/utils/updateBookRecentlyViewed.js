function readBook(newID ){
    if( !localStorage.getItem("bookID1")){
        localStorage.setItem("bookID1" , -1  ) ; 
        localStorage.setItem("bookID2" , -1  ) ; 
        localStorage.setItem("bookID3" , -1  ) ; 
        localStorage.setItem("bookID4" , -1  ) ; 

        console.log("")
    }

    let bookID1 = Number(localStorage.getItem("bookID1")) ;
    let bookID2 = Number(localStorage.getItem("bookID2")) ; 
    let bookID3 = Number(localStorage.getItem("bookID3")) ;
    let bookID4 = Number(localStorage.getItem("bookID4")) ;

    console.log( "from where the zero is cminfg ",  bookID1,bookID2,bookID3,bookID4)
let arr = [] ; 
    if( bookID1 === -1 ){

        localStorage.setItem("bookID1" ,  newID ) ; 
        localStorage.setItem("bookID2" , newID  ) ; 
        localStorage.setItem("bookID3" , newID  ) ; 
        localStorage.setItem("bookID4" , newID ) ; 
        arr = [ newID,newID,newID,newID] ; 
    }else if( newID === bookID1 ){
        
        localStorage.setItem("bookID1" ,  bookID1 ) ; 
        localStorage.setItem("bookID2" , bookID2  ) ; 
        localStorage.setItem("bookID3" , bookID3  ) ; 
        localStorage.setItem("bookID4" , bookID4 ) ; 
        arr = [ bookID1,bookID2,bookID3,bookID4]
    }else if( newID === bookID2 ){
        localStorage.setItem("bookID1" ,  bookID2 ) ; 
        localStorage.setItem("bookID2" , bookID1  ) ; 
        localStorage.setItem("bookID3" , bookID3  ) ; 
        localStorage.setItem("bookID4" , bookID4 ) ; 
        arr = [ bookID2,bookID1,bookID3,bookID4]
    }else if( newID === bookID3 ){
        localStorage.setItem("bookID1" ,  bookID3 ) ; 
        localStorage.setItem("bookID2" , bookID1  ) ; 
        localStorage.setItem("bookID3" , bookID2  ) ; 
        localStorage.setItem("bookID4" , bookID4 ) ; 
        arr = [ bookID3,bookID1,bookID2,bookID4]
    }else if( newID === bookID4 ){
        localStorage.setItem("bookID1" ,  bookID4 ) ; 
        localStorage.setItem("bookID2" , bookID1  ) ; 
        localStorage.setItem("bookID3" , bookID2  ) ; 
        localStorage.setItem("bookID4" , bookID3 ) ; 
        arr = [ bookID4,bookID1,bookID2,bookID3]
    }else{
       
            localStorage.setItem("bookID1" ,  newID  ) ; 
            localStorage.setItem("bookID2" , bookID1  ) ; 
            localStorage.setItem("bookID3" , bookID2  ) ; 
            localStorage.setItem("bookID4" , bookID3 ) ; 
            arr = [ newID , bookID1, bookID2, bookID3]
        
    }

    return arr ; 

}

export {readBook }