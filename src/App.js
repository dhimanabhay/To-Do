import "./App.css";
import TaskForm from "./components/taskForm/TaskForm";
import Task from "./components/task/Task";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks || []);
  }, []);

  function addTask(name) {
    setTasks((prev) => {
      return [...prev, { name: name, done: false }];
    });
  }
  function removeTask(removeIndex) {
    setTasks((prev) => {
      return prev.filter((taskObject, index) => {
        return index !== removeIndex;
      });
    });
  }
  function updateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  } 

  const numberComplete = tasks.filter((t) => t.done).length;
  const numberTotal = tasks.length;

  return (
    <main className="App">
      <h3>
        {numberComplete}/{numberTotal} completed
      </h3>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task
          {...task}
          onTrash={() => removeTask(index)}
          onToggle={(done) => updateTaskDone(index, done)}
          onRename={newName => renameTask(index, newName)}
        />
      ))}
    </main>
  );
}

export default App;
