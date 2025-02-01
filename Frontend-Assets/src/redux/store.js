import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/userSlice.js";
import communityReducer from "./slices/communitySlice.js";

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    communities: communityReducer,
  },
});

const Persistor = persistStore(store);

export { Persistor };
export default store;
