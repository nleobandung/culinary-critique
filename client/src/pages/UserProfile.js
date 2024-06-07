import React, {useState, useEffect, useContext} from "react";
import ProfileCard from "../Components/ProfileCard"
import "./UserProfile.css"
import UserPosts from "../Components/UserPosts"
import FollowersWidget from "../Components/Followers"
import {getDisplayName} from '../api.js'
import { getUserComments } from "../api.js";
import { UserDataContext } from '../context/UserDataProvider.js';


function UserProfile() {
    const [displayNames, setDisplayNames] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const { userData } = useContext(UserDataContext);

    useEffect(() => {
        getData();
    }, [userData.username, userComments]);

    const getData = async() => {
        try{
            const data = await getDisplayName();
            setDisplayNames(data);

            const comments = await getUserComments(userData.username);
            setUserComments(comments);
        }
        catch (error){
            console.error("Error fetching user profiles", error);
        }
    }

    return(
    <div className="Page">
        <div className="Profile">
            <div />
            <div className="User">
                <ProfileCard />
            </div>
            <div className="Followers">
                <FollowersWidget />
            </div>  
        </div>
        <div className="Posts">
            <UserPosts />
        </div>
    </div>
    )
}

export default UserProfile