import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      state[index].resolved = true;
    },
    bugRemoved: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

export const { bugAdded, bugResolved, bugRemoved } = slice.actions;

export default slice.reducer;

// Selectors
export const selectUnresolvedBugs = (state) => state.entities.bugs.filter((bug) => !bug.resolved);

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
