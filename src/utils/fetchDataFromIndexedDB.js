import openDatabase from "./openDatabase";
import readAllData from "./readAllData";
async function fetchDataFromIndexedDB(setBlack, setSpinner , setBookRecentlyViewed, setFileList, setOriginalFile , 
    userName , setFrequentBooks ) {
    try {
        const database = await openDatabase('BooksDatabase' , "booksinformation");
        const data = await readAllData(database, 'booksinformation');
        console.log( " all the data from the daatabse " , data )  ; 
        let bookEntries = new Array(data.length ) ; 
      console.log( bookEntries[0]) ; 
        for( let ind in  data ){
            const ele = data[ind] ; 
          let bookName = ele.bookName ; 
          bookName = bookName.replace(/.pdf/g, "") ;

        //   console.log( " the bookName to be searched for i his " , bookName )

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
            // bookObj.bookImageLink  =  bookentry.volumeInfo.imageLinks.thumbnail ;
            bookObj.categories = bookentry.volumeInfo.categories;
               cnt++;
           }
          //  if( bookentry.volumeInfo?.description ){
          //   ans[ind].bookDescription = bookentry.volumeInfo.description ;
          //   cnt++;
          //   }
           if( cnt === 3 ){
            bookEntries[ind] = bookObj ; 

            console.log( " the book Obj for index " , ind , "is " , bookObj) ; 
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
      //  ans[ind].bookName = item.name.split(".pdf")[0] ; 


    }

        console.log('All data from object store:', data);
        console.log(" the book entry is " , bookEntries) ; 
        setFileList( bookEntries ) ; 
        console.log("bookEntries" ,bookEntries )
        setOriginalFile( bookEntries )  ;
        if( userName !== null ) setBlack( false )  ;
         
         setSpinner( false ) ; 

        setBookRecentlyViewed( setFrequentBooks()) ; 

        // console.log( "  1111111111book reecntly viewed are her e..." , bookRecentlyViewed ) ; 
        console.log( " 22222222222book reecntly viewed are her e..." , setFrequentBooks() ) ; 


        // setBook
    } catch (error) {
        console.log( " errro occured ")
        console.error(error);
        setBlack( false )  ; 
        setSpinner( false ) ;
    }
}

export default fetchDataFromIndexedDB