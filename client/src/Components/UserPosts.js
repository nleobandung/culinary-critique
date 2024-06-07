import "./UserPosts.css"
import Post from "./Post.js"

const UserPosts = ({data = []}) => {
    console.log(data);
    if (!Array.isArray(data)) {
        return null;
    }

    return(
        <div className="UserPosts">
            {data.map((data, id)=>{
                return <Post data={data} id={id}/>
            })}
        </div>
    )
}

export default UserPosts