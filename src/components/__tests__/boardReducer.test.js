import { boardReducer } from "../boardReducer";

test("adds a list", () => {
  const initialState = { lists: [], cards: {} };
  const action = { type: "ADD_LIST", title: "New List" };
  const newState = boardReducer(initialState, action);

  expect(newState.lists.length).toBe(1);
  expect(newState.lists[0].title).toBe("New List");
});
