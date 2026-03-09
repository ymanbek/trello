import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [
    {
      id: "1",
      title: "test board",
      backgroundColor: "#026AA7",
      createdAt: new Date().toISOString(),
    },
  ],
  currentBoard: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    createBoard: (state, action) => {
      const newBoard = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.boards.push(newBoard);
    },
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
  },
});

export const { createBoard, setCurrentBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
