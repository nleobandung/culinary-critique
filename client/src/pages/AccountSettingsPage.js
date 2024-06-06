import { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { uploadProfilePhoto } from '../api';
import { UserDataContext } from "../context/UserDataProvider";
import './AccountSettingsPage.css';

function AccountSettingsPage() {
  const [file, setFile] = useState(null);
  const { userData, setUserData } = useContext(UserDataContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUploadClick = () => {
    if (file) {
      uploadProfilePhoto(userData.username, file).then((photoURL) => {
        setUserData({ ...userData, photoURL });
      });
    } else {
      alert('Please select a file first.');
    }
  };

  const handleLogout = () => {
    // Add logout logic here, e.g., clear user data, redirect to login page, etc.
  };

  return (
    <div className="account-settings">
      <div className="settings-container">
        <h2>Account Settings</h2>
        <div className="user-info">
          <p>Username: <span>{userData.username}</span></p>
          <div className="profile-photo">
            <p>Profile Photo:</p>
            {userData.photoURL ? (
              <img src={userData.photoURL} alt="Profile" className="profile-image" />
            ) : (
              <p>No profile photo uploaded.</p>
            )}
          </div>
        </div>
        <div className="upload-section">
          <p>Change your profile photo</p>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUploadClick} className="upload-button">Upload</button>
        </div>
        <Link to="/login" onClick={handleLogout} className="logout-button">Log Out</Link>
      </div>
    </div>
  );
}

export default AccountSettingsPage;
