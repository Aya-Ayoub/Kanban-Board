## Optimistic Updates

The application implements optimistic UI updates to ensure a well designed and responsive user experiense, especially when working offline. When a user performs an action such as adding a list, adding a card, or editing a card, tthe UI updates immediately through a reducer action from the component layer.

After the reducer updates the state, the new board state is persisted locally using localStorage from storage.saveBoard() in useOfflineSync.js. At the same time, a sync action is queued using enqueueAction, allowing the system to remember changes made while being offline.

A mock server layer exists in services/api.js and services/mockServer.js`. The simulateNetwork function introduces random delays and occasional failures to emulate real network conditions. This design allows testing optimistic updates without depending or relying on a real backend.

If a simulated network failure occurs, the UI remains responsive offline, the architecture supports it by keeping previous state snapshots