import React from "react";
import ProfileCard from "../Components/ProfileCard";
import Advertisment from "../Components/Advertisment";
import { useParams } from "react-router-dom";
import Cards from "../Components/Cards";
import Post from "../Components/Post";

function Activity() {
    const { id } = useParams();

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
                    <Cards padding={1}>
                        <div className="skills-part">
                            <div className="activity-text text-xl">All Activity</div>
                            <div className="post-btn cursor-pointer w-fit p-2 border-1 rounded-4xl bg-green-800 my-2 text-white font-semibold">Posts</div>

                            <div className="skill-btn my-2 flex flex-col gap-2">
                                <div>
                                    <Post />

                                </div>
                                <div>
                                    <Post />

                                </div>
                            </div>
                        </div>
                    </Cards>
                </div>



            </div>

            {/* right side */}
            <div className="news-sidebar">

                <div className="sticky top-20">
                    <Advertisment />

                </div>
            </div>

        </div>
    )
}

export default Activity;
