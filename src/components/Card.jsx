import React, { useContext, useState, Suspense } from "react";
import { useDraggable } from "@dnd-kit/core";
import { BoardContext } from "../context/BoardProvider";

const CardDetailModal = React.lazy(() =>
  import("./CardDetailModal")
);

function Card({ card }) {
  const { state, dispatch } = useContext(BoardContext);
  const [open, setOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id: card.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const listId = Object.keys(state.cards).find(id =>
    state.cards[id].some(c => c.id === card.id)
  );

  function save(updates) {
    dispatch({
      type: "UPDATE_CARD",
      listId,
      cardId: card.id,
      updates,
    });
    setOpen(false);
  }

  return (
    <>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className="bg-white p-2 rounded shadow text-sm cursor-move"
        onClick={() => setOpen(true)}
        tabIndex={0}
        aria-label="Open card details"
      >
        <div className="font-medium">{card.title}</div>

        {card.tags.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {card.tags.map(tag => (
              <span
                key={tag}
                className="text-xs bg-gray-200 px-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {open && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/30" />}>
          <CardDetailModal
            card={card}
            onSave={save}
            onClose={() => setOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}

export default React.memo(Card);
