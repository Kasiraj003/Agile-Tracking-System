// components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [scrums, setScrums] = useState([]);
  const [selectedScrum, setSelectedScrum] = useState(null);
  const [taskStatuses, setTaskStatuses] = useState({});

  useEffect(() => {
    const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
    setScrums(storedScrums);

    const initialStatuses = JSON.parse(localStorage.getItem("taskStatuses")) || {};
    storedScrums.forEach((scrum) => {
      scrum.tasks?.forEach((task) => {
        if (!(task.taskTitle in initialStatuses)) {
          initialStatuses[task.taskTitle] = task.taskStatus;
        }
      });
    });

    setTaskStatuses(initialStatuses);
  }, []);

  const handleStatusChange = (taskTitle, newStatus) => {
    const updatedStatuses = {
      ...taskStatuses,
      [taskTitle]: newStatus,
    };

    setTaskStatuses(updatedStatuses);
    localStorage.setItem("taskStatuses", JSON.stringify(updatedStatuses));

    const updatedScrums = scrums.map((scrum) => ({
      ...scrum,
      tasks: scrum.tasks.map((task) =>
        task.taskTitle === taskTitle ? { ...task, taskStatus: newStatus } : task
      ),
    }));

    setScrums(updatedScrums);
    localStorage.setItem("scrums", JSON.stringify(updatedScrums));
  };

  const deleteScrum = (scrumName) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Scrum?");
    if (confirmDelete) {
      const updatedScrums = scrums.filter((scrum) => scrum.scrumName !== scrumName);
      setScrums(updatedScrums);
      localStorage.setItem("scrums", JSON.stringify(updatedScrums));
      setSelectedScrum(null);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2 className="dashboard-title">Scrum Teams</h2>
      <button className="add-scrum-button">
        <Link to="/create-scrum" className="add-scrum-link">
          Add New Scrum
        </Link>
      </button>
      <ul className="scrum-list">
        {scrums.map((scrum, index) => (
          <li key={index} className="scrum-item">
            {scrum.scrumName}
            <button className="details-button" onClick={() => setSelectedScrum(scrum)}>
              Get Details
            </button>
          </li>
        ))}
      </ul>

      {selectedScrum && (
        <div className="scrum-details">
          <h2 className="details-title">Scrum Details for {selectedScrum.scrumName}</h2>

          <h3 className="tasks-header">Tasks:</h3>
          {selectedScrum.tasks && selectedScrum.tasks.length > 0 ? (
            <ul className="task-list">
              {selectedScrum.tasks.map((task, taskIndex) => (
                <li key={taskIndex} className="task-item">
                  <p className="task-title">
                    <strong>Task Title:</strong> {task.taskTitle}
                  </p>
                  <p className="task-description">
                    <strong>Task Description:</strong> {task.taskDescription}
                  </p>
                  <p className="task-status">
                    <strong>Status:</strong>
                    <span className="current-status">{taskStatuses[task.taskTitle]}</span>
                    <select
                      value={taskStatuses[task.taskTitle] || task.taskStatus}
                      onChange={(e) => handleStatusChange(task.taskTitle, e.target.value)}
                      className="status-select"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </p>
                  <p className="assigned-user">
                    <strong>Assigned To:</strong> {task.assignedUser}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks">No tasks available</p>
          )}

          <div className="details-actions">
            <button className="back-button" onClick={() => setSelectedScrum(null)}>
              Back to List
            </button>
            <button
              className="delete-button"
              onClick={() => deleteScrum(selectedScrum.scrumName)}
            >
              Delete Scrum
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;