import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/NavBar';
import Background from "./Components/background";
import DiningHallsPage from "./pages/DiningHallsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CreateProfilePage from "./pages/CreateProfilePage"
import UserDataProvider from "./context/UserDataProvider";
import UserProfile from "./pages/UserProfile";
import ExplorePage from "./pages/ExplorePage";

function App() {
  return (
    <UserDataProvider>
      <Router>
        <Background />
        <Navbar />
        <Routes>
          <Route path="/" element={<DiningHallsPage />} />
          <Route path="/create-food" element={<CreateProfilePage />} />
          <Route path="/profile/:name" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/usr" element={<UserProfile />} />
          <Route path="/about" element={<div>inser about page here</div>} />
        </Routes>
      </Router>
    </UserDataProvider>
  );
}

export default App;