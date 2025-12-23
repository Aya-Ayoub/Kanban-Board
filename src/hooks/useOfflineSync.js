import { useEffect } from "react";
import * as storage from "../services/storage";
import * as api from "../services/api";

//compare server version with local version
//If server.version > local.version → trigger merge UI
export function useOfflineSync(state, dispatch) {
  // Load board from localStorage on mount
  useEffect(() => {
    const localBoard = storage.loadBoard();
    dispatch({ type: "LOAD_BOARD", payload: localBoard });
  }, [dispatch]);

  // Save board to localStorage on every state change and queue it
  useEffect(() => {
    storage.saveBoard(state);
    storage.enqueueAction({ type: "SYNC_STATE", payload: state });
  }, [state]);

  // Sync queued actions periodically + on reconnect
  useEffect(() => {
    const interval = setInterval(() => {
      syncQueue();
    }, 30000); // every 30 seconds

    window.addEventListener("online", syncQueue);
    return () => {
      clearInterval(interval);
      window.removeEventListener("online", syncQueue);
    };
  }, []);

  async function syncQueue() {
    if (!navigator.onLine) return;

    const queue = storage.loadQueue();
    if (!queue.length) return;

    for (const action of queue) {
      try {
        switch (action.type) {
          case "SYNC_STATE":
            await api.simulateNetwork(action.payload);
            break;
          default:
            break;
        }
      } catch (err) {
        console.error("Sync failed:", err);
        return; // stop on first failure
      }
    }

    storage.clearQueue();
  }
}
