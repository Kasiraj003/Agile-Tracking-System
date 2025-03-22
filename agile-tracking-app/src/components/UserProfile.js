// components/UserProfile.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../Styles/UserProfile.css";

const UserProfile = () => {
  const { user } = useAuth();
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
      const assignedTasks = storedScrums.flatMap((scrum) =>
        scrum.tasks ? scrum.tasks.filter((task) => task.assignedUser === user.email) : []
      );

      setUserTasks(assignedTasks);
    }
  }, [user]);

  if (!user) {
    return <p className="no-user">Please log in to view your profile.</p>;
  }

  return (
    <div className="user-profile-container">
      <h2 className="profile-title">User Profile</h2>
      <p className="profile-info">
        <strong>Name:</strong> {user.name || "Unknown User"}
      </p>
      <p className="profile-info">
        <strong>Email:</strong> {user.email}
      </p>

      <h3 className="tasks-header">Tasks Worked by {user.name || "User"}</h3>
      {userTasks.length > 0 ? (
        <ul className="task-list">
          {userTasks.map((task, index) => (
            <li key={index} className="task-item">
              <p className="task-title">
                <strong>Task Title:</strong> {task.taskTitle}
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
        <p className="no-tasks">No tasks assigned to you.</p>
      )}
    </div>
  );
};

export default UserProfile;