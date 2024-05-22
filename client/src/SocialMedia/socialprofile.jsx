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
