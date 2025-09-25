import React, { useState } from "react";
import profile from "./../assets/profile.jpg"
import bgImg from "./../assets/backgroundImg.jpg"
import ImageIcon from '@mui/icons-material/Image';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function AddModal(props) {
    const [imageUrl, setImageUrl] = useState(null);
    const [desc, setDesc] = useState("");

    const handlePost = async () => {
        if (desc.trim().length === 0 & !imageUrl) {
            return toast.error("Post cannot be empty");
        }
        await axios.post("http://localhost:3000/api/post", {
            desc: desc,
            imageLink: imageUrl
        }, { withCredentials: true }).then(res => {
            window.location.reload();
            toast.success("Post created successfully");
        }).catch(err => {
            console.error("Error creating post:", err);
        });
    }

    const handleUploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'linkedlnClone');

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/di4cje1ss/image/upload", data);
            const imageUrl = response.data.url
            setImageUrl(imageUrl);
            toast.success("Image uploaded successfully");

        } catch (err) {
            console.error("Error uploading image:", err);
            toast.error("Error uploading image");
        }
    }

    // cloudname = di4cje1ss
    // presetName = linkedlnClone

    return (
        <div>
            <div className="flex gap-4 items-center">
                <div className="relative">
                    <img src={props.personalData?.profilePic} alt="profile" className="w-15 h-15 rounded-4xl" />
                </div>
                <div className="text-2x1">{props.personalData?.f_name}</div>

            </div>
            <div>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)}
                    cols="50"
                    rows="5"
                    placeholder="What do you want to talk about"
                    class="post-textarea">
                </textarea>
            </div>
            {
                imageUrl && <div>
                    <img src={imageUrl} alt="post" className="h-20 w-20 rounded-xl" />
                </div>
            }
            <div className="flex justify-between items-center">
                <div className="post-upload">
                    <label htmlFor="inputFile" className="cursor-pointer"><ImageIcon /></label>
                    <input onChange={handleUploadImage} type="file" className="hidden" id="inputFile" />

                </div>
                <div className="post-area" onClick={handlePost}>Post</div>

            </div>
            <ToastContainer />

        </div>
    )
}

export default AddModal