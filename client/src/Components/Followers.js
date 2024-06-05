import "./Followers.css"
import { Followers } from "./SampleFollowersData"

const FollowersWidget = () => {
    return(
        <div className="FollowersCard">
            <span className="MyFollowers">My Followers</span>
            {Followers.map((follower, id)=>{
            return(
                <div className="follower">
                    <img src={follower.img} alt="" className="profimg"/>
                    <div>
                        <div className="Name">
                            <span>{follower.name}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                    <button className="followbutton">
                        Follow
                    </button>
                </div>
            )
        })}
        </div>
    )
}

export default FollowersWidget