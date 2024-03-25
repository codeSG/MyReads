async function readAllData(database, objectStoreName) {
    return new Promise((resolve, reject) => {
        const transaction = database.transaction(objectStoreName, 'readonly');
        const objectStore = transaction.objectStore(objectStoreName);

        const data = [];

        const cursorRequest = objectStore.openCursor();

        cursorRequest.onsuccess = function(event) {
            const cursor = event.target.result;

            if (cursor) {
                data.push(cursor.value);
                cursor.continue();
            } else {
                resolve(data);
            }
        };

        cursorRequest.onerror = function(event) {
            reject(new Error('Error opening cursor: ' + event.target.error));
        };
    });
}

export default readAllData