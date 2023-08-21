import { configureStore } from "@reduxjs/toolkit";
import demoSlice from "../features/demo/demoSlice";

export const store = configureStore({
  reducer: {
    demo: demoSlice,
  },
});
