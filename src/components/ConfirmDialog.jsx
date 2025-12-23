export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-4 rounded space-y-3">
        <p>{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel}>Cancel</button>
          <button
            className="bg-red-600 text-white px-3 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
