const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;


  let dataBaseCreated = true ; 
if (!indexedDB) {
    dataBaseCreated =false ; 
  console.log("IndexedDB could not be found in this browser.");
}

// 2
const request = indexedDB.open("BooksDatabase", 1);

export default {"dataBaseCreated" : dataBaseCreated , "request" : request }