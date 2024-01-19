import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import contentSlice from "./contentSlice";


const reducers = combineReducers({
content:contentSlice
});

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);
const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
