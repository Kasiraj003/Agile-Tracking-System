// components/UserDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/UserDashboard.css";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrums, setScrums] = useState([]);
  const [selectedScrum, setSelectedScrum] = useState(null);

  useEffect(() => {
    const fetchScrums = () => {
      const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
      setScrums(storedScrums);
    };

    fetchScrums();

    const handleStorageChange = (e) => {
      if (e.key === "scrums") {
        fetchScrums();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleGetDetails = (scrum) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedScrum(scrum);
    }
  };

  const handleBackToList = () => {
    setSelectedScrum(null);
  };

  return (
    <div className="user-dashboard-container">
      <h2 className="dashboard-title">Scrum Teams</h2>

      {!selectedScrum ? (
        scrums.length > 0 ? (
          <ul className="scrum-list">
            {scrums.map((scrum, index) => (
              <li key={index} className="scrum-item">
                {scrum.scrumName}
                <button className="details-button" onClick={() => handleGetDetails(scrum)}>
                  Get Details
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-scrums">No scrum teams available</p>
        )
      ) : (
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
                    <strong>Status:</strong> {task.taskStatus}
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
          <button className="back-button" onClick={handleBackToList}>
            Back to List
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;