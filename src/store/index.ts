import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import showtimeApi, { showtimeReducer } from "@/apis/showtime";
import userApi, { userReducer } from "@/apis/auth";
import filmApi, { filmReducer } from "@/apis/films";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["film"],
};
const rootReducer = combineReducers({
  [filmApi.reducerPath]: filmReducer,
  [showtimeApi.reducerPath]: showtimeReducer,
  [userApi.reducerPath]: userReducer,
});
const middleware = [
  userApi.middleware,
  filmApi.middleware,
  showtimeApi.middleware,
];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default persistStore(store);
