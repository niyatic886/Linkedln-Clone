import React, { useState, useEffect, use } from "react";
import Cards from "./Cards";
import bgImg from "./../assets/backgroundImg.jpg"
import profile from "./../assets/profile.jpg"

function Advertisment() {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let userData = localStorage.getItem("userInfo");
        setUserData(userData ? JSON.parse(userData) : null);
    }, []);

    return (
        <div className="advertisement">
            <Cards padding={0}>
                <div className="relative h-25">
                    <div className="relative w-full h-22 rounded-md">
                        <img src={bgImg} alt="profile-bg-img" className="rounded-t-md h-full w-full" />
                    </div>
                    <div className="absolute top-14 left-[37%] z-10">
                        <img src={userData?.profilePic} alt="profile" className="rounded-full border-2 h-14 w-14 border-white cursor-pointer" />

                    </div>
                </div>
                <div className="ads-section">
                    <div className="text-sm font-semibold text-center">{userData?.f_name}</div>
                    <div className="text-sm my-3 text-center">Get the latest jobs and industry news</div>
                    <div className=" explore-button text-sm my-1 border-1 text-center p-2 rounded-2xl font-bold border-blue-950 text-white bg-blue-800 cursor-pointer">Explore</div>

                </div>

            </Cards>

        </div>
    )
}

export default Advertisment