import { configureStore } from "@reduxjs/toolkit";
import dashbaordreducers from "../redux.store/instructor.slice.js"
import courseDataReducers from "../redux.store/courseData.slice.js"
    
export const store = configureStore({
    reducer: {
      instructorDashboard: dashbaordreducers,
      courseData: courseDataReducers
  },
});


