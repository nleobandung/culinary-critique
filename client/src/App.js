import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/NavBar';
import Background from "./components/background";
import DiningHallsPage from "./pages/DiningHallsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import UserDataProvider from "./context/UserDataProvider.js"

function App() {
  return (
    <UserDataProvider>
      <Router>
        <Background />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <DiningHallsPage/>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </UserDataProvider>
  );
}

export default App;