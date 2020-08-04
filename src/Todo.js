import React from "react";
import { ACTIONS } from "./App.js";

function appliedStyle(complete) {
  return complete
    ? { color: "#AAA", textDecoration: "line-through" }
    : { color: "#000", textDecoration: "none" };
}

export default function Todo({ todo, dispatch }) {
  return (
    <div
      className="todo"
      onClick={() =>
        dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
      }
    >
      <span style={appliedStyle(todo.complete)}>{todo.name}</span>

      <button
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
        }
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}
