import { useContext, useCallback } from "react";
import { BoardContext } from "../context/BoardProvider";

export function useBoardState(listId) {
  const { state, dispatch } = useContext(BoardContext);

  const addCard = useCallback(
    title => dispatch({ type: "ADD_CARD", listId, title }),
    [dispatch, listId]
  );

  return {
    cards: state.cards[listId] || [],
    addCard,
  };
}
