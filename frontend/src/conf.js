const conf = {
  signupUrl: import.meta.env.VITE_SIGNUP_USER,
  loginUrl: import.meta.env.VITE_LOGIN_USER,
  googleAuth: import.meta.env.VITE_GOOGLE_USER,
  authMe: import.meta.env.VITE_AUTHME_URL,
  addCompletion: import.meta.env.VITE_COURSE_ADDTOCOMPLETION_URL,
  checkCompletion: import.meta.env.VITE_COURSE_CHECKCOMPLETION_URL,
  findUser : import.meta.env.VITE_FINDUSER_URL
};

const courseConf = {
  courseUrl: import.meta.env.VITE_COURSE_URL,
  lessonUrl: import.meta.env.VITE_LESSON_URL,
  getCoursesUrl: import.meta.env.VITE_GETCOURSE_URL,
  getCourseandLessonUrl: import.meta.env.VITE_GETCOURSE_LESSONS_URL,
  isPresent: import.meta.env.VITE_ISPRESENT_URL,
  addSubscription: import.meta.env.VITE_ADDSUBSCRIPTION_URL
};

export { conf, courseConf };
