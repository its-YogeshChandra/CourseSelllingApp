const request = indexedDB.open("CourseCompletionDB", 1);
let db;

request.onupgradeneeded = (event) => {
  db = event.target.result;

  // creating a object store
  const objectStore = db.createObjectStore("lessons", {
    keyPath: "id",
  });

  objectStore.onsuccess = () => {
    return "store successfully created ";
  };

  objectStore.onerror = () => {
    return "store creation failed  ";
  };
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
    console.log(data);
    const tx = db.transaction("lessons", "readwrite");
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
const getData = () => {
  if (!db) {
    throw new Error("db initialization unsuccessfull");
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction("courses", "readonly");
    const store = tx.objectStore("courses");
    const result = store.getAll();

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
const addlesson = (lessonData, courseId) => {
  if (!db) {
    throw new Error("db initialization unsuccessfull");
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction("courses", "readwrite");
    const getfromStore = tx.objectStore("courses");
    const request = getfromStore.getAll();
    request.onsuccess = (e) => {
      console.log(lessonData);
      const val = e.target.result.filter((e) => e.id === courseId);
      const course = val[0];
      course.lessons = [...course.lessons, lessonData];
      //can use course.lesson.concat(lessonData);
      const updatetheStore = getfromStore.put(course);
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
    const request = getfromStore.getAll();
    request.onsuccess = (e) => {
      const val = e.target.result.filter((e) => e.id === courseId);
      const course = val[0];
      course.lessons = course.lessons.filter((e) => e.id !== lessonId);
      course.lessons = [...course.lessons, lessonData];
      const updatetheStore = getfromStore.put(course);
      updatetheStore.onsuccess = (e) => {
        resolve("lesson successfully updated");
      };
    };
    request.onerror = () => {
      reject("error while updating the lesson");
    };
  });
};
const deleteLesson = (courseId, lessonId) => {
  if (!db) {
    throw new Error("db initialization unsuccessfull");
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction("courses", "readwrite");
    const getfromStore = tx.objectStore("courses");
    const request = getfromStore.getAll();
    request.onsuccess = (e) => {
      const val = e.target.result.filter((e) => e.id === courseId);
      const course = val[0];
      console.log(course);
      course.lessons = course.lessons.filter((e) => e.id !== lessonId);
      const updatetheStore = getfromStore.put(course);
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

export { addData, deleteData, getData, addlesson, updatelesson, deleteLesson};
