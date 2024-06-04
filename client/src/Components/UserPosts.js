import { PostsData } from "./SamplePostData"
import "./UserPosts.css"
import Post from "./Post.js"

const UserPosts = () => {
    return(
        <div className="UserPosts">
            {PostsData.map((post, id)=>{
                return <Post data={post} id={id}/>
            })}
        </div>
    )
}

export default UserPosts