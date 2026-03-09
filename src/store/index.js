import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import boardsReducer from "./slices/boardsSlice";
import listsReducer from "./slices/listsSlice";
import cardsReducer from "./slices/cardsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
  },
});
