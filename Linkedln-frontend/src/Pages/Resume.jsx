import React, { useState, useEffect } from "react";
import resume from "./../assets/resume.jpg"
import Advertisment from "../Components/Advertisment";

function Resume() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let userData = localStorage.getItem("userInfo");
        setUserData(userData ? JSON.parse(userData) : null);
    }, []);

    return (
        <div className="feeds">
            <div className="w-[100%] py-5 sm:w-[74%] resume-show">
                <img src={userData?.resume} alt="resume" className="w-full h-full" />

            </div>
            <div className="w-[26%] py-5 hidden md:block">
                <div className="sticky top-19">
                    <Advertisment />

                </div>

            </div>

        </div>
    )
}

export default Resume