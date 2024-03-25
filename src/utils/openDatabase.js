async function openDatabase(databaseName, objectStoreName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(databaseName);

        request.onerror = function(event) {
            reject(new Error('Error opening database: ' + event.target.errorCode));
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        // This event is triggered only the first time a database is created
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            const objectStore = db.createObjectStore(objectStoreName, { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex("bookName", "bookName", { unique: false });
          console.log("Database upgrade needed");
            // You can create indexes if needed
            // objectStore.createIndex('fieldName', 'fieldName', { unique: false });
        };
    });
}
export default openDatabase; 