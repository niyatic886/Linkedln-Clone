import React from "react";
import profile2 from "./../assets/profile2.jpg"

function Conversation() {

    return (
        <div className="chat-item">
            <div className="shrink-0">
                <img src={profile2} alt="profile" className="w-11 h-11 rounded-[100%] cursor-pointer" />
            </div>
            <div>
                <div className="text-md">Swati</div>
                <div className="text-sm text-gray-500">Engineer Amazon</div>
            </div>

        </div>
    )
}

export default Conversation