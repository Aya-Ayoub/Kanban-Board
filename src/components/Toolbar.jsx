import { useContext, useState } from "react";
import { BoardContext } from "../context/BoardProvider";

export default function Toolbar() {
  const { dispatch, undo, redo, canUndo, canRedo } = useContext(BoardContext);
  const [title, setTitle] = useState("");

  function addList() {
    if (!title.trim()) return;
    dispatch({ type: "ADD_LIST", title });
    setTitle("");
  }

  return (
    <div className="flex gap-2 p-4 border-b">
      <input
        className="border px-2 py-1 rounded"
        placeholder="New list title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-3 rounded" onClick={addList}>
        Add List
      </button>

      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={undo}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={redo}
        disabled={!canRedo}
      >
        Redo
      </button>
    </div>
  );
}
