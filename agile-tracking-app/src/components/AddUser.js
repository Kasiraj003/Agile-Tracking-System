// components/AddUser.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AddUser.css";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const navigate = useNavigate();

  const handleAddUser = (e) => {
    e.preventDefault();

    const newUser = { name, email, password, role };
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...storedUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/admin-profile"); // Navigate back to Admin Profile
  };

  return (
    <div className="add-user-container">
      <h2 className="add-user-title">Add New User</h2>
      <form className="add-user-form" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select">
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="submit-button">
          Add User
        </button>
        <button type="button" onClick={() => navigate("/admin-profile")} className="cancel-button">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddUser;