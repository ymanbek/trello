import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: {},
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { listId, title } = action.payload;
      if (!state.cards[listId]) {
        state.cards[listId] = [];
      }
      const newCard = {
        id: Date.now().toString(),
        title,
      };
      state.cards[listId].push(newCard);
    },
    deleteCard: (state, action) => {
      const { listId, cardId } = action.payload;
      state.cards[listId] = state.cards[listId].filter(
        (card) => card.id !== cardId
      );
    },
    updateCard: (state, action) => {
      const { listId, cardId, updates } = action.payload;
      const card = state.cards[listId]?.find((c) => c.id === cardId);
      if (card) {
        Object.assign(card, updates);
      }
    },
    moveCard: (state, action) => {
      const { fromListId, toListId, cardId } = action.payload;

      const card = state.cards[fromListId]?.find((c) => c.id === cardId);
      if (!card) return;

      state.cards[fromListId] = state.cards[fromListId].filter(
        (c) => c.id !== cardId
      );

      if (!state.cards[toListId]) {
        state.cards[toListId] = [];
      }
      state.cards[toListId].push(card);
    },
  },
});

export const { addCard, deleteCard, updateCard, moveCard } = cardsSlice.actions;
export default cardsSlice.reducer;
