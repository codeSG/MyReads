function updateCurrentPageOfBook(){
    const openDBRequest = indexedDB.open("BooksDatabase", 1);
  
    const pageNo = Number( sessionStorage.getItem("currentPage")) ; 
    const totalPageOfBook = Number( sessionStorage.getItem("totalPage"))
  
  openDBRequest.onsuccess = function(event) {
      const db = event.target.result;
  
      const transaction = db.transaction("booksinformation", "readwrite");
      const objectStore = transaction.objectStore("booksinformation");
  
      const key = Number(sessionStorage.getItem("bookKey"));
  
      const getRequest = objectStore.get(key);
  
      getRequest.onsuccess = function(event) {
          const record = event.target.result;
  
          // Modify the total page count
          record.currentPage = pageNo; // Assuming totalPages is the new total page count
  
          record.totalPage = totalPageOfBook ; 
          // Update the record in the object store
          const updateRequest = objectStore.put(record);
  
          updateRequest.onsuccess = function(event) {
              console.log("Total pages updated successfully");
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

  export default updateCurrentPageOfBook ;