import React from "react";
import { ACTIONS } from "./App.js";

export default function Select({ dispatch }) {
  return (
    <>
      <select
        name="cars"
        id="cars"
        onChange={(e) =>
          dispatch({ type: ACTIONS[e.target.value.toUpperCase()] })
        }
      >
        <option value="show_all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
    </>
  );
}
