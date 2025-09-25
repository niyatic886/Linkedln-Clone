import React, { useState, useEffect } from "react";
import Advertisment from "../Components/Advertisment";
import Cards from "../Components/Cards";
import bgImg from "./../assets/backgroundImg.jpg"
import profile from "./../assets/profile.jpg"
import EditIcon from '@mui/icons-material/Edit';
import Post from "../Components/Post";
import AddIcon from '@mui/icons-material/Add';
import Modal from "../Components/Modal";
import ImageModal from "../Components/ImageModal";
import EditInfoModal from "../Components/EditInfoModal";
import AboutModal from "../Components/AboutModal";
import ExpModal from "../Components/ExpModal";
import MessageModal from "../Components/MessageModal";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Profile() {
    const { id } = useParams();
    const [imageSetModal, setImageModal] = useState(false)
    const [aboutModal, setAboutModal] = useState(false)
    const [infoModal, setInfoModal] = useState(false)
    const [expModal, setExpModal] = useState(false)
    const [messageModal, setMessageModal] = useState(false)
    const [circularImage, setCircularImage] = useState(true)
    const [updateExp, setUpdateExp] = useState({ clicked: "", id: "", datas: {} })
    const [userData, setUserData] = useState(null)
    const [postData, setPostData] = useState([])
    const [ownData, setOwnData] = useState(null)

    useEffect(() => {
        fetchDataOnLoad()

    }, [id])

    const amIfriend = () => {
        let arr = userData?.friends?.filter((item) => { return item === ownData?._id })
        return arr?.length
    }

    // friends

    const isInPendingList = () => {
        let arr = userData?.pending_friends?.filter((item) => { return item === ownData?._id })
        return arr?.length
    }

    const isInSelfPendingList = () => {
        let arr = ownData?.pending_friends?.filter((item) => { return item === userData?._id })
        return arr?.length
    }

    const checkFriendStatus = () => {
        if (amIfriend()) {
            return "Disconnect"
        } else if (isInSelfPendingList()) {
            return "Approve Request"
        } else if (isInPendingList()) {
            return "Request Sent"
        } else {
            return "Connect"
        }
    }

    const updateExpEdit = (id, data) => {
        setUpdateExp({ ...updateExp, clicked: true, id: id, data: data })
        setExpModal(prev => !prev)
    }

    const handleEditFunc = async (data) => {
        await axios.put(`http://localhost:3000/api/auth/update`, { user: data }, { withCredentials: true }).then(res => {
            window.location.reload()

        }).catch(err => {
            console.log(err)
        })

    }

    const fetchDataOnLoad = async () => {
        try {
            const [userDatas, postDatas, ownDatas] = await Promise.all([
                axios.get(`http://localhost:3000/api/auth/user/${id}`),
                axios.get(`http://localhost:3000/api/post/getTop5Post/${id}`),
                axios.get(`http://localhost:3000/api/auth/self`, { withCredentials: true })
            ]);

            localStorage.setItem("userInfo", JSON.stringify(ownDatas.data.user))

            setUserData(userDatas.data.user)
            setPostData(postDatas.data.posts)
            setOwnData(ownDatas.data.user)

        } catch (err) {
            console.log(err);
            alert("something went wrong")
        }
    };



    const handleImageModalOpenClose = () => {
        setImageModal(prev => !prev)
    }

    const handleMessageModal = () => {
        setMessageModal(prev => !prev)
    }

    const handleExpModal = () => {
        if (expModal) {
            setUpdateExp({ clicked: "", id: "", datas: {} })
        }
        setExpModal(prev => !prev)
    }

    const handleInfoModal = () => {
        setInfoModal(prev => !prev)
    }

    const handleOnEditCover = () => {
        setImageModal(true)
        setCircularImage(false)
    }

    const handleCircularImageOpen = () => {
        setImageModal(true)
        setCircularImage(true)
    }

    const handleAboutModal = () => {
        setAboutModal(prev => !prev)
    }

    const handleSendFriendRequest = async () => {
        if (checkFriendStatus() === "Request Sent") return;
        if (checkFriendStatus() === "connect") {
            await axios.post(`http://localhost:3000/api/auth/sendFriendReq`, { receiver: userData?._id }, { withCredentials: true }).then(res => {
                toast.success(res.data.message)
                setTimeout(() => { window.location.reload() }, 2000)
            }).catch(err => {
                console.log(err)
                toast.error(err?.response?.data?.error)
            })
        } else if (checkFriendStatus() === "Approve Request") {
            await axios.post(`http://localhost:3000/api/auth/acceptFriendRequest`, { friendId: userData?._id }, { withCredentials: true }).then(res => {
                toast.success(res.data.message)
                setTimeout(() => { window.location.reload() }, 2000)
            }).catch(err => {
                console.log(err)
                toast.error(err?.response?.data?.error)
            })
        } else {
            await axios.delete(`http://localhost:3000/api/auth/removeFromFriendsList/${userData?._id}`, { withCredentials: true }).then(res => {
                toast.success(res.data.message)
                setTimeout(() => { window.location.reload() }, 2000)
            }).catch(err => {
                console.log(err)
                toast.error(err?.response?.data?.error)
            })
        }
    }

    return (
        <div className="feeds">
            <div className="profile-page">
                {/* left side main section*/}
                <div className="profile-left w-full md:w-[70%]">
                    <div>
                        <Cards padding={0}>
                            <div className="w-full h-fit">
                                <div className="relative w-full h-[200px]">
                                    {
                                        userData?._id === ownData?._id && <div className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white" onClick={handleOnEditCover}><EditIcon /></div>
                                    }
                                    <img src={userData?.cover_pic} alt="profile-bg" className="w-full h-[200px] rounded-tr-lg rounded-tl-lg" />
                                    <div onClick={handleCircularImageOpen} className="absolute object-cover top-24 left-6 z-10">
                                        <img src={userData?.profilePic} alt="profile" className="rounded-full border-2 border-white cursor-pointer w-35 h-35" />
                                    </div>
                                </div>
                                <div className="profile-data mt-10 relative px-8 py-2">
                                    {
                                        userData?._id === ownData?._id && <div className="absolute cursor-pointer top-0 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-2 bg-white" onClick={handleInfoModal}><EditIcon /></div>
                                    }
                                    <div className="w-full">
                                        <div className="text-2xl">{userData?.f_name}</div>
                                        <div className="text-gray-700">{userData?.headline}</div>
                                        <div className="text-sm text-gray-500">{userData?.curr_location}</div>
                                        <div className="text-md text-blue-800 w-fit cursor-pointer hover:underline">{userData?.friends?.length} Connections</div>
                                        <div className="md:flex w-full justify-between">
                                            <div className="profile-icons flex gap-5">
                                                <div className="post-btns">Open to</div>

                                                <div className="post-btns">Share</div>

                                                {
                                                    userData?._id === ownData?._id && <div className="post-btns">Logout</div>
                                                }


                                            </div>
                                            <div className="profile-icons flex gap-5">
                                                {
                                                    amIfriend() ? <div className="post-btns" onClick={handleMessageModal}>Message</div> : null
                                                }
                                                {
                                                    userData?._id === ownData?._id ? null : <div onClick={handleSendFriendRequest} className="post-btns">{checkFriendStatus()}</div>
                                                }



                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </Cards>
                    </div>
                    <div className="my-5 profile-about">
                        <Cards padding={1}>
                            <div className="about-section">
                                <div className=" flex justify-between items-center">
                                    <div className="text-xl">About</div>
                                    {
                                        userData?._id === ownData?._id && <div className="cursor-pointer" onClick={handleAboutModal}><EditIcon /></div>
                                    }

                                </div>
                                <div className="text-gray-700 text-md w-[80%]">{userData?.about}</div>
                            </div>
                        </Cards>
                    </div>
                    <div className="skill-section mt-5">
                        <Cards>
                            <div className="skills-part">
                                <div className=" flex justify-between items-center">
                                    <div className="text-xl">Skills</div>

                                </div>
                                <div className="text-gray-700 text-md my-2 w-full flex gap-4 flex-wrap skill-btn">
                                    {
                                        userData?.skills?.map((item, index) => {
                                            return (
                                                <div key={index} className="post-btns">{item}</div>
                                            )
                                        })
                                    }

                                </div>
                            </div>

                        </Cards>

                    </div>
                    <div className="skill-section">

                        <Cards>
                            <div className="skills-part">
                                <div className="activity-text flex justify-between items-center">
                                    <div className="text-xl">Activity</div>

                                </div>

                                <div className="post-btn py-1 px-3 w-fit cursor-pointer border-1 hover:bg-green-900 bg-green-800 font-semibold flex gap-2 rounded-4xl text-white">Posts</div>
                                {/* parent div for scrolable activities */}
                                <div className="skill-btn overflow-x-auto my-2 flex gap-1 overflow-y-hidden w-full">
                                    {
                                        postData.map((item, index) => {
                                            return (
                                                <Link to={`/profile/${id}/activity/${item?._id}`} className="cursor-pointer shrink-0 w-[350px] h-[530px]">
                                                    <Post profile={1} item={item} personalData={ownData} />
                                                </Link>
                                            )
                                        })
                                    }


                                </div>
                            </div>

                            <div className="w-full flex justify-center items-center">
                                <Link
                                    to={`/profile/${id}/activity`}
                                    className="post-btn p-2 rounded-xl cursor-pointer hover:bg-gray-300"
                                >
                                    Show all posts <ArrowRightAltIcon />
                                </Link>


                            </div>
                        </Cards>
                    </div>
                    <div className="skill-section">
                        <Cards>
                            <div className="skills-part">
                                <div className=" flex justify-between items-center">
                                    <div className="text-xl">Experience</div>
                                    {
                                        userData?._id === ownData?._id && <div className="cursor-pointer" onClick={handleExpModal}><AddIcon /></div>
                                    }

                                </div>

                            </div>
                            <div className="mt-5">
                                {
                                    userData?.experience.map((item, index) => {
                                        return (
                                            <div className="exp-sec p-2 border-t-1 border-gray-300 flex justify-between">
                                                <div>
                                                    <div className="text-lg">{item.designation}</div>
                                                    <div className="text-sm">{item.company_name}</div>
                                                    <div className="text-sm text-gray-500">{item.duration}</div>
                                                    <div className="text-sm text-gray-500">{item.location}</div>
                                                </div>
                                                {
                                                    userData?._id === ownData?._id && <div className="cursor-pointer" onClick={handleAboutModal}><EditIcon /></div>
                                                }

                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </Cards>
                    </div>

                </div>
                {/* right side Add */}
                <div className="hidden md:flex md:w-[28%]">
                    <div className="sticky top-19">
                        <Advertisment />

                    </div>

                </div>

            </div >
            {
                imageSetModal && <Modal title="Upload Image" closeModal={handleImageModalOpenClose}>
                    <ImageModal handleEditFunc={handleEditFunc} selfData={ownData} isCircular={circularImage} />
                </Modal>
            }

            {
                infoModal && <Modal title="Edit Info" closeModal={handleInfoModal}>
                    <EditInfoModal handleEditFunc={handleEditFunc} selfData={ownData} />

                </Modal>
            }
            {

                aboutModal && <Modal title="Edit About" closeModal={handleAboutModal}>
                    <AboutModal handleEditFunc={handleEditFunc} selfData={ownData} />
                </Modal>
            }

            {
                expModal && <Modal title="Experience" closeModal={handleExpModal}>
                    <ExpModal handleEditFunc={handleEditFunc} selfData={ownData} updateExp={updateExp} setUpdateExp={setUpdateExp} />

                </Modal>
            }

            {
                messageModal && <Modal title="Send Message" closeModal={handleMessageModal}>
                    <MessageModal />

                </Modal>
            }

            <ToastContainer />

        </div >
    )
}

export default Profile