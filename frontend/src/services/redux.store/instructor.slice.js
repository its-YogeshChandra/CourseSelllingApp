import { createSlice } from "@reduxjs/toolkit";

//inital state of course
const initialState = {
  allcourses: [],
};

const instructorDashboardSlice = createSlice({
  name: "instructorDashboard",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const value = action.payload;
      state.allcourses.push[{ ...data, value }];
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

export default instructorDashboardSlice.reducer
export const {addCourse, deleteCourse} = instructorDashboardSlice.actions