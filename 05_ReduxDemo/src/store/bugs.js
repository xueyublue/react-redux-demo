import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const bugAddedHandler = (state, action) => {
  state.list.push({
    id: ++lastId,
    description: action.payload.description,
    resolved: false,
  });
};

const bugResolvedHandler = (state, action) => {
  const index = state.list.findIndex((bug) => bug.id === action.payload.id);
  state.list[index].resolved = true;
};

const bugRemovedHandler = (state, action) => {
  const index = state.list.findIndex((bug) => bug.id === action.payload.id);
  state.list.splice(index, 1);
};

const bugAssignedToUserHandler = (state, action) => {
  const { bugId, userId } = action.payload;
  const index = state.list.findIndex((bug) => bug.id === bugId);
  state.list[index].userId = userId;
};

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAdded: bugAddedHandler,
    bugResolved: bugResolvedHandler,
    bugRemoved: bugRemovedHandler,
    bugAssignedToUser: bugAssignedToUserHandler,
  },
});

export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser } = slice.actions;

export default slice.reducer;

// Selectors
// export const selectUnresolvedBugs = (state) => state.entities.bugs.filter((bug) => !bug.resolved);

// Better approach to use selector - better performance
export const selectUnresolvedBugs = createSelector(
  (state) => state.entities.bugs.list,
  (bugs) => bugs.filter((bug) => !bug.resolved) // this method will never been executed if [bugs] not changed
);

export const selectBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs.list,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

// !option 2
// // Action creators
// export const bugAdded = createAction("bugAdded");
// export const bugResolved = createAction("bugResolved");
// export const bugRemoved = createAction("bugRemoved");

// // Reducer
// let lastId = 0;

// export default createReducer([], {
//   [bugAdded.type]: (state, action) => {
//     state.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },

//   [bugResolved.type]: (state, action) => {
//     const index = state.findIndex((bug) => bug.id === action.payload.id);
//     state[index].resolvedd = true;
//   },

//   [bugRemoved.type]: (state, action) => {},
// });

// !option 1: immutable approach
// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];
//     case bugRemoved.type:
//       return state.filter((bug) => bug.id != action.payload.id);
//     case bugResolved.type:
//       return state.map((bug) => (bug.id !== action.payload.id ? bug : { ...bug, resolved: true }));
//     default:
//       return state;
//   }
// }
