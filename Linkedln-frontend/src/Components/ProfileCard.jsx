import React from "react";
import Cards from "./Cards";
import bgImg from "./../assets/backgroundImg.jpg"
import profile from "./../assets/profile.jpg"
import { Link } from "react-router-dom";

function ProfileCard(props) {

    return (
        <Cards padding={0}>
            <div className="relative h-25">
                <Link to={`/profile/${props.data?._id}`} className="relative w-full h-22 rounded-md">
                    <img src={props.data?.cover_pic} alt="profile-bg-img" className="rounded-t-md h-full w-full" />
                </Link>
                <div className="absolute top-14 left-6 z-10">
                    <img src={props?.data?.profilePic} alt="profile" className="rounded-full border-2 h-15 w-15 border-white cursor-pointer" />

                </div>
            </div>
            <div className=" profile_details">
                <div className="profile_name">{props?.data?.f_name}</div>
                <div className="profile_context text-sm my-1">{props?.data?.headline}</div>
                <div className=" profile_context text-sm my-1">{props?.data?.curr_location}</div>
                <div className="profile_context text-sm my-1">{props?.data?.curr_company}</div>

            </div>
        </Cards>
    );
}

export default ProfileCard;
