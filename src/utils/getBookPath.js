function getBookPath(bookID){
    // alert(bookID )
    if( !bookID || bookID === -1 ) return "/" ; 
    // if( arr.length === 0 ) return ""
    

    return `/file/showfile?bookID=${bookID}` ; 


  }

  export default getBookPath ; 