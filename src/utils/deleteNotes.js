function deleteNotes(messageID ){
    const openDBRequest = indexedDB.open("BooksDatabase", 1);
  openDBRequest.onsuccess = function(event) {
      const db = event.target.result;
  
      const transaction = db.transaction("booksinformation", "readwrite");
      const objectStore = transaction.objectStore("booksinformation");
  
      const key = Number(sessionStorage.getItem("bookKey"));
  
      const getRequest = objectStore.get(key);
  
      getRequest.onsuccess = function(event) {
          const record = event.target.result;
         const recordArr =  record.notes ; 
        const tempRecordArr = recordArr.filter( ele => ele.messageID !== messageID ) ; 

         record.notes = [  ...tempRecordArr ]
          const updateRequest = objectStore.put(record);
  
          updateRequest.onsuccess = function(event) {
          };
  
          updateRequest.onerror = function(event) {
              console.error("Error updating total pages:", event.target.error);
          };
      };
  
      getRequest.onerror = function(event) {
          console.error("Error retrieving record:", event.target.error);
      };
  };


  }

  export default deleteNotes ; 