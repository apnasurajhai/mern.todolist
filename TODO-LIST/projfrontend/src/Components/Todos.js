import React, { useState, useContext, useEffect } from "react";
import { infoContext } from "../Routes";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDeadline, setTodoDeadline] = useState("");
  const [info] = useContext(infoContext);

  const saveTodos = (newTodos) => {
    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${info.username}:${info.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

  useEffect(() => {
    fetch("http://localhost:8000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${info.username}:${info.password}`,
      },
    })
      .then((res) => res.json())
      .then((todos) => setTodos(todos));
  }, []);
  const addTodo = (e) => {
    e.preventDefault();
    if (!todoTitle || !todoDescription || !todoDescription) return;
    const newTodo = {
      checked: false,
      title: todoTitle,
      description: todoDescription,
      deadline: todoDeadline,
    };
    setTodos([...todos, newTodo]);
    setTodoTitle("");
    setTodoDescription("");
    setTodoDeadline("");
    saveTodos([...todos, newTodo]);
  };

  const toggleTodo = (i) => {
    const newTodoList = [...todos];
    newTodoList[i].checked = !newTodoList[i].checked;
    setTodos(newTodoList);
    saveTodos(newTodoList);
  };

  const deleteTodo = (todos) => {};

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          <input
            checked={todo.checked}
            onChange={() => toggleTodo(index)}
            type="checkbox"
          ></input>
          <label type="text">Title:{todo.title}</label>
          <br></br>
          <label type="text">Description:{todo.description}</label>
          <br></br>
          <label type="text">Deadline:{todo.deadline}</label>
          <br />
        </div>
      ))}
      <form onSubmit={addTodo}>
        <input
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          type="text"
          placeholder="Title"
        ></input>
        <input
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          type="text"
          placeholder="Description"
        ></input>
        <input
          value={todoDeadline}
          onChange={(e) => setTodoDeadline(e.target.value)}
          type="text"
          placeholder="deadline"
        ></input>
        <button onClick={addTodo}>Add</button>
        <br />
        <br />
        <button onClick={() => deleteTodo(todos)}>Delete</button>
      </form>
    </div>
  );
};

export default Todos;
