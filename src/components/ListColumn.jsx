import { useContext, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { BoardContext } from "../context/BoardProvider";
import { useBoardState } from "../hooks/useBoardState";
import Card from "./Card";

export default function ListColumn({ list }) {
  const { dispatch } = useContext(BoardContext);
  const { cards, addCard } = useBoardState(list.id);

  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  function saveTitle() {
    if (!title.trim()) {
      setTitle(list.title);
      setEditing(false);
      return;
    }

    dispatch({
      type: "RENAME_LIST",
      id: list.id,
      title,
    });

    setEditing(false);
  }

  function archiveList() {
    dispatch({
      type: "ARCHIVE_LIST",
      id: list.id,
    });
  }

  return (
    <div
      ref={setNodeRef}
      className="w-72 bg-gray-100 rounded p-3 flex flex-col"
    >

      <div className="mb-2">
        {editing ? (
          <input
            className="font-bold w-full border px-1 rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={e => e.key === "Enter" && saveTitle()}
            autoFocus
            aria-label="Edit list title"
          />
        ) : (
          <h2
            className="font-bold cursor-pointer"
            onDoubleClick={() => setEditing(true)}
            tabIndex={0}
            aria-label="List title"
          >
            {list.title}
          </h2>
        )}

        <button
          className="text-xs text-red-600 mt-1"
          onClick={archiveList}
          aria-label="Archive list"
        >
          Archive
        </button>
      </div>

      <div className="flex-1 space-y-2">
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      <button
        className="mt-3 text-sm text-blue-600"
        onClick={() => addCard("New Task")}
        aria-label="Add card"
      >
        + Add Card
      </button>
    </div>
  );
}
