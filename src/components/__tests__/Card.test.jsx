import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../Card";
import { BoardContext } from "../../context/BoardProvider";

const mockCard = { id: "1", title: "Test Card", tags: ["tag1"] };

test("renders card with title and tags", () => {
  const dispatch = jest.fn();
  const state = { lists: [], cards: { list1: [mockCard] } };

  render(
    <BoardContext.Provider value={{ state, dispatch }}>
      <Card card={mockCard} />
    </BoardContext.Provider>
  );

  expect(screen.getByText("Test Card")).toBeInTheDocument();
  expect(screen.getByText("tag1")).toBeInTheDocument();
});

test("opens CardDetailModal on click", () => {
  const dispatch = jest.fn();
  const state = { lists: [], cards: { list1: [mockCard] } };

  render(
    <BoardContext.Provider value={{ state, dispatch }}>
      <Card card={mockCard} />
    </BoardContext.Provider>
  );

  fireEvent.click(screen.getByText("Test Card"));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});
