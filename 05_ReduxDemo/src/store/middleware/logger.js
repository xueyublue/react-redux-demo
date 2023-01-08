const logger = (param) => (store) => (next) => (action) => {
  if (param && param === "console") {
    // console.log("store", store);
    // console.log("next", next);
    console.log("action", action);
  }
  next(action);
};

export default logger;
