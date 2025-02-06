import { HomePageState } from "./../lib/types/screen";
import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import reduxLogger from "redux-logger";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    //@ts-ignore
    getDefaultMiddleware().concat(reduxLogger),

  reducer: { homePage: HomePageReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
function HomePageReducer(state: unknown, action: AnyAction): unknown {
  throw new Error("Function not implemented.");
}
