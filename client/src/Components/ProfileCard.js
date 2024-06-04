import "./ProfileCard.css"
import Profile_Img from "../Components/Media/profile_pic.jpg"
import Profile_Background from "../Components/Media/profile_background.jpg"


const ProfileCard = () => {
    return (
        <div className="ProfileCard">
            <span>
                My Profile
            </span>
            <div className="ProfileImages">
                <img src={Profile_Background} alt=""/>
                <img src={Profile_Img} alt=""/>
            </div>

            <div className="ProfileName">
                <span>Gordon Ramsay</span>
                <span>Senior Chef</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>1024</span>
                        <span>Followers</span>
                    </div>
                    <div className="vert"></div>
                    <div className="follow">
                        <span>2</span>
                        <span>Following</span>
                    </div>
                </div>
                <hr />
            </div>

        </div>
    )
}

export default ProfileCard