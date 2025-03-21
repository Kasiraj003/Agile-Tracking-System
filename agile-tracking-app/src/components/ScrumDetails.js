// components/ScrumDetails.js
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Styles/ScrumDetails.css";

const ScrumDetails = () => {
  const { index } = useParams();
  const scrums = JSON.parse(localStorage.getItem("scrums")) || [];
  const [currentScrum, setCurrentScrum] = useState(scrums[index]);

  if (!currentScrum) return <p>Scrum not found</p>;

  const handleStatusChange = (taskIndex, newStatus) => {
    const updatedScrum = { ...currentScrum };
    updatedScrum.tasks[taskIndex].taskStatus = newStatus;
    setCurrentScrum(updatedScrum);

    const updatedScrums = [...scrums];
    updatedScrums[index] = updatedScrum;
    localStorage.setItem("scrums", JSON.stringify(updatedScrums));
  };

  return (
    <div className="scrum-details-container">
      <h2 className="scrum-details-title">Scrum Details for {currentScrum.scrumName}</h2>

      <h3 className="tasks-header">Tasks:</h3>
      {currentScrum.tasks && currentScrum.tasks.length > 0 ? (
        currentScrum.tasks.map((task, taskIndex) => (
          <div key={taskIndex} className="task-item">
            <p className="task-title">
              <strong>Task Title:</strong> {task.taskTitle}
            </p>
            <p className="task-description">
              <strong>Task Description:</strong> {task.taskDescription}
            </p>
            <p className="assigned-user">
              <strong>Assigned To:</strong> {task.assignedUser}
            </p>
            <p className="task-status">
              <strong>Status:</strong>
              <span className="current-status">{task.taskStatus}</span>
              <select
                value={task.taskStatus}
                onChange={(e) => handleStatusChange(taskIndex, e.target.value)}
                aria-label="Change Task Status"
                className="status-select"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </p>
          </div>
        ))
      ) : (
        <p className="no-tasks">No tasks available</p>
      )}

      <button className="back-button">
        <Link to="/" className="back-link">
          Back to List
        </Link>
      </button>
    </div>
  );
};

export default ScrumDetails;