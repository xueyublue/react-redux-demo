import axios from "axios";

const api =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== "apiCallBegan") {
      return next(action);
    }
    // this is to make sure apiCallBegan action show in redux dev tool
    next(action);
    const { url, method, data, onSuccess, onError } = action.payload;
    axios
      .request({
        baseURL: "http://localhost:9004/api",
        url,
        method,
        data,
      })
      .then((res) => dispatch({ type: onSuccess, payload: res.data }))
      .catch((err) => dispatch({ type: onError, payload: err.message }));
  };

export default api;
