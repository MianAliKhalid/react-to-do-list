import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [priority, setPriority] = useState("Low");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask = { text: inputValue, priority, completed: false };
      if (editIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? newTask : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, newTask]);
      }
      setInputValue("");
      setPriority("Low");
    }
  };

  const handleEditTask = (index) => {
    setInputValue(tasks[index].text);
    setPriority(tasks[index].priority);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const totalTasks = tasks.length;
  const highPriorityTasks = tasks.filter(task => task.priority === "High").length;
  const moderatePriorityTasks = tasks.filter(task => task.priority === "Moderate").length;
  const lowPriorityTasks = tasks.filter(task => task.priority === "Low").length;

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">To-Do List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Add/Edit Task</h2>
            <div className="flex mb-4">
              <input
                type="text"
                className="border border-gray-600 p-2 rounded-l-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Add a new task"
              />
              <select
                className="border border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                value={priority}
                onChange={handlePriorityChange}
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
              <button
                className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
                onClick={handleAddTask}
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
            <div className="mb-4 text-gray-400">
              <p>Total Tasks: {totalTasks}</p>
              <p>High Priority: {highPriorityTasks}</p>
              <p>Moderate Priority: {moderatePriorityTasks}</p>
              <p>Low Priority: {lowPriorityTasks}</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
            <ul>
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center p-3 mb-2 rounded-lg shadow-sm ${task.completed ? "bg-green-700" : "bg-gray-700"}`}
                >
                  <div>
                    <span className="font-bold">{index + 1}. </span>
                    <span className={`${task.completed ? "line-through" : ""}`}>{task.text}</span>
                    <span className={`ml-2 p-1 rounded ${task.priority === "High" ? "bg-red-500 text-white" : task.priority === "Moderate" ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div>
                    <button
                      className="bg-green-500 text-white p-1 rounded-lg mr-2 hover:bg-green-600 transition duration-300"
                      onClick={() => handleToggleComplete(index)}
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      className="bg-yellow-500 text-white p-1 rounded-lg mr-2 hover:bg-yellow-600 transition duration-300"
                      onClick={() => handleEditTask(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition duration-300"
                      onClick={() => handleDeleteTask(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;