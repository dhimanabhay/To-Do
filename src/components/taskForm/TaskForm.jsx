import { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({onAdd}) => {
  const [taskName, setTaskName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() !== "") {
      onAdd(taskName);
      setTaskName("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button>+</button>
      <input
        type="text"
        placeholder="Add a task..."
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />
    </form>
  );
};

export default TaskForm;
