import { useEffect, useState, useContext } from 'react';
import "./ProfileCard.css"
import Profile_Img from "../Components/Media/profile_pic.jpg"
import Profile_Background from "../Components/Media/profile_background.jpg"
import { getProfilePhoto } from "../api";
import { UserDataContext } from "../context/UserDataProvider";




const ProfileCard = () => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const { userData } = useContext(UserDataContext);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const profilePhotoUrl = await getProfilePhoto(userData.username);
                setProfilePhoto(profilePhotoUrl);
            } catch (error) {
                console.error('Error fetching profile photos:', error);
            }
        };
        fetchPhotos();
    }, []);

    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={Profile_Background} alt=""/>
                <img src={profilePhoto} alt=""/>
            </div>

            <div className="ProfileName">
                <span>{userData.username}</span>
            </div>

        </div>
    )
}

export default ProfileCard