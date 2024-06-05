import ProfileCard from "../Components/ProfileCard"
import "./UserProfile.css"
import UserPosts from "../Components/UserPosts"
import FollowersWidget from "../Components/Followers"

function UserProfile() {
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
          <h3>User Posts Cards Here</h3>
          <div className="Posts">
              <UserPosts />
          </div>
      </div>
    )
}

export default UserProfile