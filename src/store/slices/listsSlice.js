import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: {
    "main-board": [],
  },
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
      const { boardId, title } = action.payload;
      if (!state.lists[boardId]) {
        state.lists[boardId] = [];
      }
      const newList = {
        id: Date.now().toString(),
        title,
      };
      state.lists[boardId].push(newList);
    },
    deleteList: (state, action) => {
      const { boardId, listId } = action.payload;
      state.lists[boardId] = state.lists[boardId].filter(
        (list) => list.id !== listId
      );
    },
    updateListTitle: (state, action) => {
      const { boardId, listId, title } = action.payload;
      const list = state.lists[boardId].find((l) => l.id === listId);
      if (list) {
        list.title = title;
      }
    },
    reorderLists: (state, action) => {
      const { boardId, lists } = action.payload;
      state.lists[boardId] = lists;
    },
  },
});

export const { addList, deleteList, updateListTitle, reorderLists } =
  listsSlice.actions;
export default listsSlice.reducer;
