import openDatabase from "./openDatabase";
import readAllData from "./readAllData";
async function fetchDataFromIndexedDB(setBlack, setSpinner , setBookRecentlyViewed, setFileList, setOriginalFile , 
    userName , setFrequentBooks ) {
    try {
        const database = await openDatabase('BooksDatabase' , "booksinformation");
        const data = await readAllData(database, 'booksinformation');
        let bookEntries = new Array(data.length ) ; 
      console.log( bookEntries[0]) ; 
        for( let ind in  data ){
            const ele = data[ind] ; 
          let bookName = ele.bookName ; 
          bookName = bookName.replace(/.pdf/g, "") ;
          const bookInforMation = await fetch("https://www.googleapis.com/books/v1/volumes?q="+bookName) ; 
       console.log("bookInforMation",bookInforMation);
       const bookInforMationJson = await bookInforMation.json() ; 
       console.log("bookInforMationJson",bookInforMationJson);
       let cnt = 0 ;
       const bookObj = { ...ele } ; 
       bookInforMationJson.items =  bookInforMationJson.items ?  bookInforMationJson.items :[] ; 
       for( let bookentry of bookInforMationJson.items){
           if( bookentry.volumeInfo?.authors ){
            bookObj.bookAuthor  = bookentry.volumeInfo.authors[0] ;
               cnt++;
           }
           if( bookentry.volumeInfo?.categories ){
            bookObj.bookGenre  = bookentry.volumeInfo.categories[0] ;
               cnt++;
           }
           if( bookentry.volumeInfo?.imageLinks?.thumbnail ){
            bookObj.categories = bookentry.volumeInfo.categories;
               cnt++;
           }
           if( cnt === 3 ){
            bookEntries[ind] = bookObj ; 
            break ; 
           }
          
       }

       if( !bookObj.bookAuthor){
        bookObj.Author = "Anonyomus"  ; 
       }
       
       if( !bookObj.bookGenre){
        bookObj.bookGenre = "Anoyomus"  ; 
       }
       
       if( !bookObj.categories){
        bookObj.categories = []  ; 
       }

       if( cnt !== 3 ){
        bookEntries[ind] = bookObj ;
       }

    }
        setFileList( bookEntries ) ; 
        setOriginalFile( bookEntries )  ;
        if( userName !== null ) setBlack( false )  ;
         setSpinner( false ) ; 
        setBookRecentlyViewed( setFrequentBooks()) ; 
    } catch (error) {
        console.log( " errro occured ")
        console.error(error);
        setBlack( false )  ; 
        setSpinner( false ) ;
    }
}

export default fetchDataFromIndexedDB