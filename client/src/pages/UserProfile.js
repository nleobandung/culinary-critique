import React, {useState, useEffect} from "react";
import ProfileCard from "../Components/ProfileCard"
import "./UserProfile.css"
import UserPosts from "../Components/UserPosts"
import FollowersWidget from "../Components/Followers"
import {getDisplayName} from '../api.js'
import { getComments } from "../api.js";

import { getFollowers } from "../api.js";
import { getFollowersID } from "../api.js";
import { getFollowersUser } from "../api.js";
import img1 from "../Components/Media/logos/Logo_Feast.jpg"

function compileFollowData(usernames, ids, stati) {
    const Follow = [];
    for(let i = 0; i < stati.length; i++) {
        Follow.push({username: usernames[i], id: ids[i], status: stati[i], img: img1, name: "Student"})
    }
    return Follow;
};

// function sendCardData(followers, name, nickname) {
//     numFollow = 0;
//     for(let i = 0; i < followers.length; i++) {
//         if(followers[i].status == 0 || followers[i].status == 2) {
//             numFollow += 1;
//         }
//     }
//     numFollowers = 0;
//     for(let i = 0; i < followers.length; i++) {
//         if(followers[i].status == 1 || followers[i].status == 2) {
//             numFollowers += 1;
//         }
//     }
//     const ret = {numFollowers: numFollow, numFollowing: numFollowers, user: name, displayName: nickname};
// }

function UserProfile() {

    //enumerate constants
    const [user, setUser] = useState("bryan");
    const [userNickName, setUserNickName] = useState("")
    const [followers, setFollowers] = useState([]);

    //handle getting the data
    useEffect(() => {
        getData();
    }, []);

    const getData = async() => {
        try{
            const status = await getFollowers(user);
    
            const ids = await getFollowersID(user);

            const usernames = await getFollowersUser(user);
    
            const data = compileFollowData(usernames, ids, status);
            setFollowers(data);
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
                <ProfileCard username={user}/>
            </div>
            <div className="Followers">
                <FollowersWidget user={user} Followers={followers}/>
            </div>  
        </div>
        <div className="Posts">
            <UserPosts />
        </div>
    </div>
    )
}

export default UserProfile