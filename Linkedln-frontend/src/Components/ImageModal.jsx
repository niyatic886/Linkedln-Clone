import React, { useState, useEffect } from "react";
import profile2 from "./../assets/profile2.jpg"
import bgImg from "./../assets/backgroundImg.jpg"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function ImageModal({ isCircular, selfData, handleEditFunc }) {
    const [imgLink, setImgLink] = useState(isCircular ? selfData?.profilePic : selfData?.cover_pic)
    const [loading, setLoading] = useState(false);

    const handleSubmitBtn = async () => {
        let { data } = { ...selfData }
        if (isCircular) {
            data = { ...data, ["profilePic"]: imgLink }
        } else {
            data = { ...data, ["cover_pic"]: imgLink }
        }
        handleEditFunc(data);
    }



    const handleInputImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'linkedlnClone');
        setLoading(true);

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/di4cje1ss/image/upload", data);
            const imageUrl = response.data.url
            setImgLink(imageUrl);
            toast.success("Image uploaded successfully");

        } catch (err) {
            console.error("Error uploading image:", err);
            toast.error("Error uploading image");
        } finally {
            setLoading(false);

        }

    }

    return (
        <div className="inside-modal p-5 relative flex items-center flex-col h-full">
            {
                isCircular ? (
                    <div>
                        <img src={imgLink} alt="profile" className="rounded-full w-[150px] h-[150px]" />

                    </div>

                ) : (
                    <div>
                        <img src={imgLink} alt="cover-img" className="rounded-xl w-full h-[200px] object-cover" />

                    </div>
                )
            }



            <div className="btn-group">
                <label htmlFor="btn-submit" className="upload-btn">
                    Upload
                </label>
                <input onChange={handleInputImage} type="file" className="hidden" id="btn-submit" />

                {
                    loading ?
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box> : <label onClick={handleSubmitBtn} className="upload-btn">
                            Submit
                        </label>
                }
            </div>

        </div>
    )
}

export default ImageModal