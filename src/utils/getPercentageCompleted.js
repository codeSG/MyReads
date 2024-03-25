function getPercentageCompleted(bookID, originalFile ){
    if( !bookID || bookID === -1 ) return 0 ;
    
    let arr = originalFile.filter( ele => ele.id === bookID ) ; 
    if( arr.length === 0 ) return 0 ;
    const a  = arr[0].currentPage ; 
    const b = arr[0].totalPage ; 
    if( a <=0 || b <=0  ) return 0 ; 
    
    const c = Math.ceil(  ( a/b)*100  ) ; 
    return c ;

  }

  export default getPercentageCompleted ; 