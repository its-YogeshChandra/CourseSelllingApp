import { resolveConfig } from "vite";

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

const funcObj = {}
request.onsuccess = (e) => {
  const db = e.target.result;
  if (db) {
    return "Database opened successfully";
  }

  //creating crud methods of db

  //#1 addData
 const addData = (data) => {
    const tx = db.transaction("courses", "readwrite");
    const addtoStore = tx.objectStore("users");
    addtoStore.add(data);
    checkSucessandError(addData);
  };

  //#2 deletingData
  const deleteData = (id) => {
    const tx = db.transaction("courses", "readwrite");
    const deletefromStore = tx.objectStore("users");
    deletefromStore.delete(id);
    checkSucessandError(deleteData);
  };

  //#3 updating data


  funcObj.addData = addData;
  funcObj.deleteData = deleteData;
};


const checkSucessandError = (crudHandler) => {
  return new Promise((resolve, reject) => {
    const request = crudHandler();
    request.onsuccess = (e) => {
      const result = e.target.result;
      if (result) {
        switch (crudHandler.name) {
          case "addData":
            resolve("data successfully added ");
            break;
          case "deleteData":
            resolve("data successfully deleted ");
            break;
          default:
            break;
        }
      }
    };
    request.onerror = (e) => {
      const error = e.target.error;
      if (error) {
        switch (crudHandler.name) {
          case "addData":
            reject("data additon unsucessfull");
            break;
          case "deleteData":
            reject("data deletion unsccessfull");
            break;
          default:
            break;
        }
      }
    };
  });
};

export { funcObj };