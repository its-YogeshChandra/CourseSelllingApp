import axios from "axios";
import { courseConf, conf } from "../conf";
const {
  courseUrl,
  lessonUrl,
  getCoursesUrl,
  getCourseandLessonUrl,
  isPresent,
  addSubscription,
  cloudname,
  uploadPreset
} = courseConf;

const { addCompletion, checkCompletion } = conf;

export class courseAction {
  async uploadCourse(course) {
    //changes in data
    //#1 seperating course object
    const { lessons } = course;
    delete course.lessons;
    // Media files are already processed and uploaded to Cloudinary
    // by modifiedObject() in impfunctions.js — lesson data now contains
    // URLs ({title, url} objects), not File objects.

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

      //#4 updating lessondata with courseid and send metadata to backend:
      // Lesson data already has Cloudinary URLs (video, videoChunks, image, notes)
      // so we send plain JSON instead of multipart/form-data.
      const courseId = val.data._id;
      const values = lessons.map(async (lesson) => {
        lesson.courseRef = courseId;
        const response = await axios.post(lessonUrl, lesson);
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
      throw error;
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
        console.log(response);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error.response.data;
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

  // function to adccourseCompletion
  async addcourseCompletion(data) {
    try {
      const response = await axios.post(addCompletion, {
        ...data,
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

  // function to check courseCompletion
  async checkcourseCompletion(data) {
    try {
      const response = await axios.post(checkCompletion, {
        ...data,
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
 
  async uploadToMediaBucket(mediaFile, fileName, resourceType = "auto", contentRange, uploadId) {
    const url = `https://api.cloudinary.com/v1_1/${cloudname}/${resourceType}/upload`;
   const formData = new FormData();
   formData.append('file', mediaFile, fileName);
   formData.append('upload_preset', uploadPreset);
  
   try {
    const headers = { 'Content-Type': 'multipart/form-data' };

    // Only add chunked upload headers when provided
    if (uploadId) headers['X-Unique-Upload-ID'] = uploadId;
    if (contentRange) headers['Content-Range'] = contentRange;

    const response = await axios.post(url, formData, {
      headers,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload Progress (${fileName}): ${percentCompleted}%`);
      }
    });

    // Axios automatically parses the JSON response into 'data'
    //has to clear once api get checked 
    console.log(`Successfully uploaded: ${response.data.secure_url}`);
    return response.data.secure_url; 

  } catch (error) {
    // Axios puts server error responses inside error.response
    console.error("Cloudinary upload error:", error.response?.data || error.message);
    throw error;
  }
}
}
const courseServices = new courseAction();

export { courseServices };
