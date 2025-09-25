import React from "react";
import ProfileCard from "../Components/ProfileCard";
import Advertisment from "../Components/Advertisment";
import Cards from "../Components/Cards";
import Post from "../Components/Post";


function SingleActivity() {
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



                    <div>
                        <Post />

                    </div>


                </div>



            </div>

            {/* right side */}
            <div className="news-sidebar">

                <div className="sticky top-20">
                    <Advertisment />

                </div>
            </div>

        </div>
    );
}

export default SingleActivity;
