import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from "./actions";

// subscribe store changes
const unsubscribe = store.subscribe(() => {
  console.log("Store changed:", store.getState());
});

// dispatch action
store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugResolved(1));

// access to store state
// console.log(store.getState());

// !unscribe store changes, this is recommanded when UI is not active to prevent memory leak
// unsubscribe();

store.dispatch(bugRemoved(1));
