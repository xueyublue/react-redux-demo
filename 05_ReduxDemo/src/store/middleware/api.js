import axios from "axios";
import { apiCallBegan, apiCallSuccess, apiCallFailed } from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== apiCallBegan.type) {
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
      .then((res) => {
        dispatch(apiCallSuccess(res.data));
        if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
      })
      .catch((err) => {
        dispatch(apiCallFailed(err.message));
        if (onError) dispatch({ type: onError, payload: err.message });
      });
  };

export default api;
