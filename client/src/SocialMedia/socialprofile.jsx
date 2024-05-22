// import "./socialprofile.css";

// const Socialprofile = () => {
//     return (
//         <div className="socialprofile">
//             <div className="images">
//                 <img src="https://www.ivywise.com/cdn-cgi/image/fit=scale-down,sharpen=1,quality=60,format=jpeg,width=800/core/wp-content/uploads/2019/11/AdobeStock_316283362-1024x576.jpeg?x22674" alt="" className="cover" />
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png" alt="" className="profilePic" />
//             </div>
//             <div className="profileContainer">
//                 <div className="uInfo">
//                     <div className="left"></div>
//                     <div className="center">
//                         <span>Duncan Hackmann</span>
//                     </div>
//                     <div className="right"></div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Socialprofile

import React from 'react';
import './socialprofile.css';

const UserProfile = () => {
  // Example user data and posts
  const user = {
    name: "Duncan Hackmann",
    profilePicture: "./images/profile.jpg",
    headerPicture: "./images/header.jpg",
    posts: [
      {
        diningHallName: "Bruin Plate",
        rating: 4,
        caption: "Healthy options and a great atmosphere!"
      },
      {
        diningHallName: "Feast at Rieber",
        rating: 5,
        caption: "Loved the desserts here. Absolute must-try!"
      },
      {
        diningHallName: "De Neve",
        rating: 3,
        caption: "Decent, but the dishes can be hit or miss."
      }
    ]
  };

  return (
    <div className="user-profile">
      <div className="header" style={{ backgroundImage: `url(${user.headerPicture})` }} />
      <img className="profile-picture" src={user.profilePicture} alt="Profile" />
      <h1 className="user-name">{user.name}</h1>
      <div className="posts">
        {user.posts.map((post, index) => (
          <div key={index} className="post">
            <h2>{post.diningHallName}</h2>
            <div className="rating">{"★".repeat(post.rating) + "☆".repeat(5 - post.rating)}</div>
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
