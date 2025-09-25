import React, { useState, useEffect } from "react";
import linkedlnLogo from './../assets/Linkedln_icon.png';
import profile from './../assets/profile.jpg'
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation, Link } from "react-router-dom";

function Navbar2() {

      const [userData, setUserData] = useState(null);
    
        useEffect(() => {
            let userData = localStorage.getItem("userInfo");
            setUserData(userData ? JSON.parse(userData) : null);
        }, []);

    const [dropdown, setDropdown] = useState(false);
    const location = useLocation();

    return (
        <div className="Navbar2 flex items-center justify-between px-4 h-16">

            <div className="flex items-center gap-3">

                <Link to={"/feeds"} className="logo">
                    <img src={linkedlnLogo} alt="logo" className="h-8 w-8" />
                </Link>

                <div className="relative search_input">
                    <input
                        placeholder="Search"
                        className="w-[280px] h-10 px-4 rounded bg-[#eef3f8] border-none outline-none text-sm text-gray-700 transition-all duration-300 focus:w-[350px]"
                    />
                    {dropdown && (
                        <div className="absolute w-88 left-0 bg-gray-200 mt-1 p-2 rounded shadow">
                            <div className="flex gap-2 items-center cursor-pointer">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={profile}
                                    alt="profile_pic"
                                />
                                <div>Rose</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="hidden md:flex gap-x-8 items-center ml-[-100px]">
                <Link to={"/feeds"} className="flex flex-col items-center justify-center cursor-pointer pt-1">
                    <HomeIcon sx={{ color: location.pathname === '/feeds' ? 'black' : 'gray' }} />
                    <div className={`text-sm text-gray-500 ${location.pathname === '/feeds' ? 'border-b-4 border-gray' : ''}`}>Home</div>
                </Link>
                <Link to={"/mynetwork"} className="flex flex-col items-center justify-center cursor-pointer pt-1">
                    <PeopleIcon sx={{ color: location.pathname === '/mynetwork' ? 'black' : 'gray' }} />
                    <div className={`text-sm text-gray-500 ${location.pathname === '/mynetwork' ? 'border-b-4 border-gray' : ''}`}>My Network</div>
                </Link>
                <Link  to={"/resume"} className="flex flex-col items-center justify-center cursor-pointer pt-1">
                    <WorkIcon sx={{ color: location.pathname === '/resume' ? 'black' : 'gray' }} />
                    <div className={`text-sm text-gray-500 ${location.pathname === '/resume' ? 'border-b-4 border-gray' : ''}`}>Resume</div>
                </Link>
                <Link to={"/message"} className="flex flex-col items-center justify-center cursor-pointer pt-1">
                    <MessageIcon sx={{ color: location.pathname === '/message' ? 'black' : 'gray' }} />
                    <div className={`text-sm text-gray-500 ${location.pathname === '/messages' ? 'border-b-4 border-gray' : ''}`}>Message</div>
                </Link>
                <Link to={"/notification"} className="flex flex-col items-center justify-center cursor-pointer pt-1">
                    <div><NotificationsIcon sx={{ color: location.pathname === '/notification' ? 'black' : 'gray' }} /> <span className="w-7 h-6 justify-center rounded-full text-sm bg-red-700 text-white">1</span> </div>
                    <div className={`text-sm text-gray-500 ${location.pathname === '/notification' ? 'border-b-4 border-gray' : ''}`}>Notification</div>
                </Link>
                <Link to={`/profile/${userData?._id}`} className="flex flex-col items-center justify-center cursor-pointer pt-1">
                    <img className='w-7 h-7 rounded-full' src={userData?.profilePic} alt="profile-pic" />
                    <div className="text-sm text-gray-500">Me</div>
                </Link>
            </div>
        </div>

    )
}

export default Navbar2