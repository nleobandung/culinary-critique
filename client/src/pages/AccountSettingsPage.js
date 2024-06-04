import { useState } from "react";
import { uploadImage } from '../api';

function AccountSettingsPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUploadClick = () => {
    if (file) {
      console.log(file.name);
      uploadImage(file);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUploadClick}>Upload</button>
      </div>
    </div>
  );
}

export default AccountSettingsPage;