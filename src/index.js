import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugAssignedToUser,
  bugRemoved,
  bugResolved,
  selectUnresolvedBugs,
  selectBugsByUser,
} from "./store/bugs";
import { userAdded } from "./store/users";
import { projectAdded } from "./store/projects";

// create store
const store = configureStore();

// subscribe store changes
// const unsubscribe = store.subscribe(() => {
//   console.log("Store changed:", store.getState());
// });

// dispatch actions
store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugResolved({ id: 1 }));

store.dispatch(projectAdded({ name: "Project 1" }));

store.dispatch(userAdded({ name: "User 1" }));

store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

// access to store state
// console.log(store.getState());

// !unscribe store changes, this is recommanded when UI is not active to prevent memory leak
// unsubscribe();

store.dispatch(bugRemoved({ id: 2 }));

// Use selectors
const unResolvedBugs = selectUnresolvedBugs(store.getState());
console.log("Unresolved Bugs", unResolvedBugs);

const userBugs = selectBugsByUser(1)(store.getState());
console.log("User Bugs", userBugs);
