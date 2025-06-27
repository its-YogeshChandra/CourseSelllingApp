import { configureStore } from "@reduxjs/toolkit";
import dashbaordreducers from "../redux.store/instructor.slice"
    
export const store = configureStore({
    reducer: {
      dashboard: dashbaordreducers
  },
});


