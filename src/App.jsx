import { BoardProvider } from "./context/BoardProvider";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import Board from "./components/Board";

export default function App() {
  return (
    <BoardProvider>
      <Header />
      <Toolbar />
      <Board />
    </BoardProvider>
  );
}
