import React, { useState, useEffect } from "react";
import ProfileCard from "../Components/ProfileCard";
import Cards from "../Components/Cards";
import profile from "./../assets/profile.jpg"
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PhotoIcon from '@mui/icons-material/Photo';
import ArticleIcon from '@mui/icons-material/Article';
import Advertisment from "../Components/Advertisment";
import Post from "../Components/Post";
import Modal from "../Components/Modal";
import AddModal from "../Components/AddModal";
import Loader from "../Components/Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Feeds() {

    const [personalData, setPersonalData] = useState(null);
    const [post, setPost] = useState([]);
    const [addPostModal, setAddPostModal] = useState(false)
    const handleOpenPostModal = () => {
        setAddPostModal(prev => !prev)
    }


    const fetchData = async () => {
        try {
            const [userData, postData] = await Promise.all([
                await axios.get("http://localhost:3000/api/auth/self", { withCredentials: true }),
                await axios.get("http://localhost:3000/api/post/getAllPosts")
            ]);
            setPersonalData(userData.data.user);
            localStorage.setItem("userInfo", JSON.stringify(userData.data.user));
            setPost(postData.data.posts);
        } catch (err) {
            console.error('API error:', err);
            toast.error(err.response?.data?.error);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className=' feeds'>
            {/* left side */}
            <div className=' feeds_left hidden sm:block w-[21%] sm:w-[23%] py-5'>
                <div className=' left_card h-fit'>
                    <ProfileCard data={personalData} />
                </div>
                <div className="profile-stats-section">
                    <Cards padding={1}>
                        <div className="stats-row">
                            <div className="stats-label">Profile Viewers</div>
                            <div className="text-blue-900">23</div>
                        </div>
                        <div className="stats-row">
                            <div className="stats-label">Post Impressions</div>
                            <div className="text-blue-900">100</div>
                        </div>

                    </Cards>

                </div>
            </div>

            {/* middle side */}
            <div className="profile-middle-container">
                <div>
                    <Cards padding={1}>
                        <div className="profile-img-wrapper">
                            <img src={personalData?.profilePic} alt="profile" className="rounded-4xl w-13 h-13 border-2 border-white cursor-pointer" />
                            <div onClick={() => setAddPostModal(true)} className="start-post">Start a post</div>

                        </div>
                        <div className="post_container">
                            <div onClick={() => setAddPostModal(true)} className="post_context"><VideoCallIcon sx={{ color: "green" }} /> Video</div>
                            <div onClick={() => setAddPostModal(true)} className="post_context"><PhotoIcon sx={{ color: "blue" }} /> Photo</div>
                            <div onClick={() => setAddPostModal(true)} className="post_context"><ArticleIcon sx={{ color: "orange" }} /> Article</div>
                        </div>

                    </Cards>
                </div>
                <div className="divider" />
                <div className="w-full flex flex-col gap-5">
                    {
                        post.map((item, index) => {

                            return <Post item={item} key={index} personalData={personalData} />

                        })
                    }
                </div>

            </div>

            {/* right side */}
            <div className="news-sidebar">
                <div>
                    <Cards padding={1}>
                        <div className="text-xl">Linkedln News</div>
                        <div className="text-gray-600">Top stories</div>
                        <div className="my-1">
                            <div className="text-sm">Buffett to remain Berkshire chair</div>
                            <div className="text-xs text-gray-400">2hr ago</div>

                        </div>

                        <div className="my-1 news">
                            <div className="text-sm">Foreign investments surge again</div>
                            <div className="text-xs text-gray-400">4hr ago</div>


                        </div>

                    </Cards>
                </div>
                <div>
                    <Advertisment />

                </div>
            </div>
            {
                addPostModal && <Modal closeModal={handleOpenPostModal} title={""}>
                    <AddModal personalData={personalData} />
                </Modal>
            }

            {/* <Loader /> */}
            <ToastContainer />
        </div>
    );
}

export default Feeds;
