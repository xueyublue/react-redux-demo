import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
// import func from "./middleware/func";
import api from "./middleware/api";

export default function configureAppStore() {
  // option 1: to register customized middleware
  // return configureStore({ reducer, middleware: [logger("console"), func] });

  // option 2: to register customized middlware by using redux toolkit
  // redux toolkit bu default providing functionalities to dispatch function actions
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger("console"), api),
  });
}
