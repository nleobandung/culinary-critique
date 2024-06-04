import "./Post.css"
import liked from "./Media/icons/liked.png"
import notliked from "./Media/icons/not-liked.png"

const Post = ({data}) => {
    return(
        <div className="Post">
            <img src={data.img} alt=""/>

            <div className="postReact">
                <img src={data.liked?liked: notliked} alt="" />
            </div>

            <span>{data.likes} liked this review 👍</span>

            <div className="details">
                <span><b>{data.name}</b></span>
                <span> {data.desc}</span>
            </div>
        </div> 
    )
} 

export default Post