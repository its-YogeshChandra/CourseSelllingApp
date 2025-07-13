const conf = {
  signupUrl: import.meta.env.VITE_SIGNUP_USER,
  loginUrl: import.meta.env.VITE_LOGIN_USER,
  googleAuth: import.meta.env.VITE_GOOGLE_USER,
};

const courseConf = {
  courseUrl : import.meta.env.VITE_COURSE_URL,
  lessonUrl : import.meta.env.VITE_LESSON_URL,
}
export { conf, courseConf };