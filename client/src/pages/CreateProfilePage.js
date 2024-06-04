import React, { useState, useContext } from 'react';
import { createProfile } from '../api.js';
import { UserDataContext } from "../context/UserDataProvider";
import { Link, useNavigate } from 'react-router-dom';
import "./CreateProfilePage.css"

function CreateProfilePage () {
    const [profileName, setProfileName] = useState('');
    const { userData } = useContext(UserDataContext);
    const navigate = useNavigate();

    const handleProfileNameChange = (event) => {
        setProfileName(event.target.value);
    };

    const handleCreateProfile = async () => {
        try {
            await createProfile(profileName);
            navigate(`/profile/${profileName}`);
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };

    return (
        <div className="create-profile-container">
            <div className="create-profile">
                {userData.isLoggedIn ? (
                    <div>
                        <input
                            type="text"
                            value={profileName}
                            onChange={handleProfileNameChange}
                            placeholder="Enter location name"
                        />
                        <button onClick={handleCreateProfile}>Create New Food Location</button>
                    </div>
                ) : (
                    <div className="login-wrapper">
                        <Link to="/login" className="login">Login to add a Food Location</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateProfilePage;