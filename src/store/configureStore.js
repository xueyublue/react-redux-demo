import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";

export default function configureAppStore() {
  // option 1: to register customized middleware
  // return configureStore({ reducer, middleware: [logger("console"), func] });

  // option 2: to register customized middlware by using redux toolkit
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger("console")),
  });
}
