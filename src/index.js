import configureStore from "./store/configureStore";
import { bugAdded, bugRemoved, bugResolved, selectUnresolvedBugs } from "./store/bugs";

// create store
const store = configureStore();

// subscribe store changes
const unsubscribe = store.subscribe(() => {
  console.log("Store changed:", store.getState());
});

// dispatch actions
store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugResolved({ id: 1 }));

// access to store state
// console.log(store.getState());

// !unscribe store changes, this is recommanded when UI is not active to prevent memory leak
// unsubscribe();

store.dispatch(bugRemoved({ id: 1 }));

// Use selectors
const unResolvedBugs = selectUnresolvedBugs(store.getState());
console.log("Unresolved Bugs", unResolvedBugs);
