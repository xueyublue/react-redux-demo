import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugAssignedToUser,
  bugRemoved,
  bugResolved,
  selectUnresolvedBugs,
  selectBugsByUser,
  loadBugs,
} from "./store/bugs";
import { userAdded } from "./store/users";
import { projectAdded } from "./store/projects";

// create store
const store = configureStore();

// dispatch actions
store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugResolved({ id: 1 }));

store.dispatch(projectAdded({ name: "Project 1" }));

store.dispatch(userAdded({ name: "User 1" }));

store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

store.dispatch((dispatch, getState) => {
  dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
});

store.dispatch(bugRemoved({ id: 2 }));

// Use selectors
const unResolvedBugs = selectUnresolvedBugs(store.getState());
console.log("Unresolved Bugs", unResolvedBugs);

const userBugs = selectBugsByUser(1)(store.getState());
console.log("User Bugs", userBugs);

// load bugs via API call
store.dispatch(loadBugs());
setTimeout(() => {
  store.dispatch(loadBugs());
}, 2000);
