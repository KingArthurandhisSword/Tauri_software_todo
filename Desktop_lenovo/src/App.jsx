import { useState, useEffect } from "react";
import "./App.css"; // 🔹 CSS mukaan
import titleImage from "./assets/2.png";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? savedNotes : "";
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("notes", notes);
  }, [notes]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      {/* 🔹 Tehtävälista */}
      <div className="task-column">
        {/* <img src={titleImage} alt="Muistilehtiö" className="title-image" /> */}
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Kirjoita tehtävä"
        />
        <button className="add-btn" onClick={addTask}></button>
        <ul>
          {tasks.map((t, i) => (
            <li key={i} className={t.completed ? "completed" : ""}>
              <button className="check-btn" onClick={() => toggleTaskCompletion(i)}>
                {t.completed ? "✔" : ""}
              </button>
              <span onClick={() => toggleTaskCompletion(i)}>{t.text}</span>
              <button className="delete-btn" onClick={() => deleteTask(i)}>x</button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Avoin kirjoitustila */}
      <div className="note-column">
        <h2></h2>
        <textarea
        spellCheck={false} 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Kirjoita muistiinpanoja..."
        />
      </div>
    </div>
  );
}

export default App;

