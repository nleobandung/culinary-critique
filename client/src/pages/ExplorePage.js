import React from 'react';
import bruinBowlAvatar from '../Components/Media/foods/bruin_bowl.jpg';
import bruinCafeAvatar from '../Components/Media/foods/bruin_cafe.jpg';
import cafe1919Avatar from '../Components/Media/foods/cafe_1919.jpg';
import dreyAvatar from '../Components/Media/foods/drey.jpg';
import epicAtAckermanAvatar from '../Components/Media/foods/epic_at_ackerman.jpg';
import epicuriaAvatar from '../Components/Media/foods/epic.jpg';
import feastAvatar from '../Components/Media/foods/feast.jpg';
import './ExplorePage.css';


// ExplorePage component
const ExplorePage = () => {

    const Card = ({ name, avatar }) => {
        return (
          <div className="card">
            <img src={avatar} alt={`${name} Avatar`} style={{width: '100%'}} />
            <div className="container">
              <h4><b>{name}</b></h4>
              <p>Dining Hall</p>
            </div>
          </div>
        );
      };

  return (
    <div className="explore-page">
      <Card name="Bruin Bowl" avatar={bruinBowlAvatar} />
      <Card name="Bruin Cafe" avatar={bruinCafeAvatar} />
      <Card name="Cafe 1919" avatar={cafe1919Avatar} />
      <Card name="The Drey" avatar={dreyAvatar} />
      <Card name="Epic At Ackerman" avatar={epicAtAckermanAvatar} />
      <Card name="Epicuria" avatar={epicuriaAvatar} />
      <Card name="Feast At Rieber" avatar={feastAvatar} />
    </div>
  );
};

export default ExplorePage;
