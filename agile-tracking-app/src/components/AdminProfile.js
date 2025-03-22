// components/AdminProfile.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/AdminProfile.css";

const AdminProfile = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const filteredUsers = storedUsers.filter((user) => user.role !== "admin"); // Exclude admin
    setUsers(filteredUsers);
  }, []);

  const handleGetHistory = (email, name) => {
    navigate(`/user-history/${email}/${encodeURIComponent(name)}`);
  };

  return (
    <div className="admin-profile-container">
      <h2 className="profile-title">User Profiles</h2>
      <button className="add-user-button">
        <Link to="/add-user" className="add-user-link">
          Add New User
        </Link>
      </button>
      <ul className="user-list">
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index} className="user-item">
              <p className="user-name">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="user-email">
                <strong>Email:</strong> {user.email}
              </p>
              <button
                className="history-button"
                onClick={() => handleGetHistory(user.email, user.name)}
              >
                Get History
              </button>
            </li>
          ))
        ) : (
          <p className="no-users">No users found</p>
        )}
      </ul>
    </div>
  );
};

export default AdminProfile;