## Conflict Resolution

Each list and card in the application tracks a version number and lastModifiedAt timestamp (in boardReducer.js, ADD_CARD and UPDATE_CARD cases). These fields are intended to support conflict detection when syncing local offline changes with server data.

The planned conflict resolution strategy is like this: The system conceptually compares:
1. The base version (last synced version)
2. The local offline-modified version
3. The server-authoritative version

If the server version is newer and differs from the local version, a merge decision thenn must be made. In cases where fields do not overlap, an automatic merge would be possible. If both sides modify the same field, the merge fails and user intervention is required.

Although a full merge UI is not implemented, the architecture anticipates it. A ConfirmDialog component exists to support future resolution prompts, and the modal-based UI pattern used in CardDetailModal.jsx provides a reusable foundation.
