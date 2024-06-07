import "./Followers.css"
import { Followers } from "./SampleFollowersData"
import { Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from "react";

const FollowersWidget = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className="FollowingList">
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
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div className="SuggestedList">
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
                    </div>
                </TabPanel>
            </TabContext>

        </div>
    )
}

export default FollowersWidget