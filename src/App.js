import "./app.css";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);


  console.log(tasks);
  console.log(name);


  const addTask = (ev) => {
    setName(ev.target.value);
  };

  const deleteTask = (ev, id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  const checkTask = (ev, id) => {
    const tasksAfterCheck = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(tasksAfterCheck);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setTasks((prevState) => [
      ...prevState,
      { id: nanoid(), name: name, completed: false },
    ]);
    setName("");
  };


//TODO: mostrar active tasks no debe suponer alterar el estado tasks
// const showActiveTasks = (ev) =>{
// const activeTasks = tasks.filter(task=>task.completed===false);
// setTasks(activeTasks);
// }


  return (
    <>
      <h2 className="heading"> My First (Ever) Todo List</h2>
      <div>
        <ul className="list">
          {" "}
          {tasks.length
            ? tasks.map((task) => (
                <>
                  <li className="task" key={task.id}>
                    <span className={task.completed ? "completed" : ""}>
                      {" "}
                      {task.name}
                    </span>
                    <input
                      type="checkbox"
                      onChange={(ev) => checkTask(ev, task.id)}
                      defaultChecked={task.completed}
                    />
                    Completed
                    <button>Edit</button>
                    <button onClick={(ev) => deleteTask(ev, task.id)}>
                      Delete
                    </button>
                  </li>
                </>
              ))
            : null}
        </ul>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          <input type="textarea" name="name" value={name} onChange={addTask} />
        </label>
        <button className="add-button" type="submit">
          Add
        </button>
      </form>
      <div className="show-buttons">
        <button className="show-buttons-item show-all" /* onClick={showAllTasks} */>Show All</button>
        <button className="show-buttons-item show-active" /* onClick={showActiveTasks} */>Show All Active</button>
        <button className="show-buttons-item show-completed" /* onClick={showCompletedTask} */>Show All Completed</button>
      </div>
    </>
  );
}

export default App;
