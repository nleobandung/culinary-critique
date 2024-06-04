import ProfileCard from "../Components/ProfileCard"
import "./UserProfile.css"
import UserPosts from "../Components/UserPosts"
import FollowersWidget from "../Components/Followers"

function UserProfile() {
    return(
    <div className="Profile">
        <div />
        <div className="User">
            <ProfileCard />
            <UserPosts />
        </div>

        <div className="Followers">
            <FollowersWidget />
        </div>
        
    </div>
    )
}

export default UserProfile