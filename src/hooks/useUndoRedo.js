import { useState, useCallback } from "react";

export function useUndoRedo(initialState) {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState(initialState);
  const [future, setFuture] = useState([]);

  const setState = useCallback(
    (newState) => {
      setPast((prevPast) => [...prevPast, present]);
      setPresent(newState);
      setFuture([]);
    },
    [present]
  );

  const undo = useCallback(() => {
    setPast((prevPast) => {
      if (prevPast.length === 0) return prevPast;

      const previous = prevPast[prevPast.length - 1];
      setFuture((prevFuture) => [present, ...prevFuture]);
      setPresent(previous);
      return prevPast.slice(0, -1);
    });
  }, [present]);

  const redo = useCallback(() => {
    setFuture((prevFuture) => {
      if (prevFuture.length === 0) return prevFuture;

      const next = prevFuture[0];
      setPast((prevPast) => [...prevPast, present]);
      setPresent(next);
      return prevFuture.slice(1);
    });
  }, [present]);

  return {
    state: present,
    setState,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}
