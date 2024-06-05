import { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { uploadProfilePhoto } from '../api';
import { UserDataContext } from "../context/UserDataProvider";

function AccountSettingsPage() {
  const [file, setFile] = useState(null);
  const { userData } = useContext(UserDataContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUploadClick = () => {
    if (file) {
      uploadProfilePhoto(userData.username, file);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div className="App">
      <div>
        <p>Change your profile photo</p>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUploadClick}>Upload</button>
        <Link to="/login">Log Out</Link>
      </div>
    </div>
  );
}

export default AccountSettingsPage;