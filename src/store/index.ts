import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import showtimeApi, { showtimeReducer } from "@/apis/showtime";
import userApi, { userReducer } from "@/apis/auth";
import filmApi, { filmReducer } from "@/apis/films";
import profileApi, { profileReducer } from "@/apis/user";
import showtimeSliceReducer from "@/slices/orderSlice";
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
import authReducer from "@/slices/authSlice";
import orderApi, { orderReducer } from "@/apis/order";
import vnpayApi, { vnpayReducer } from "@/apis/payment";
import optionApi, { optionReducer } from "@/apis/option";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth","showtimeOrder"],
};
const rootReducer = combineReducers({
  film: filmReducer,
  showtime: showtimeReducer,
  user: userReducer,
  auth: authReducer,
  order: orderReducer,
  profile: profileReducer,
  vnpay: vnpayReducer,
  showtimeOrder: showtimeSliceReducer,
  option: optionReducer,
});
const middleware = [
  userApi.middleware,
  filmApi.middleware,
  showtimeApi.middleware,
  orderApi.middleware,
  profileApi.middleware,
  vnpayApi.middleware,
  optionApi.middleware
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
