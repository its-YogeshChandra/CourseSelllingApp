import axios from "axios";
import { courseConf } from "../conf";

const { courseUrl, lessonUrl } = courseConf;

export class courseAction {
  async uploadCourse(course) {
    //changes in data
    //#1 seperating course object
    console.log(course);
    debugger;
    const lessons = course.lessons;
    delete course.lessons;

    //#2 sending data to backend
    try {
      const courseadd = async () => {
        const response = await axios.post(courseUrl, course, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      };

      //#3 receiving data from backend
      const val = await courseadd();

      //#4 updating lessondata with courseid and send data to backend(lessonhandler)
      const id = val.data._id;
      lessons.courseId = id
      const lessonResponse = await axios.post(lessonUrl, lessons, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      console.log(lessonResponse)
      debugger
     return lessonResponse

    } catch (error) {
      throw error;
    }
  }
}

const courseServices = new courseAction();

export { courseServices };
