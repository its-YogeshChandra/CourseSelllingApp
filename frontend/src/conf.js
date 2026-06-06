const conf = {
  signupUrl: import.meta.env.VITE_SIGNUP_USER,
  loginUrl: import.meta.env.VITE_LOGIN_USER,
  googleAuth: import.meta.env.VITE_GOOGLE_USER,
  authMe: import.meta.env.VITE_AUTHME_URL,
  addCompletion: import.meta.env.VITE_COURSE_ADDTOCOMPLETION_URL,
  checkCompletion: import.meta.env.VITE_COURSE_CHECKCOMPLETION_URL,
  findUser: import.meta.env.VITE_FINDUSER_URL,
  updatePassword: import.meta.env.VITE_UPDATEPASSWORD_URL,
  updateProfile: import.meta.env.VITE_UPDATEPROFILE_URL,
  logoutUrl: import.meta.env.VITE_LOGOUT_USER,
  createInstructor: import.meta.env.VITE_CREATEINSTRUCTOR_URL,
};

const courseConf = {
  courseUrl: import.meta.env.VITE_COURSE_URL,
  lessonUrl: import.meta.env.VITE_LESSON_URL,
  getCoursesUrl: import.meta.env.VITE_GETCOURSE_URL,
  getInstructorCoursesUrl: import.meta.env.VITE_GETINSTRUCTOR_COURSES_URL,
  getCourseandLessonUrl: import.meta.env.VITE_GETCOURSE_LESSONS_URL,
  isPresent: import.meta.env.VITE_ISPRESENT_URL,
  addSubscription: import.meta.env.VITE_ADDSUBSCRIPTION_URL,
  cloudname: import.meta.env.VITE_CLOUDNAME,
  uploadPreset: import.meta.env.VITE_UPLOADPRESET,
};

export { conf, courseConf };
