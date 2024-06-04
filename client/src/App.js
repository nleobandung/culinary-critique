import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/NavBar';  // Ensure correct path and case sensitivity
import Background from "./Components/background";  // Ensure correct path and case sensitivity
import DiningHallsPage from "./pages/DiningHallsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import UserDataProvider from "./context/UserDataProvider";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <UserDataProvider>
      <Router>
        <Background />
        <Navbar />
        <Routes>
          <Route path="/" element={<DiningHallsPage />} />
          <Route path="/profile/:name" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/usr" element={<UserProfile />} />
          <Route path="/about" element={<div>inser about page here</div>} />
          <Route path="/explore" element={<div>inser explore page here</div>} />
        </Routes>
      </Router>
    </UserDataProvider>
  );
}

export default App;
