import ProfileCard from "../Components/ProfileCard"
import "./UserProfile.css"
import UserPosts from "../Components/UserPosts"

function UserProfile() {
    return(
        <div className="User">
            <ProfileCard />
            <UserPosts />
        </div>
    )
}

export default UserProfile