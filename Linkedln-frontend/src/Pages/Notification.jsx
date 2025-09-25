import React from "react";
import ProfileCard from "../Components/ProfileCard";
import Advertisment from "../Components/Advertisment";
import Cards from "../Components/Cards";
import profile from './../assets/profile.jpg'

function Notification() {
    return (
        <div className=' feeds'>
            {/* left side */}
            <div className=' feeds_left hidden sm:block w-[21%] sm:w-[23%] py-5'>
                <div className=' left_card h-fit'>
                    <ProfileCard />
                </div>

            </div>

            {/* middle side */}
            <div className="profile-middle-container">

                <div>
                    <Cards padding={0}>
                        <div className="w-full">
                            {/* for each notification item */}
                            <div className={`chat-profile border-1 cursor-pointer flex gap-4 items-center border-gray-300 p-3`}>
                                <img src={profile} alt="profile" className="rounded-full cursor-pointer w-12 h-12"/>
                                <div>Dummy User has sent you a friend request</div>
                            </div>
                            <div className={`chat-profile border-1 cursor-pointer flex gap-4 items-center border-gray-300 p-3`}>
                                <img src={profile} alt="profile" className="rounded-full cursor-pointer w-12 h-12"/>
                                <div>Dummy User has sent you a friend request</div>
                            </div>
                            <div className={`chat-profile border-1 cursor-pointer flex gap-4 items-center border-gray-300 p-3`}>
                                <img src={profile} alt="profile" className="rounded-full cursor-pointer w-12 h-12"/>
                                <div>Dummy User has sent you a friend request</div>
                            </div>

                        </div>

                    </Cards>
                </div>

            </div>

            {/* right side */}
            <div className="news-sidebar">

                <div>
                    <Advertisment />

                </div>
            </div>

        </div>
    );
}

export default Notification;
