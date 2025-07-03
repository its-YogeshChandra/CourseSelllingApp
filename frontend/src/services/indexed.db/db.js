const request = indexedDB.open("instructorDashboardDb", 1);
let db;

request.onupgradeneeded = (event) => {
  db = event.target.result;

  // creating a object store
  const objectStore = db.createObjectStore("courses", {
    keyPath: "id",
    autoIncrement: true,
  });

  // creating an index
  objectStore.createIndex("id", "id", { unique: true });
  console.log("Object store created");
};

const dbinitialzed = new Promise((resolve, reject) => {
  request.onsuccess = (e) => {
    db = e.target.result;
    resolve(db);
    return;
  };
  request.onerror = (e) => {
    if (e.target.error) {
      reject("unsuccessfull");
    }
  };
});

//creating crud methods of db

//#1 addData
const addData = async (data) => {
  const isDb = await dbinitialzed;
  if (isDb) {
    const tx = db.transaction("courses", "readwrite");
    const addtoStore = tx.objectStore("courses");
    const request = addtoStore.add(data);
    return checkSucessandError(request, "addData");
  }
};

//#2 deletingData
const deleteData = (id) => {
  const tx = db.transaction("courses", "readwrite");
  const deletefromStore = tx.objectStore("courses");
  const request = deletefromStore.delete(id);
  checkSucessandError(request, "deleteData");
};

//#3 get data
const getData = (id) => {
  if (!db) {
    throw new Error("db initialization unsuccessfull");
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction("courses", "readonly");
    const store = tx.objectStore("courses");
    const result = id ? store.get(id) : store.getAll();

    result.onsuccess = () => {
      resolve(result.result);
    };

    result.onerror = () => {
      reject("error while getting data");
    };
  });
};

//updateCourse : {contains 2 seperate functions}

//for adding lessons
const addlesson = (courseId, lessonData) => {
  if (!db) {
    throw new Error("db initialization unsuccessfull");
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction("courses", "readwrite");
    const getfromStore = tx.objectStore("courses");
    const request = getfromStore.get(courseId);
    request.onsuccess = (e) => {
      const course = e.target.result;

      course.lesson = [...course.lesson, lessonData];
      //can use course.lesson.concat(lessonData);
      const updatetheStore = getfromStore.update(course);
      updatetheStore.onsuccess = () => {
        resolve("lesson sucessfully added ");
      };
    };
    request.onerror = () => {
      reject("error occured while adding lesson");
    };
  });
};

//for updating lessons
const updatelesson = (courseId, lessonId, lessonData) => {
  if (!db) {
    throw new Error("db initialization unsuccessfull");
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction("courses", "readwrite");
    const getfromStore = tx.objectStore("courses");
    const request = getfromStore.get(courseId);
    request.onsuccess = (e) => {
      const course = e.target.result;
      course.lessons = course.lessons.filter((e) => e.id !== lessonId);
      course.lessons = [...course.lessons, lessonData];
      const updatetheStore = getfromStore.update(course);
      updatetheStore.onsuccess = (e) => {
        resolve("lesson successfully updated");
      };
    };
    request.onerror = () => {
      reject("error while updating the lesson");
    };
  });
};

const checkSucessandError = (request, action) => {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      switch (action) {
        case "addData":
          resolve("data successfully added ");
          break;
        case "deleteData":
          resolve("data successfully deleted ");
          break;
        default:
          break;
      }
    };

    request.onerror = () => {
      switch (action) {
        case "addData":
          reject("data additon unsucessfull");
          break;
        case "deleteData":
          reject("data deletion unsccessfull");
          break;
        default:
          break;
      }
    };
  });
};

export { addData, deleteData, getData, addlesson, updatelesson };
