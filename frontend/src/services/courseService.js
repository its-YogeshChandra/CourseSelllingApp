import axios from "axios";
import { courseConf } from "../conf";

const {
  courseUrl,
  lessonUrl,
  getCoursesUrl,
  getCourseandLessonUrl,
  isPresent,
  addSubscription
} = courseConf;

export class courseAction {
  async uploadCourse(course) {
    //changes in data
    //#1 seperating course object
    const { lessons } = course;
    delete course.lessons;
    const key = ["images", "videos", "notes"];
    lessons.map((lesson) => {
      key.forEach((key) => {
        if (lesson[key]) {
          if (Array.isArray(lesson[key])) {
            lesson[key] = lesson[key].map((e) => {
              console.log(e.files);
              return e.files;
            });
          }
        }
      });
    });

    //#2 sending course data to backend
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

      //#4 updating lessondata with courseid and send data to backend(lessonhandler) :
      const courseId = val.data._id;
      const values = lessons.map(async (lesson) => {
        //creating formData (#way to send nested multipart data into backend )
        const formData = new FormData();
        lesson.courseRef = courseId;
        for (let keypart in lesson) {
          if (
            keypart === "images" ||
            keypart === "videos" ||
            keypart === "notes"
          ) {
            lesson[keypart].map((file) => {
              formData.append(keypart, file);
            });
          } else {
            formData.append(keypart, lesson[keypart]);
          }
        }

        //sending data to backend
        const response = await axios.post(lessonUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response;
      });
      //waiting for all responses to collect
      const finalVal = await Promise.all(values);
      return finalVal;
    } catch (error) {
      throw error;
    }
  }

  //function for getting course Data
  async getCourseData() {
    const response = await axios.get(getCoursesUrl);
    if (response.data) {
      return response.data;
    }
  }

  //function to get both course and lesson data
  async getCourseandLessonData(data) {
    try {
      const response = await axios.get(getCourseandLessonUrl, {
        params: {
          id: data,
        },
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      throw error
    }
  }

  //function to check if student subscribed or not
  async isSubscribed(courseId, studentId) {
    try {
      const response = await axios.post(isPresent, {
        courseId,
        studentId,
      });
      if (response) {
      console.log(response)
        return response.data;
      }
    } catch (error) {
      console.log(error)
      return error.response.data
    } 
  }

  // function to add student to course
  async addStudentToCourse(courseId, studentId) {
    try {
      const response = await axios.post(addSubscription, {
        courseId,
        studentId,
      });
      if (response) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
}

const courseServices = new courseAction();

export { courseServices };
