import "./Followers.css"
import { Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState, useEffect } from "react";

const FollowersWidget = ({user, Followers}) => {
    //handle tab changing
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    //KEY
    //0: follower
    //1: following
    //2: both
    const handleFollowers = (follower) => {
        //change the status to 2 if status is 0
        if(follower.status == 2) {
            follower.status = 0;
        }
                //change the status to 0 if status is 2
        else{
            follower.status = 2;
        }
    }

    const handleFollowing = () => {

    }

    const handleSuggested = () => {

    }

    function getFollowers(followers) {
        const ret = [];
        //given an array of Followers, output just the status = 0 or status = 2
        for(let i = 0; i < followers.length; i++) {
            if(followers[i].status == 0 || followers[i].status == 2) {
                ret.push(followers[i])
            }
        }
        return ret;
    }

    function getFollowing(followers) {
        const ret = [];
        //given an array of Followers, output just the status = 0 or status = 2
        for(let i = 0; i < followers.length; i++) {
            if(followers[i].status == 1 || followers[i].status == 2) {
                ret.push(followers[i])
            }
        }
        return ret;
    }

    function getSuggested() {

    }

    return(
        <div className="FollowersCard">
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Followers" value="1" />
                        <Tab label="Following" value="2" />
                        <Tab label="Suggested" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div className="FollowersList">
                        {getFollowers(Followers).map((follower, id)=>{
                        return(
                            <div className="follower">
                                <img src={follower.img} alt="unknown" className="profimg"/>
                                <div>
                                    <div className="Name">
                                        <span>@{follower.username}</span>
                                        <span></span>
                                    </div>
                                </div>
                                <button className="followbutton" onClick={handleFollowers(follower)}>
                                    {follower.status? "Follow" : "Following"}
                                </button>
                            </div>
                        )
                        })}
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className="FollowingList">
                        {getFollowing(Followers).map((follower, id)=>{
                        return(
                            <div className="follower">
                                <img src={follower.img} alt="err" className="profimg"/>
                                <div>
                                    <div className="Name">
                                        <span>@{follower.username}</span>
                                    </div>
                                </div>
                                <button className="followbutton">
                                    Unfollow
                                </button>
                            </div>
                        )
                        })}
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div>tbd</div>
                    {/* <div className="SuggestedList">
                        {Followers.map((follower, id)=>{
                        return(
                            <div className="follower">
                                <img src={follower.img} alt="" className="profimg"/>
                                <div>
                                    <div className="Name">
                                        <span>{follower.name}</span>
                                        <span>@{follower.username}</span>
                                    </div>
                                </div>
                                <button className="followbutton">
                                    Follow
                                </button>
                            </div>
                        )
                        })}
                    </div> */}
                </TabPanel>
            </TabContext>
            <form>
                <label>
                    Search User:
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default FollowersWidget