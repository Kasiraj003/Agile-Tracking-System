import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showScrums, setShowScrums] = useState(false);
  const [scrums, setScrums] = useState([]);
  const [selectedScrum, setSelectedScrum] = useState(null);

  const fetchScrums = () => {
    const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
    setScrums(storedScrums);
  };

  useEffect(() => {
    fetchScrums();

    const handleStorageChange = (e) => {
      if (e.key === "scrums") {
        fetchScrums();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [selectedScrum]);

  const handleGetDetails = (scrum) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedScrum(scrum);
    }
  };

  const handleViewScrums = () => {
    setShowScrums(true);
  };

  const handleBackToList = () => {
    setSelectedScrum(null);
  };

  return (
    <div className="welcome-container">
      <h2 className="welcome-title">🚀 Welcome to Agile Tracking System</h2>
      <p className="welcome-subtitle">
        Track and manage your scrum teams effectively with ease.
      </p>

      {!showScrums && !selectedScrum && (
        <button className="view-scrums-btn" onClick={handleViewScrums}>
          View Scrums
        </button>
      )}

      {showScrums && !selectedScrum && (
        <div className="scrum-list-container">
          <h2 className="scrum-title">Scrum Teams</h2>
          {scrums.length > 0 ? (
            <ul className="scrum-list">
              {scrums.map((scrum, index) => (
                <li key={index} className="scrum-item">
                  <span>{scrum.scrumName}</span>
                  <button className="details-btn" onClick={() => handleGetDetails(scrum)}>
                    Get Details
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-scrums">No scrum teams available</p>
          )}
        </div>
      )}

      {selectedScrum && (
        <div className="scrum-details-container">
          <h2 className="scrum-title">Scrum Details: {selectedScrum.scrumName}</h2>

          <h3 className="task-heading">Tasks:</h3>
          {selectedScrum.tasks && selectedScrum.tasks.length > 0 ? (
            <ul className="task-list">
              {selectedScrum.tasks.map((task, taskIndex) => (
                <li key={taskIndex} className="task-item">
                  <p><strong>Task:</strong> {task.taskTitle}</p>
                  <p><strong>Description:</strong> {task.taskDescription}</p>
                  <p><strong>Status:</strong> {task.taskStatus}</p>
                  <p><strong>Assigned To:</strong> {task.assignedUser}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks">No tasks available</p>
          )}
          <button className="back-btn" onClick={handleBackToList}>
            🔙 Back to List
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
