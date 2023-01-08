import configureStore from "./store/configureStore";
import { selectUnresolvedBugs, selectBugsByUser, loadBugs, addBug, resolveBug, assignBugToUser } from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

// create store
const store = configureStore();
store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(userAdded({ name: "User 1" }));

// bugs CRUD via API call
store.dispatch(loadBugs());
setTimeout(() => {
  store.dispatch(loadBugs());
}, 2000);

setTimeout(() => {
  store.dispatch(resolveBug(1));
  store.dispatch(assignBugToUser(1, 2));
}, 2000);

// store.dispatch(addBug({ description: "New Bug" }));

// Use selectors
const unResolvedBugs = selectUnresolvedBugs(store.getState());
console.log("Unresolved Bugs", unResolvedBugs);

const userBugs = selectBugsByUser(1)(store.getState());
console.log("User Bugs", userBugs);
