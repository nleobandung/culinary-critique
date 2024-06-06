import "./Post.css"
import liked from "./Media/icons/liked.png"
import notliked from "./Media/icons/not-liked.png"
import { useState } from "react"

const Post = ({data}) => {
    
    const [readFullDesc, setReadFullDesc] = useState(false)
    const [clickedLike, setClickedLike] = useState(data.liked)

    const showFullDescHandler = () => {
        setReadFullDesc(!readFullDesc);
    };

    const likeHandler = () => {
        !clickedLike ? data.likes += 1 : data.likes -=1;
        setClickedLike(!clickedLike);
    };

    const description = readFullDesc ? data.desc : data.desc.slice(0, 100)

    return(
        <div className="Post">
            <span>{data.date}</span>
            <span><b>{data.name}</b> ate at ▶ <b>{data.dining_hall}</b> {data.logo_img}</span>

            <img src={data.img} alt=""/>

            <div className="details">
                <span> {description} </span>
            </div>

            <button className="readMore" onClick={showFullDescHandler}>
                read {readFullDesc ? "less" : "more"}
            </button>

            <div className="postReact">
                <img src={clickedLike?liked: notliked} alt="" onClick={likeHandler}/>
                <span className="numLikes">
                    {clickedLike
                    ? 
                    "You and "
                    :
                    ""
                    }
                    {data.likes} liked this review
                </span>
            </div>
        </div> 
    )
} 

export default Post