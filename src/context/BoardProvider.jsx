import { createContext, useReducer } from "react";
import { boardReducer } from "./boardReducer";
import { useOfflineSync } from "../hooks/useOfflineSync";

export const BoardContext = createContext();

const initialState = {
  past: [],
  present: { lists: [], cards: {} },
  future: [],
};

function undoRedoReducer(state, action) {
  const { past, present, future } = state;

  switch (action.type) {
    case "UNDO":
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      return {
        past: past.slice(0, -1),
        present: previous,
        future: [present, ...future],
      };
    case "REDO":
      if (future.length === 0) return state;
      const next = future[0];
      return {
        past: [...past, present],
        present: next,
        future: future.slice(1),
      };
    default:
      // For normal actions, save current present in past
      const newPresent = boardReducer(present, action);
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
  }
}

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(undoRedoReducer, initialState);

  const { past, present, future } = state;

  // Offline persistence + sync
  useOfflineSync(present, dispatch);

  return (
    <BoardContext.Provider
      value={{
        state: present,
        dispatch,
        undo: () => dispatch({ type: "UNDO" }),
        redo: () => dispatch({ type: "REDO" }),
        canUndo: past.length > 0,
        canRedo: future.length > 0,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
