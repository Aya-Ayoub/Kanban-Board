const BOARD_KEY = "kanban_board";
const QUEUE_KEY = "offline_queue";

export function saveBoard(board) {
  localStorage.setItem(BOARD_KEY, JSON.stringify(board));
}

export function loadBoard() {
  const raw = localStorage.getItem(BOARD_KEY);
  return raw ? JSON.parse(raw) : { lists: [], cards: {} };
}

export function enqueueAction(action) {
  const queue = loadQueue();
  queue.push(action);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function loadQueue() {
  const raw = localStorage.getItem(QUEUE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function clearQueue() {
  localStorage.removeItem(QUEUE_KEY);
}
