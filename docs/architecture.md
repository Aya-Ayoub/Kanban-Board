## Architecture Choices

The Kanban board application is a component-drivenn application using React with centralized state management using useReducer and Context. The global board state is mainly by BoardProvider.jsx (src/context/BoardProvider.jsx) which has the state, dispatch function, and both undo/redo controls.

The reducer logic is in boardReducer.js (src/context/boardReducer.js). All updates to lists and cards such as adding lists, renaming, archiving, adding cards, updating cards, and moving cards are all handled through reducer actions.

Board.jsx renders all active lists, each list is rendered usingg ListColumn.jsx, and individual tasks are rendered using Card.jsx. This separation allows each component to focus on a single responsibility. Card related editing logic is in CardDetailModal.jsx, which is lazy-loaded.

State access is simplified through custom hooks such as useBoardState (src/hooks/useBoardState.js), which abstracts reducer dispatch logic for card operations. This reduces prop drilling and improves readability.
