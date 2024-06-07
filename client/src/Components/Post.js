import "./Post.css"
import { useState } from "react"

const Post = ({data}) => {
    const [readFullDesc, setReadFullDesc] = useState(false)

    const showFullDescHandler = () => {
        setReadFullDesc(!readFullDesc);
    };

    const description = readFullDesc ? data.text : data.text?.slice(0, 100)

    return(
        <div className="Post">
            <span>{new Date(data.date).toLocaleDateString()}</span>
            <span><b>{data.username}</b> ate at ▶ <b>{data.profileName}</b></span>

            <div className="details">
                <span> {description} </span>
            </div>

            <button className="readMore" onClick={showFullDescHandler}>
                read {readFullDesc ? "less" : "more"}
            </button>
        </div> 
    )
} 

export default Post