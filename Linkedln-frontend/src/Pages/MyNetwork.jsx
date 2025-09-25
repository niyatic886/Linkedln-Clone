import React, { useState, useEffect } from "react";
import ProfileCard from "../Components/ProfileCard";
import axios from "axios";

function MyNetwork() {
    const [activeTab, setActiveTab] = useState("Friends");
    const [text, setText] = useState("Catch up with friends");
    const [data, setData] = useState([])

    const handleFriends = async () => {
        setActiveTab("Friends");
        setText("Catch up with friends");

    };

    const handlePending = async () => {
        setActiveTab("Pending Request");
        setText("Pending Request");

    };

    const fetchFriendList = async () => {
        await axios.get("http://localhost:3000/api/auth/friendsList", { withCredentials: true }).then((res) => {
            console.log(res)
            setData(res.data.friends)
        }).catch((err) => {
            console.log(err)
        })
    }

    const fetchPendingRequest = async () => {
        await axios.get("http://localhost:3000/api/auth/pendingFriendsList", { withCredentials: true }).then((res) => {
            console.log(res)
            setData(res.data.pendingFriends)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (activeTab === "Friends") {
            fetchFriendList()
        } else {
            fetchPendingRequest()
        }
    }, [text]);

    return (
        <div className="feeds flex-col">
            <div className="mynetwork-container">
                <div>{text}</div>
                <div className="mynetwork-buttons">
                    <button
                        onClick={handleFriends}
                        className={`network-btn ${activeTab === "Friends" ? "active" : ""}`}
                    >
                        Friends
                    </button>

                    <button
                        onClick={handlePending}
                        className={`network-btn ${activeTab === "Pending Request" ? "active" : ""}`}
                    >
                        Pending Request
                    </button>
                </div>
            </div>
            <div className="flex h-[80vh] w-full gap-7 flex-wrap items-start justify-center">
                {
                    data.map((item, index) => {
                        return (
                            <div className="post-cards md:w-[23%] h-[270px] sm:w-full">
                                <ProfileCard data={item} />

                            </div>
                        )

                    })
                }

                {
                    data.length === 0 ? activeTab == "Catch up with friends" ? <div>No Friends Yet</div> : <div>No Pending Request</div> : null
                }


            </div>
        </div>
    );
}

export default MyNetwork;
