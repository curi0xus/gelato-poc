import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import {
  gelatoReducers,
  GELATO_PERSISTED_KEYS,
} from "@gelatonetwork/limit-orders-react";

import counterReducer from "../features/counter/counterSlice";
const PERSISTED_KEYS: string[] = [...GELATO_PERSISTED_KEYS];

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer, ...gelatoReducers },
    middleware: [save({ states: PERSISTED_KEYS, debounce: 1000 })],
    preloadedState: load({ states: PERSISTED_KEYS }),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
