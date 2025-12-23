import { useEffect, useRef, useState } from "react";

export default function CardDetailModal({
  card,
  onSave,
  onClose,
}) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [tags, setTags] = useState(card.tags.join(", "));

  const dialogRef = useRef(null);


  useEffect(() => {
    dialogRef.current?.focus();

    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleSave() {
    onSave({
      title,
      description,
      tags: tags
        .split(",")
        .map(t => t.trim())
        .filter(Boolean),
    });
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="bg-white p-4 rounded w-96 space-y-3"
      >
        <h3 className="font-bold text-lg">Edit Card</h3>

        <input
          className="border w-full px-2 py-1"
          value={title}
          onChange={e => setTitle(e.target.value)}
          aria-label="Card title"
        />

        <textarea
          className="border w-full px-2 py-1"
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          aria-label="Card description"
        />

        <input
          className="border w-full px-2 py-1"
          placeholder="tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          aria-label="Card tags"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 border rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
