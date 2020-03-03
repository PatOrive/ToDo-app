import React, { useReducer, useRef } from "react";

const INSERT_TODO = "[Todo] INSERT_TODO";
const DELETE_TODO = "[Todo] DELETE_TODO";
const TYPE_TODO = "[Todo] TYPE_TODO";

function todosReducer(state, action) {
  switch (action.type) {
    case INSERT_TODO:
      return { todos: [state.todo, ...state.todos], todo: "" };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.index)
      };
    case TYPE_TODO:
      return { ...state, todo: action.text };
    default:
      return state;
  }
}

export default function Notes() {
  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(todosReducer, { todos: [], todo: "" });
  return (
    <React.Fragment>
      <div className="App">
        <div className="todoListMain">
          <div className="header">
            <h1>ToDo App</h1>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (!state.todo) {
                  return;
                }

                dispatch({ type: INSERT_TODO });
                inputRef.current.focus();
              }}
            >
              <input
                ref={inputRef}
                placeholder="Task"
                value={state.todo}
                onChange={e =>
                  dispatch({ type: TYPE_TODO, text: e.target.value })
                }
              />
              <button type="submit">Add a task</button>
            </form>
          </div>
        </div>
        <ul className="theList">
          {state.todos.map((todo, index) => (
            <li onClick={e => dispatch({ type: DELETE_TODO, index })}>
              {todo}
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
