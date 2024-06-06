// import React from 'react';
// import { Link } from "react-router-dom";
// import bruinBowlAvatar from '../Components/Media/foods/bruin_bowl.jpg';
// import bruinCafeAvatar from '../Components/Media/foods/bruin_cafe.jpg';
// import cafe1919Avatar from '../Components/Media/foods/cafe_1919.jpg';
// import dreyAvatar from '../Components/Media/foods/drey.jpg';
// import epicAtAckermanAvatar from '../Components/Media/foods/epic_at_ackerman.jpg';
// import epicuriaAvatar from '../Components/Media/foods/epic.jpg';
// import feastAvatar from '../Components/Media/foods/feast.jpg';
// import deNeveAvatar from '../Components/Media/foods/neve.jpg';
// import bPlateAvatar from '../Components/Media/foods/plate.jpg';
// import rendeAvatar from '../Components/Media/foods/rende.jpg';
// import spiceKitchenAvatar from '../Components/Media/foods/spice_kitchen.jpg';
// import studyAvatar from '../Components/Media/foods/the_study.jpg';
// import './ExplorePage.css';


// // ExplorePage component
// const ExplorePage = () => {
    
//       const Card = ({ name, avatar }) => {
//         return (
//           <div className="card">
            
//             <img src={avatar} alt={`${name} Avatar`} style={{width: '100%'}} />
//             <div className="container">
                
//               <h4>
//         <Link
//           to={`/profile/${encodeURIComponent(name)}`}
//           className="link-text"
//         >
//           {name}
//         </Link>
//       </h4>
//             </div>
//           </div>
//         );
//       };
 

//   return (
//     <div className="explore-page">
//       <Card name="Bruin Bowl" avatar={bruinBowlAvatar} />
//       <Card name="Bruin Cafe" avatar={bruinCafeAvatar} />
//       <Card name="Cafe 1919" avatar={cafe1919Avatar} />
//       <Card name="The Drey" avatar={dreyAvatar} />
//       <Card name="Epic Ackerman" avatar={epicAtAckermanAvatar} />
//       <Card name="Epicuria" avatar={epicuriaAvatar} />
//       <Card name="Feast At Rieber" avatar={feastAvatar} />
//       <Card name="De Neve" avatar={deNeveAvatar} />
//       <Card name="Bruin Plate" avatar={bPlateAvatar} />
//       <Card name="Rendevous" avatar={rendeAvatar} />
//       <Card name="Spice Kitchen" avatar={spiceKitchenAvatar} />
//       <Card name="The Study" avatar={studyAvatar} />
//     </div>
//   );
// };

// export default ExplorePage;

import React from 'react';
import { Link } from "react-router-dom";
// Importing images for dining halls
import bruinBowlAvatar from '../Components/Media/foods/bruin_bowl.jpg';
import bruinCafeAvatar from '../Components/Media/foods/bruin_cafe.jpg';
import cafe1919Avatar from '../Components/Media/foods/cafe_1919.jpg';
import dreyAvatar from '../Components/Media/foods/drey.jpg';
import epicAtAckermanAvatar from '../Components/Media/foods/epic_at_ackerman.jpg';
import epicuriaAvatar from '../Components/Media/foods/epic.jpg';
import feastAvatar from '../Components/Media/foods/feast.jpg';
import deNeveAvatar from '../Components/Media/foods/neve.jpg';
import bPlateAvatar from '../Components/Media/foods/plate.jpg';
import rendeAvatar from '../Components/Media/foods/rende.jpg';
import spiceKitchenAvatar from '../Components/Media/foods/spice_kitchen.jpg';
import studyAvatar from '../Components/Media/foods/the_study.jpg';
import './ExplorePage.css'; // Importing CSS for styling

// ExplorePage component
const ExplorePage = () => {
    
  // Card component to display individual dining hall information
  const Card = ({ name, avatar }) => {
    return (
      <div className="card">
        {/* Image for the dining hall */}
        <img src={avatar} alt={`${name} Avatar`} style={{width: '100%'}} />
        <div className="container">
          <h4>
            {/* Link to the profile page of the dining hall */}
            <Link
              to={`/profile/${encodeURIComponent(name)}`}
              className="link-text"
            >
              {name}
            </Link>
          </h4>
        </div>
      </div>
    );
  };

  return (
    <div className="explore-page">
      {/* Rendering Card components for each dining hall */}
      <Card name="Bruin Bowl" avatar={bruinBowlAvatar} />
      <Card name="Bruin Cafe" avatar={bruinCafeAvatar} />
      <Card name="Cafe 1919" avatar={cafe1919Avatar} />
      <Card name="The Drey" avatar={dreyAvatar} />
      <Card name="Epic Ackerman" avatar={epicAtAckermanAvatar} />
      <Card name="Epicuria" avatar={epicuriaAvatar} />
      <Card name="Feast At Rieber" avatar={feastAvatar} />
      <Card name="De Neve" avatar={deNeveAvatar} />
      <Card name="Bruin Plate" avatar={bPlateAvatar} />
      <Card name="Rendevous" avatar={rendeAvatar} />
      <Card name="Spice Kitchen" avatar={spiceKitchenAvatar} />
      <Card name="The Study" avatar={studyAvatar} />
    </div>
  );
};

export default ExplorePage; // Exporting the ExplorePage component
