function getBookPath(bookID){
    if( !bookID || bookID === -1 ) return "/" ; 
    return `/file/showfile?bookID=${bookID}` ; 


  }

  export default getBookPath ; 