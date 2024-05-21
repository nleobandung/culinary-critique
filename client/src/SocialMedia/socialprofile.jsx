import "./socialprofile.css";

const Socialprofile = () => {
    return (
        <div className="socialprofile">
            <div className="images">
                <img src="https://www.ivywise.com/cdn-cgi/image/fit=scale-down,sharpen=1,quality=60,format=jpeg,width=800/core/wp-content/uploads/2019/11/AdobeStock_316283362-1024x576.jpeg?x22674" alt="" className="cover" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png" alt="" className="profilePic" />
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left"></div>
                    <div className="center">
                        <span>Duncan Hackmann</span>
                    </div>
                    <div className="right"></div>
                </div>
            </div>
        </div>
    )
}

export default Socialprofile