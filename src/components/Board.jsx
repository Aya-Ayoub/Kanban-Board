import { useContext } from "react";
import { DndContext } from "@dnd-kit/core";
import { BoardContext } from "../context/BoardProvider";
import ListColumn from "./ListColumn";

export default function Board() {
  const { state, dispatch } = useContext(BoardContext);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const fromListId = Object.keys(state.cards).find(listId =>
      state.cards[listId]?.some(card => card.id === active.id)
    );

    if (!fromListId) return;

    const toListId = over.id;

    dispatch({
      type: "MOVE_CARD",
      fromListId,
      toListId,
      cardId: active.id,
    });
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-4">
        {state.lists
          .filter(list => !list.archived)
          .map(list => (
            <ListColumn key={list.id} list={list} />
          ))}
      </div>
    </DndContext>
  );
}
