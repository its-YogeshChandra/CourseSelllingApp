const request = indexedDB.open("instructorDashboardDb", 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // creating a object store
  const objectStore = db.createObjectStore("courses", {
    keyPath: "id",
    autoIncrement: true,
  });

  // creating an index
  objectStore.createIndex("id", "id", { unique: true });
  console.log("Object store created");
};

request.onsuccess = (e) => {
  const db = e.target.result;
  if (db) {
    return "Database opened successfully";
  }

  if (db) {
    //creating crud methods of db

    //#1 addData
    const addData = (data) => {
      const tx = db.transaction("courses", "readwrite");
      const addtoStore = tx.objectStore("users");
      addtoStore.add(data);
     }
    

    //#2 deletingData
    const deleteData = () => {
      const tx = db.transaction("courses", "readwrite");
      const deletefromStore = tx.objectStore("users");
      deletefromStore.delete(id);
    }
  
    //#3 updating data 
    

  }
};

request.onerror = (error) => {
  return error;
};
