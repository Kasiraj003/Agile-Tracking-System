// components/UserHistory.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Styles/UserHistory.css";

const UserHistory = () => {
  const { email, name } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const scrums = JSON.parse(localStorage.getItem("scrums")) || [];
    const userTasks = scrums.flatMap((scrum) =>
      scrum.tasks.filter((task) => task.assignedUser === email)
    );
    setTasks(userTasks);
  }, [email]);

  return (
    <div className="user-history-container">
      <h2 className="history-title">Tasks Worked by {decodeURIComponent(name)}</h2>
      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <p className="task-title">
                <strong>Title:</strong> {task.taskTitle}
              </p>
              <p className="task-description">
                <strong>Description:</strong> {task.taskDescription}
              </p>
              <p className="task-status">
                <strong>Status:</strong> {task.taskStatus}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tasks">No tasks found for this user.</p>
      )}
      <Link to="/admin-profile" className="back-link">
        Back to Profile
      </Link>
    </div>
  );
};

export default UserHistory;