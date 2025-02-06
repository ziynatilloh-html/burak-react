import { HomePageState } from "./../lib/types/screen";
import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
} from "@reduxjs/toolkit";

export const store = configureStore({
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
