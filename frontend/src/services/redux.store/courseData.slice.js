import { createSlice } from "@reduxjs/toolkit";

//inital state of course
const initialState = {
  allcourses: [],
};

const courseDataSlice = createSlice({
  name: "courseData",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const value = action.payload;
     state.allcourses = value;
    },
    deleteCourse: (state, action) => {
      const id = action.payload.id;
      const newSet = state.allcourses.filter((e) => {
        e.id == id;
      });
      state.allcourses.push(newSet);
    },
  },
});

export default courseDataSlice.reducer;
export const { addCourse, deleteCourse } = courseDataSlice.actions;
