# Culinary Critique


_Culinary Critique_ is a web application that allows UCLA students to review and rate campus dining halls.


## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Authors](#authors)

## Features

- **User Authentication:** Secure login and registration for personalized experiences.
- **Search Functionality:** Real-time search for dining halls and user profiles.
- **Ratings and Reviews:** Leave detailed reviews and ratings for dining halls.
- **Profile Interaction:** View and interact with other users' profiles and reviews.
- **Dynamic Leaderboard:** Displays the top-rated dining locations based on user reviews.

## Technologies
 - **JavaScript** <img src="https://seeklogo.com/images/J/javascript-logo-8892AEFCAC-seeklogo.com.png" alt="JavaScript" width="30px">
 - **Node.js** <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="Node.js" width="30px">
 - **React.js** <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="React.js" width="30px">
 - **Express.js** <img src="https://www.sohamkamani.com/static/65137ed3c844d05124dcfdab28263c21/38cea/express-routing-logo.png" alt="Express.js" height="30px">
 - **MongoDB** <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/MongoDB_Logo.png/1598px-MongoDB_Logo.png?20180423174357" alt="MongoDB" height="30px">
 - **AWS S3** <img src="https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png" alt="AWS S3" width="30px">

## Setup

To run a local instance of Culinary Critique, first clone or download a copy of this repository and navigate to the new folder `culinary-critique`. Follow the instructions below to initialize a local instance of each part of the application.

### Backend Instructions
#### Setup
To set up the dependencies for the backend server, run:
```bash
cd api
npm install
```
which should download a set of `node_modules` for the backend server.

Create a `.env` file in the api folder with the following contents:
```
PORT={insert port number}
ATLAS_URI={insert mongoDB link}
S3_ACCESS_KEY={insert S3 access key}
S3_SECRET_ACCESS_KEY={insert secret S3 secret key}
```

#### Running
In the api terminal run
```
npm start
```

### Frontend Instructions
#### Setup
To setup the dependencies for the frontend application, first create a new instance of terminal, then run:
```
cd client
npm install
```
which should download a set of `node_modules` for the backend server.

Create a `.env` file in the client folder with the following contents:
```
REACT_APP_PORT={insert port number}
```

#### Running
To start the frontend application, in the client terminal, run:
```
npm start
```

## Authors
_Culinary Critique_ was made as a project for **CS 35L** taught by Professor Paul Eggert at UCLA in Spring 2024. **Made by**: Duncan Hackmann, Marco Lombardi, Nathan Leobandung, Brian Mui, and Rabbun Ishmam Haider
