const conf = {
  signupUrl: import.meta.env.VITE_SIGNUP_USER,
  loginUrl: import.meta.env.VITE_LOGIN_USER,
  googleAuth: import.meta.env.VITE_GOOGLE_USER,
  authMe: import.meta.env.VITE_AUTHME_URL
};

const courseConf = {
  courseUrl: import.meta.env.VITE_COURSE_URL,
  lessonUrl: import.meta.env.VITE_LESSON_URL,
  getCoursesUrl: import.meta.env.VITE_GETCOURSE_URL,
  getCourseandLessonUrl: import.meta.env.VITE_GETCOURSE_LESSONS_URL,
  isPresent: import.meta.env.VITE_ISPRESENT_URL
};

export { conf, courseConf };
