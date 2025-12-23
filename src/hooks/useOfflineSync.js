import { useEffect } from "react";
import * as storage from "../services/storage";
import * as api from "../services/api";

export function useOfflineSync(state, dispatch) {
  useEffect(() => {
    const localBoard = storage.loadBoard();
    dispatch({ type: "LOAD_BOARD", payload: localBoard });
  }, [dispatch]);

  useEffect(() => {
    storage.saveBoard(state);
    storage.enqueueAction({ type: "SYNC_STATE", payload: state });
  }, [state]);


  useEffect(() => {
    const interval = setInterval(() => {
      syncQueue();
    }, 30000); 

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
        return;
      }
    }

    storage.clearQueue();
  }
}
