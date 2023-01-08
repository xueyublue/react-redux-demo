import configureAppStore from "../configureStore";
import { addBug } from "../bugs";

describe("bugsSlice", () => {
  it("should handle the addBug action", () => {
    const store = configureAppStore();
    const bug = { description: "a" };
    store.dispatch(addBug(bug));
    console.log(store.getState());
  });
});
