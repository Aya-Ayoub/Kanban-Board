import { v4 as uuid } from "uuid";

export const initialState = {
  lists: [],
  cards: {},
};

export function boardReducer(state, action) {
  switch (action.type) {
    case "ADD_LIST":
      return {
        ...state,
        lists: [...state.lists, { id: uuid(), title: action.title, archived: false }],
      };

    case "ADD_CARD":
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.listId]: [
            ...(state.cards[action.listId] || []),
            {
              id: uuid(),
              title: action.title,
              description: "",
              tags: [],
              lastModifiedAt: Date.now(),
              version: 1,
            },
          ],
        },
      };
    
    case "RENAME_LIST":
        return {
            ...state,
            lists: state.lists.map(list =>
            list.id === action.id ? { ...list, title: action.title } : list
            ),
        };

        case "ARCHIVE_LIST":
        return {
            ...state,
            lists: state.lists.map(list =>
            list.id === action.id ? { ...list, archived: true } : list
            ),
        };
    
    case "MOVE_CARD": {
        const { fromListId, toListId, cardId } = action;

        if (fromListId === toListId) return state;

        const card = state.cards[fromListId].find(c => c.id === cardId);

        return {
            ...state,
            cards: {
            ...state.cards,
            [fromListId]: state.cards[fromListId].filter(c => c.id !== cardId),
            [toListId]: [...(state.cards[toListId] || []), card],
            },
        };
    }

    case "UPDATE_CARD": {
        const { listId, cardId, updates } = action;

        return {
            ...state,
            cards: {
            ...state.cards,
            [listId]: state.cards[listId].map(card =>
                card.id === cardId
                ? {
                    ...card,
                    ...updates,
                    version: card.version + 1,
                    lastModifiedAt: Date.now(),
                    }
                : card
            ),
            },
        };
    }

    case "LOAD_BOARD":
      return action.payload || state;

    default:
      return state;
  }
}
