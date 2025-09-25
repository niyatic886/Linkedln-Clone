import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AboutModal({ selfData, handleEditFunc }) {
    const [data, setData] = useState({ about: selfData?.about, skillInp: selfData?.skills?.join(','), resume: selfData?.resume })
    const [loading, setLoading] = useState(false);
    const onChangeHandle = (e, key) => {
        setData({ ...data, [key]: e.target.value })
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
            setData({ ...data, resume: imageUrl })
            toast.success("Image uploaded successfully");

        } catch (err) {
            console.error("Error uploading image:", err);
            toast.error("Error uploading image");
        } finally {
            setLoading(false);

        }

    }

    const handleOnSave = async () => {
        let arr = data?.skillInp?.split(',')
        let newData = { ...selfData, about: data.about, skills: arr, resume: data.resume }
        handleEditFunc(newData);
    }

    return (
        <div className="my-8">
            <div className="profile-icons w-full mb-4">
                <label>About*</label>
                <br />
                <textarea value={data.about} onChange={(e) => onChangeHandle(e, 'about')} cols={10} rows={3} className="input-context p-2 mt-1 w-full border-1 rounded-md"></textarea>
            </div>

            <div className="profile-icons w-full mb-4">
                <label>Skills*(Add by seperating comas)*</label>
                <br />
                <textarea value={data.skillInp} onChange={(e) => onChangeHandle(e, 'skillInp')} cols={10} rows={3} className="input-context p-2 mt-1 w-full border-1 rounded-md"></textarea>
            </div>

            <div className="profile-icons w-full mb-4">
                <label htmlFor="resumeUpload" className="bg-blue-800 text-white rounded-lg cursor-pointer post-btn">Resume Upload</label>
                <input onChange={handleInputImage} type="file" className="hidden" id="resumeUpload" />
                {
                    data.resume && <div className="mt-2 skill-btn">{data.resume}</div>
                }
            </div>
            <br />
            <div className=" upload-btn" onClick={handleOnSave}>Save</div>

        </div>
    )
}

export default AboutModal;