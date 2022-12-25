import { combineReducers } from "redux";
import bugs from "./bugs";
import projects from "./projects";

export default combineReducers({
  bugs: bugs,
  projects: projects,
});
