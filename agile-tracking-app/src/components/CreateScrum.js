// components/CreateScrum.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CreateScrum.css";

const CreateScrum = () => {
  const [scrumName, setScrumName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [assignedUser, setAssignedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [scrums, setScrums] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const filteredUsers = storedUsers.filter((user) => user.role !== "admin");
    setUsers(filteredUsers);
    const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
    setScrums(storedScrums);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!scrumName || !taskTitle || !taskDescription || !taskStatus || !assignedUser) {
      setError("All fields are required");
      return;
    }

    setError("");

    const newScrum = {
      scrumName,
      tasks: [{ taskTitle, taskDescription, taskStatus, assignedUser }],
    };

    const updatedScrums = [...scrums, newScrum];
    setScrums(updatedScrums);
    localStorage.setItem("scrums", JSON.stringify(updatedScrums));
    navigate("/admin-dashboard");
  };

  return (
    <div className="create-scrum-container">
      <h2 className="create-scrum-title">Create Scrum</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form className="create-scrum-form" onSubmit={handleSubmit}>
        <label className="form-label">Scrum Name:</label>
        <input
          type="text"
          value={scrumName}
          onChange={(e) => setScrumName(e.target.value)}
          required
          className="form-input"
        />

        <label className="form-label">Task Title:</label>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
          className="form-input"
        />

        <label className="form-label">Task Description:</label>
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
          className="form-input"
        />

        <label className="form-label">Task Status:</label>
        <select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          required
          className="form-select"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label className="form-label">Assign To:</label>
        <select
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
          required
          className="form-select"
        >
          <option value="">Select a user</option>
          {users.map((user, index) => (
            <option key={index} value={user.email}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit" className="submit-button">
          Create Scrum
        </button>
        <button className="cancel-button" onClick={() => navigate("/admin-dashboard")}>
        Cancel
        </button>
      </form>
      
    </div>
  );
};

export default CreateScrum;