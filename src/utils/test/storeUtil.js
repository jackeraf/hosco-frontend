import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../../store/reducers/reducer";
import thunk from "redux-thunk";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ != "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : fn => fn
  )
);

export default store;
