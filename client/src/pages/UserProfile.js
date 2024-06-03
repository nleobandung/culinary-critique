import ProfileCard from "../Components/ProfileCard"
import "./UserProfile.css"
import Navbar from "../Components/NavBar"

function UserProfile() {
    return(
        <div className="User">
            <ProfileCard />
            <div className="Posts">Posts</div>
        </div>
    )
}

export default UserProfile