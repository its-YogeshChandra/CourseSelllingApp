import { isElementAccessChain } from "typescript";
import localStorageService from "../localStorage";

const name = "CourseCompletionData";
const createCourseCompletionDataObject = () => {
  // create an empty array
  const courseCompleted = [];
  localStorageService.setinStorage(name, courseCompleted);
};

const updateCompletion = (courseId, lessonId, datatype, dataTypeId) => {
  const courseCompleted = localStorageService.getfromStorage(
    "CourseCompletionData"
  );
 const finalVal = {
  courseId : null,
  completedItems: null
 }
  // if there is no object at all
  if (!courseCompleted) createCourseCompletionDataObject();

  const data = localStorageService.getfromStorage(name);

  // find the data in array
  const neededData = data.filter((element) => element.courseId === courseId)[0];
    
  //if neededData exist then
  if (neededData) {
    // check for the lessonId
    const lessonOperation = (data, lessonId, datatype, dataTypeId) => {
      const lessondata = data.completedItems.filter(
        (element) => element.lessonId === lessonId
      );

      if (lessondata) {
        //check if datatype and dataTypeId is present
        const isPresent = lessondata[0].dataType.filter(
          (element) => element === dataTypeId
        );
       if(isPresent){
        const val =  lessondata.dataType.filter(
          (element) => element !== dataTypeId
        );
      const newLessonVal =  lessondata.datatype
       }else{
        
       }

      }
      
    };
  }
};
// else

export { updateCompletion };
