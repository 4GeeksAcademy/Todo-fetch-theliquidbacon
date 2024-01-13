import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Update the API with the modified to-do list whenever todos change
    fetch("https://playground.4geeks.com/apis/fake/todos/user/liquidbacon", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); // true if the response is successful
        console.log(resp.status); // the status code (e.g., 200, 400, etc.)
        console.log(resp.text()); // the response as text
        return resp.json(); // parse the response as JSON and return a promise
      })
      .then(data => {
        console.log(data); // the object received from the server
      })
      .catch(error => {
        console.log(error); // error handling
      });
  }, []);

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/liquidbacon", {
      method: "PUT",
      body: JSON.stringify([{ label: "Hacer la comida", done: false },
      { label: "Bajar al perro", done: false },
      { label: "Hacer la tarea", done: false }]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); 
        console.log(resp.status);
        console.log(resp.text()); 
      })
      .then(data => {
        console.log(data); // the object received from the server
      })
      .catch(error => {
        console.log(error); // error handling
      });
    fetch("https://playground.4geeks.com/apis/fake/todos/user/liquidbacon")
      .then(resp => resp.json())
      .then(data => setTodos(data))
      .catch(error => console.log(error));
  }, []);

  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo = { label: inputValue, done: false };
    setTodos([...todos, newTodo]);

    setInputValue("");
  };

  const deleteTodo = index => {
    const updatedTodos = todos.filter((_, currentIndex) => index !== currentIndex);
    setTodos(updatedTodos);
  };

  const cleanAllTasks = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/liquidbacon", {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(data => setTodos([]))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>To do de Gabriel</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <input
                  type="text"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addTodo();
                    }
                  }}
                  placeholder="Añade una tarea"
                />
              </li>
              {todos.map((item, index) => (
                <li
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                  className="list-group-item"
                >
                  <span style={{ flexGrow: 1 }}>{item.label}</span>
                  <i
                    className="fas fa-times"
                    onClick={() => deleteTodo(index)}
                  ></i>
                </li>
              ))}
              <div className="todosLeft">{todos.length} tareas restantes</div>
              {todos.length > 0 && (
                <button className="btn btn-secondary" onClick={cleanAllTasks}>
                  Eliminar las tareas
                </button>                
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;