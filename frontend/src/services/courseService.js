import axios from "axios";
import { courseConf } from "../conf";

const { courseUrl, lessonUrl } = courseConf;

export class courseAction {
  async uploadCourse(course) {
    //changes in data
    //#1 seperating course object
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
      const courseId = val.data._id;
      console.log(lessons);
      const dataArr = [];
      const totalData = lessons.map(async (e) => {
        e.courseId = courseId;
        const lessonResponse = await axios.post(lessonUrl, e);
        if (lessonResponse.data) {
          dataArr.push(lessonResponse.data);
        }
      });
      const totalval = await Promise.all(totalData);
      if (totalval) {
        console.log(dataArr);
      }
    } catch (error) {
      throw error;
    }
  }
}

const courseServices = new courseAction();

export { courseServices };
