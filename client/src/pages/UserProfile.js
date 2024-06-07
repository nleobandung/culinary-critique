import React, {useState, useEffect, useContext} from "react";
import ProfileCard from "../Components/ProfileCard"
import "./UserProfile.css"
import UserPosts from "../Components/UserPosts"

import { getUserComments } from "../api.js";
import { UserDataContext } from '../context/UserDataProvider.js';


function UserProfile() {

    const [userComments, setUserComments] = useState([]);
    const { userData } = useContext(UserDataContext);

    //handle getting the data
    useEffect(() => {
        getData();
    }, [userData.username, userComments]);

    const getData = async() => {
        try{

            const comments = await getUserComments(userData.username);
            setUserComments(comments);
        }
        catch (error){
            console.error("Error fetching user data", error);
        }
    }
    

    return(
    <div className="Page">
        <div className="Profile">
            <div />
            <div className="User">
                <ProfileCard />
            </div>
            <div>

            </div>  
        </div>
        <div className="Posts">
            <UserPosts data={userComments.comments}/>
        </div>
    </div>
    )
}

export default UserProfile