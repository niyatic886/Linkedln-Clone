import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import profile from "./../assets/profile.jpg"
import wlcImg from "./../assets/linkedln_banner.png"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function Post({ profile, item, personalData, key }) {
    const [seeMore, setSeeMore] = useState(false)
    const [comment, setComment] = useState(false)
    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState("")
    const desc = item?.desc;
    // console.log("Post ID:", item._id);


    const handleSendComment = async (e) => {
        e.preventDefault();
        if (commentText.trim().length === 0) return toast.error("Please enter comment")

        await axios.post(`http://localhost:3000/api/comment`, { postId: item?._id, comment: commentText }, { withCredentials: true }).then((res => {
            setComments([res.data.comment, ...comments])

        })).catch(err => {
            console.log(err)

        })
    }

    useEffect(() => {
        let selfId = personalData?._id
        item?.likes?.map((item) => {
            if (item.toString() === selfId.toString()) {
                setLiked(true)
                return
            } else {
                setLiked(false)
            }
        })
    }, [])

    const handleCommentBoxOpenClose = async () => {
        setComment(true)
        await axios.get(`http://localhost:3000/api/comment/${item?._id}`, { withCredentials: true }).then(resp => {

            setComments(resp.data.comments)

        }).catch(err => {
            console.log(err)

        })
    }

    const handleLikeFunc = async () => {
        await axios.post('http://localhost:3000/api/post/likeDislike', { postId: item?._id }, { withCredentials: true }).then(res => {
            if (liked) {
                setNoOfLikes((prev) => prev - 1);
                setLiked(false)
            } else {
                setLiked(true)
                setNoOfLikes((prev) => prev + 1);
            }

        }).catch(err => {
            console.log(err)

        })

    }

    const [liked, setLiked] = useState(false);
    const [noOfLikes, setNoOfLikes] = useState(item?.likes.length);

    return (
        <Cards padding={0}>
            <div className="post-section">
                <Link to={`/profile/${item?.user?._id}`} className="w-12 h-12 rounded-4xl">
                    <img src={item?.user?.profilePic} alt="profile-img" className="rounded-4xl w-12 h-12 border-2 border-white cursor-pointer" />

                </Link>
                <div>
                    <div className="text-lg font-semibold">{item?.user?.f_name}</div>
                    <div className="text-xs text-gray-500">{item?.user?.headline}</div>
                </div>

            </div>
            {
                desc && <div className="post-text">
                    {seeMore ? desc : `${desc.slice(0, 50)}`}
                    {desc?.length > 50 && (
                        <span className="cursor-pointer text-gray-500" onClick={() => setSeeMore(!seeMore)}>
                            {seeMore ? " See Less" : " ...See More"}
                        </span>
                    )}
                </div>
            }
            {
                item?.imageLink && <div className="w-[100%] h-[300%]">
                    <img src={item?.imageLink} alt="post" className="w-full h-full" />

                </div>
            }
            <div className="post-actions">
                <div className="flex gap-1 items-center">
                    <ThumbUpIcon sx={{ color: "blue", fontSize: 12 }} /> <div className="text-sm text-gray-600">{noOfLikes} Likes</div>

                </div>
                <div className="flex gap-1 items-center">
                    <div className="text-sm text-gray-600">{item?.comments} Comments</div>

                </div>

            </div>
            {
                !profile && <div className="post-activity">
                    <div onClick={handleLikeFunc} className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer">{liked ? <ThumbUpIcon sx={{ fontSize: 22, color: "blue" }} /> : <ThumbUpOutlinedIcon sx={{ fontSize: 22 }} />} <span>{liked ? "Liked" : "Like"}</span></div>
                    <div onClick={handleCommentBoxOpenClose} className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer"><CommentIcon sx={{ fontSize: 22 }} /> <span>Comment</span></div>
                    <div className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer"><SendIcon sx={{ fontSize: 22 }} /> <span>Share</span></div>

                </div>
            }
            {/* comment section */}
            {
                comment && <div className="comment-section">
                    <div className="comment-section-inner">
                        <img src={personalData?.profilePic} alt="profile-img" className="rounded-full w-12 h-12 border-2 border-white cursor-pointer" />
                        <form className="w-full flex gap-2" onSubmit={handleSendComment}>
                            <input value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="Add a comment..." className=" comment-form border-1 w-full py-3 px-5 rounded-3xl hover:bg-gray-100" />
                            <button type="submit" className="comment-btn cursor-pointer bg-blue-800 text-white rounded-full py-2 px-4 text-xs">Send</button>
                        </form>

                    </div>
                    {/* comment section */}
                    <div className="comment-section">
                        {
                            comments.map((item, index) => {
                                return (
                                    <div className="start-comment">
                                        <Link to={`/profile/${item?.user?._id}`} className="flex gap-3">
                                            <img src={item?.user?.profilePic} alt="profile" className="rounded-full w-9 h-9 border-2 border-white cursor-pointer" />
                                            <div className="cursor-pointer">
                                                <div className="text-md">{item?.user?.f_name}</div>
                                                <div className="text-sm text-gray-500">{item?.user?.headline}</div>
                                            </div>
                                        </Link>
                                        <div className="comment-text">{item?.comment}</div>
                                    </div>
                                )
                            })
                        }



                    </div>

                </div>
            }

            <ToastContainer />
        </Cards>
    )
}

export default Post