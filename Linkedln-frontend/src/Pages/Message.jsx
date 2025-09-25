import React from "react";
import Cards from "../Components/Cards";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Conversation from "../Components/Conversation";
import profile from "./../assets/profile.jpg"
import bgImg from "./../assets/backgroundImg.jpg"
import ImageIcon from '@mui/icons-material/Image';
import Advertisment from "../Components/Advertisment";

function Message() {

    return (
        <div className="feeds">
            <div className="w-full justify-between flex pt-5 msg-container">
                {/* left side */}
                <div className="w-full md:w-[70%]">
                    <Cards padding={0}>
                        <div className="title-msg border-b-1 border-gray-300 px-5 py-2 font-semibold text-lg">
                            Messaging
                        </div>
                        <div className="border-b-1 border-gray-300 px-5 py-2 focus-msg-btn">
                            <div className="focus-btn py-1 px-3 cursor-pointer hover:bg-green-900 bg-green-800 font-semibold flex gap-2 w-fit rounded-2xl text-white">Focused<ArrowDropDownIcon /></div>
                        </div>

                        {/* div for chat */}
                        <div className="w-full md:flex">
                            <div className="h-[590px] overflow-auto w-full md:w-[40%] border-r-1 border-gray-400">

                                {/* for each chat */}
                                <Conversation />


                            </div>
                            <div className="w-full md:w-[60%] border-gray-400">
                                <div className="chat-header">
                                    <div>
                                        <p className="text-sm font-semibold">User1</p>
                                        <p className="text-sm text-gray-400">Hi this is User1</p>
                                    </div>
                                    <div><MoreHorizIcon /></div>

                                </div>
                                <div className="h-[360px] w-full overflow-auto border-b-1 border-gray-300">
                                    <div className="chat-profile w-full border-b-1 border-gray-300 gap-3 p-4">
                                        <img src={profile} alt="profile" className="rounded-[100%] cursor-pointer w-12 h-12" />
                                        <div className="my-2 profile-chat-info">
                                            <div className="text-md">User1</div>
                                            <div className="text-sm text-gray-500">Hi this is user 1</div>
                                        </div>

                                    </div>
                                    <div className="w-full">
                                        {/* for each msg */}
                                        <div className="chat-box flex w-full cursor-pointer border-gray-300 gap-3 p-4">
                                            <div className="shrink-0">
                                                <img src={profile} alt="profile" className="w-8 h-8 rounded-[100%] cursor-pointer" />
                                            </div>
                                            <div className="mb-2 w-full">
                                                <div className="text-md">User1</div>
                                                <div className="chat-text text-sm mt-6 hover:bg-gray-200">This is a text message</div>
                                                <div className="chat-img"><img src={bgImg} alt="img" className="w-[200px] h-[180px] rounded-md" /></div>

                                            </div>

                                        </div>


                                    </div>

                                </div>
                                {/* space for typing msg */}
                                <div className=" text-input p-2 w-full border-b-1 border-gray-200">
                                    <textarea rows={3}  placeholder="write a message"></textarea>

                                </div>
                                <div className="chat-icons p-3 flex justify-between">
                                    <div>
                                        <label htmlFor="messageImage" className="cursor-pointer"><ImageIcon /></label>
                                        <input type="file" className="hidden" id="messageImage" />
                                    </div>
                                    <div className="chat-send-btn">
                                        Send
                                    </div>

                                </div>

                            </div>

                        </div>

                    </Cards>

                </div>
                {/* right side */}
                <div className="hidden md:flex md:w-[25%]">
                    <div className="sticky top-15">
                        <Advertisment />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Message