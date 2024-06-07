import React, {useState, useEffect} from "react";
import ProfileCard from "../Components/ProfileCard"
import "./UserProfile.css"
import UserPosts from "../Components/UserPosts"
import FollowersWidget from "../Components/Followers"
import {getDisplayName} from '../api.js'
import { getComments } from "../api.js";



function UserProfile() {
    const [displayNames, setDisplayNames] = useState([])

    useEffect(() => {
        getData();
    }, []);

    const getData = async() => {
        try{
            const data = await getDisplayName();
            setDisplayNames(data);
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