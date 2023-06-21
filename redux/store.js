import {configureStore, combineReducers} from "@reduxjs/toolkit";
import globalReducer from "./slice/GlobalSlice";

const rootReducer = combineReducers({
  globalReducer: globalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
