import React, { useReducer, useState, useEffect } from "react";
import Todo from "./Todo";
import Select from "./Select";
import "./App.css";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  SHOW_ALL: "show_all",
  COMPLETED: "completed",
  UNCOMPLETED: "uncomplted",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ACTIONS.SHOW_ALL:
      return todos.map((todo) => {
        todo.display = "flex";
        return todo;
      });
    case ACTIONS.COMPLETED:
      return todos.map((todo) => {
        if (todo.complete === true) {
          todo.display = "flex";
        } else {
          todo.display = "none";
        }
        return todo;
      });
    case ACTIONS.UNCOMPLETED:
      return todos.map((todo) => {
        if (todo.complete === true) {
          todo.display = "none";
        } else {
          todo.display = "flex";
        }
        return todo;
      });

    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false, display: "flex" };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);

  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  }

  useEffect(() => {
    todos.sort((a, b) => a.complete - b.complete);
    console.log(todos);
  }, [todos]);

  return (
    <>
      <div className="container">
        <h1>ToDo</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <Select dispatch={dispatch} />
        {todos.map((todo) => {
          if (todo.display === "flex") {
            return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
          }
          return null;
        })}
      </div>
    </>
  );
}

export default App;
