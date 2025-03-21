import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import WelcomePage from "./components/WelcomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ScrumDetails from "./components/ScrumDetails";
import UserProfile from "./components/UserProfile";
import AdminProfile from "./components/AdminProfile";
import CreateScrum from "./components/CreateScrum";
import AddUser from "./components/AddUser";
import UserHistory from "./components/UserHistory";
import { AuthProvider } from "./context/AuthContext";
import "./App.css"; 
import "./Styles.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/scrum-details/:teamName" element={<ScrumDetails />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/create-scrum" element={<CreateScrum />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/user-history/:email/:name" element={<UserHistory />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
