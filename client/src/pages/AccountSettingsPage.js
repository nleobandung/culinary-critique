import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { uploadProfilePhoto, getProfilePhoto } from '../api';
import { UserDataContext } from "../context/UserDataProvider";
import './AccountSettingsPage.css';

function AccountSettingsPage() {
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const photoURL = await getProfilePhoto(userData.username);
        setPhotoURL(photoURL);
      } catch (error) {
        console.error('Error fetching profile photo:', error);
      }
    };

    if (userData.username) {
      fetchProfilePhoto();
    }
  }, [userData.username, photoURL]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUploadClick = async () => {
    if (file) {
      const newPhotoURL = await uploadProfilePhoto(userData.username, file);
      setPhotoURL(newPhotoURL);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div className="account-settings">
      <div className="settings-container">
        <h2>Account Settings</h2>
        <div className="user-info">
          <p>Username: <span>{userData.username}</span></p>
          <div className="profile-photo">
            <p>Profile Photo:</p>
            {photoURL ? (
              <img src={photoURL} alt="Profile" className="profile-image" />
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
        <Link to="/login" className="logout-button">Log Out</Link>
      </div>
    </div>
  );
}

export default AccountSettingsPage;
